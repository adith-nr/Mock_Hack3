from user import *
import google.generativeai as genai
from dotenv import load_dotenv
import os, re, json, time
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from consts import *
import asyncio
from playwright.sync_api import sync_playwright
from playwright.async_api import async_playwright

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

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    driver = webdriver.Chrome(options=chrome_options)

    for org, dest, dt in flights:
        try:
            url = (
                f"https://www.tripozo.com/flight/results?adult=1&child=0&class=1&destination={airports[dest.title()]}&fareType=Regular&from={dt}&infant=0&origin={airports[org.title()]}&tripType=oneWay"
            )

            driver.get(url)
            time.sleep(5)  # Allow page to load

            soup = BeautifulSoup(driver.page_source, 'html.parser')

            prices = soup.find_all("div", class_="flight-price-number")
            airlines = soup.find_all("div", class_="airline-name")
            fromCities = soup.find_all("div", class_="from-airport")
            durations = soup.find_all("div", class_="f-hvcenter fl-duration")
            toCities = soup.find_all("div", class_="to-airport")
            flightCode = soup.find_all("div", class_ ="airline-code")

            for i in range(len(prices)):
                try:
                    price_match = re.search(r"₹([\d,]+)", str(prices[i]))
                    price = int(price_match.group(1).replace(",", "")) if price_match else 0
                    code = "".join(flightCode[i])

                    flight_data = {
                        "date": dt,
                        "departure_time": fromCities[i].find("div", class_="time").get_text(strip=True),
                        "departure": fromCities[i].find("div", class_="name").get_text(strip=True),
                        "from_airport": fromCities[i].find("div", class_="code").get_text(strip=True),
                        "price": price,
                        "airline": airlines[i].get_text(strip=True),
                        "duration": durations[i].get_text(strip=True),
                        "to_airport": toCities[i].find("div", class_="code").get_text(strip=True),
                        "arrival_time": toCities[i].find("div", class_="time").get_text(strip=True),
                        "arrival": toCities[i].find("div", class_="name").get_text(strip=True),
                        "link": url,
                        "flight_code" : code[1:-1]
                    }

                    result[j] = flight_data
                    j += 1

                except Exception as e:
                    print(f"Error parsing flight {i}: {e}")
                    continue

        except Exception as e:
            print(f"❌ Failed for route {org} to {dest} on {dt}: {e}")
            continue

    driver.quit()
    print(f"✅ Total flights scraped: {j}")
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
    try:
        df = pd.read_json('data.json')
        df = df.T
        df['duration_min'] = df['duration'].apply(duration_to_minutes)
        df_sorted = df.sort_values(by=['price', 'duration_min'], ascending=[True, True])
        top_flights = df_sorted.groupby('from_airport').head(4).reset_index(drop=True)
        top_flights = top_flights.drop(columns=['duration_min'])
        df = top_flights.T
        df.to_json('okay.json')
    except Exception as e:
        print("Error:", e)

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
        json.dump(result, f)
        
    final_json()
    
    data = ''
    with open('okay.json', 'r') as f:
        data = json.load(f)
    print(data)
    return data


# demo_hotel: Hotel = {
#     "numberOfDaysStay": 3,
#     "budgetHotel": 4000,
#     "location": "Dehradun",
#     "rating": "4-star",
#     "housingtype": "Resort"
# }

# demo_flight: Flight = {
#     "numberOfDays": 3,
#     "budgetFlight": "Economy",
#     "destination": "Hyderabad",
#     "origin": "Mumbai",
#     "layovers": [['Chennai', "2025-08-19"]],
#     "arrivalDate": "2025-08-21",
#     "departureDate": "2025-08-15"
# }

# test_user = User(FlightDetails= demo_flight,
#     ActivityDetails= Activity(AgeGrp= 23, 
#                  SocialState= 'ambivert',
#                  TravellingAlone= 'yes',
#                  BudgetActivity= 8000,
#                  ActivityType= ["Adventure",
#                                 "Nature & Wildlife",
#                                 "Water Activities"],
#                  ActivityQuery= "I want to do something exciting"))
        
#tryt = find_flights(test_user)
