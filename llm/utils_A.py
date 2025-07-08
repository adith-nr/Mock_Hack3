from user import *
import google.generativeai as genai
from dotenv import load_dotenv
import os, re, json
import pandas as pd

from consts import *
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
import time
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup


load_dotenv()


MODEL = "llama-3.1-8b-instant"
llm = ChatGroq(model=MODEL, temperature=0 , api_key= os.environ.get("GROQ_API_KEY"))


genai.configure(api_key= os.environ.get("GEMINI_API"))
model = genai.GenerativeModel("gemini-2.5-flash")


def generate_round_trip(req_flights):
    flights = []
    n = len(req_flights)

    for i in range(n - 1):
        origin = req_flights[i][0]
        destination = req_flights[i + 1][0]
        date = req_flights[i][1]
        flights.append((origin, destination, date))

    # Add final return to the start
    origin = req_flights[-1][0]
    destination = req_flights[0][0]
    date = req_flights[-1][1]
    flights.append((origin, destination, date))

    return flights

def get_all_data(flights):
    result = {}
    j = 0
    for (org,dest,dt) in flights:
        html = ""
        with sync_playwright() as p:
            url = f"https://www.tripozo.com/flight/results?adult=1&child=0&class=1&destination={airports[dest.title()]}&fareType=Regular&from={dt}&infant=0&origin={airports[org.title()]}&tripType=oneWay"

            browser = p.chromium.launch(headless=True) 
            context = browser.new_context()
            page = context.new_page()


            page.goto(url)
            # for _ in range(3):
            #     page.mouse.wheel(0, 1000)
            #     time.sleep(1.5)

            time.sleep(5)

            html = page.content()
            # # Save the HTML
            # with open("url.html", "w", encoding="utf-8") as f:
            #     f.write(page.content())

            browser.close()

        soup = ''
        # with open("url.html", "r", encoding='utf-8') as f:
        #     #print(f.read())
        soup = BeautifulSoup(html, 'html.parser')
        
        price = soup.find_all("div", class_ = "flight-price-number")
        airline = soup.find_all("div", class_ = "airline-name")
        fromCity = soup.find_all("div", class_ = "from-airport")
        duration = soup.find_all("div", class_ = "f-hvcenter fl-duration")
        toCity = soup.find_all("div", class_ = "to-airport")

        

        for i in range(len(price)):
            temp = {}
            plane = airline[i].get_text(strip=True) 

            from_airport = fromCity[i]
            codes = from_airport.find_all("div", class_="code")
            airport_code = codes[0].get_text(strip=True)

            # Extract time and city
            depart_time = from_airport.find("div", class_="time").get_text(strip=True)
            city = from_airport.find("div", class_="name").get_text(strip=True)

            match = re.search(r"₹([\d,]+)", str(price[i]))
            p = 0
            if match:
                p = int(match.group(1).replace(",", ""))
                
            flighttime = duration[i].get_text(strip=True)

            to_airport = toCity[i]
            codes = to_airport.find_all("div", class_="code")
            a_airport_code = codes[0].get_text(strip=True)

            # Extract time and city
            a_time = to_airport.find("div", class_="time").get_text(strip=True)
            a_city = to_airport.find("div", class_="name").get_text(strip=True)

            temp = {
                "date" : dt,
                "departure_time" : depart_time,
                "departure" : city,
                "from_airport" : airport_code,
                "price" : p,
                "airline" : plane,
                "duration" : flighttime,
                "to_airport" : a_airport_code,
                "arrival_time" : a_time,
                "arrival" : a_city,
                "arrival_time" : a_time,
                "link" : url
            }

            filename = 'data2.json'
            # Load existing list
            with open(filename, "r") as f:
                data = json.load(f)

            # Append new record
            data.append(temp)

            # Save updated list
            with open(filename, "w") as f:
                json.dump(data, f, indent=2)
                
            result[j] = temp
            j += 1

    with open("data3.json", "a+") as f:
        json.dump(result, f)

    print(j)       
    return result

def duration_to_minutes(duration_str):
    h, m = 0, 0
    if 'h' in duration_str:
        h = int(re.search(r'(\d+)h', duration_str).group(1))
    if 'min' in duration_str:
        m_match = re.search(r'(\d+)min', duration_str)
        if m_match:
            m = int(m_match.group(1))
    return h * 60 + m

def final_json():
    df = pd.read_json('data.json')
    df = df.T
    df['duration_min'] = df['duration'].apply(duration_to_minutes)
    df_sorted = df.sort_values(by=['from_airport', 'price', 'duration_min'], ascending=[True, True, True])
    top_flights = df_sorted.groupby('from_airport').head(4).reset_index(drop=True)
    top_flights = top_flights.drop(columns=['duration_min'])
    df = top_flights.T

    df.to_json('okay.json')
    

def find_flights(state: User) -> User:
    state = state['FlightDetails']
    origin_k = state["origin"]
    dest_k = state['destination']
    layovers = state['layovers']
    departure = state['departureDate']
    arrival = state['arrivalDate']

    
    req_flights = [(origin_k, departure)]
    req_flights.extend(layovers)
    req_flights.extend([(dest_k, arrival)])

    flights = generate_round_trip(req_flights)
    result = {}
    result = get_all_data(flights)
    with open('data.json', 'w') as f:
        f.write(result)
        
    final_json()
    
    data = ''
    with open('okay.json', 'r') as f:
        data = json.load(f)
    print(data)
    return data



def find_hotel(state: User):
    hotel_state = state['HotelDetails']
    
    SystemMode = (
        "You are a smart hotel search assistant that searches the internet in real-time "
        "and provides hotel listings based on user's preferences and location."
    )
    
    prompt = f"""
🏨 TASK  
Find the best available **hotel options** in {hotel_state['location']}   based on the following preferences:

• Budget: ₹{hotel_state['budgetHotel']} per night  
• Rating: {hotel_state['rating']}  
• Housing Type: {hotel_state['housingtype']}



📄 RESPONSE FORMAT — JSON only, no markdown:

{{
  "<Hotel1>": ["<price_per_night>", "<rating>", "<area_name>", "<booking_link>"],
  "<Hotel2>": [...],
  ...
}}

Return exactly this JSON object and nothing else.
"""

    # Send to your LLM
    llm_responce = llm.invoke([SystemMessage(SystemMode), HumanMessage(prompt)])

    # Extract JSON using regex
    pattern = r"\{[^{}]*\}"
    match = re.search(pattern, str(llm_responce.content), re.DOTALL)
    
    data = json.loads(match.group()) if match else {}

    print(data)
    return data

demo_hotel: Hotel = {
    "numberOfDaysStay": 3,
    "budgetHotel": 4000,
    "location": "Dehradun",
    "rating": "4-star",
    "housingtype": "Resort"
}

demo_flight: Flight = {
    "numberOfDays": 3,
    "budgetFlight": "Economy",
    "destination": "Hyderabad",
    "origin": "Mumbai",
    "layovers": [["Delhi", "2025-08-18"]],
    "arrivalDate": "2025-08-21",
    "departureDate": "2025-08-15"
}



demo_activity : Activity = {
                 "AgeGrp" : 23, 
                 "SocialState": 'ambivert',
                 "TravellingAlone": 'yes',
                 "BudgetActivity": 8000,
                 "ActivityType": ["Adventure",
                                "Nature & Wildlife",
                                "Water Activities"],
                 "ActivityQuery": "I want to do something exciting"
}

test_user = User(FlightDetails= demo_flight,
    HotelDetails  = demo_hotel,
    ActivityDetails = demo_activity)
        
#find_flights(test_user)
