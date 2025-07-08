from user import *
import google.generativeai as genai
from dotenv import load_dotenv
import os, re, json
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage


load_dotenv()


MODEL = "llama-3.1-8b-instant"
llm = ChatGroq(model=MODEL, temperature=0 , api_key= os.environ.get("GROQ_API_KEY"))


genai.configure(api_key= os.environ.get("GEMINI_API"))
model = genai.GenerativeModel("gemini-2.5-flash")


def find_flights(state: User) -> User:

    state = state['FlightDetails']
    SystemMode = "You are a search engine that searches the net in realtime and give relevant information in the format the user has asked."
    
    prompt = f"""
✈️  TASK  
Find the lowest‑price, shortest‑duration **commercial flights** that satisfy this
multi‑city itinerary:

• Origin city: {state['origin']}  
• Layover cities (must be booked as separate tickets): {
    ', '.join(f'{c} on {d}' for c, d in state['layovers'])
    if state.get('layovers') else 'None'
}  
• Final destination: {state['destination']}  
• Outbound from origin no earlier than: {state['departureDate']}  
• Final return to origin on: {state['arrivalDate']}  
• Cabin class: {state['budgetFlight']}  
• Show **max 3 options per date / leg**.

-----


Search MakeMyTrip Website for all flights and get the actual price of ticket
• **MakeMyTrip** : `https://www.makemytrip.com/flight/search?tripType=R&itinerary=FROM_IATA-TO_IATA-DEPARTURE_DATE_DD/MM/YYYY&paxType=A-1_C-0_I-0&cabinClass=E&sTime=1751968850168&forwardFlowRequired=true&isGrpBkg=false&mpo=&semType=&intl=false`  


-----

📄  RESPONSE FORMAT — **JSON only**, no markdown:

{{
  "<Leg‑1‑Name>": ["<date>", <price_int>, "<from_city>", "<to_city>",
                   ["<layover_airports_if_any>"], "<duration>", "<deeplink>"],
  "<Leg‑2‑Name>": [...],
  ...
}}

Return nothing except this single JSON object.
"""


    #responce = model.generate_content([prompt])
    
    llm_responce = llm.invoke([SystemMessage(SystemMode) ,HumanMessage(prompt)])
    pattern = r"\{[^{}]*\}"
    match = re.search(pattern, str(llm_responce.content), re.DOTALL)
    
    data = json.loads(match.group())
    
    return data

flight: Flight = {
    "numberOfDays": 3,
    "budgetFlight": "Economy",
    "destination": "Hyderabad",
    "origin": "Mumbai",
    "layovers": [["Delhi", "2025-08-18"]],
    "arrivalDate": "2025-08-21",
    "departureDate": "2025-08-15"
}
test_user = User(FlightDetails= flight,
    ActivityDetails= Activity(AgeGrp= 23, 
                 SocialState= 'ambivert',
                 TravellingAlone= 'yes',
                 BudgetActivity= 8000,
                 ActivityType= ["Adventure",
                                "Nature & Wildlife",
                                "Water Activities"],
                 ActivityQuery= "I want to do something exciting"))
        
#find_flights(test_user)
