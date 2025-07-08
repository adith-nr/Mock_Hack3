from fastapi import FastAPI, requests
from fastapi.middleware.cors import CORSMiddleware
from user import *
from utils_A import *
from utils_B import *
from typing import TypedDict
from pydantic import BaseModel
from scrap import get_hotel_info as fetch_hotel_info


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or set specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Hotel(BaseModel):
    prompt: str
    location: str
 
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
           

@app.post("/flights_details")
async def get_flight_info(req : Flight):
    test_user['FlightDetails'] = req
    result = find_flights(test_user)
    return {"status" : "success", "llm_responce" : result}

@app.post("/hotels_details")
async def get_hotel_info(req : Hotel):
    result = fetch_hotel_info(req.prompt, req.location)
    print(result)
    return {"status" : "success", "llm_responce" : result}

@app.post("/activites_details")
async def get_activities_info(req : Activity):
        print("received Info: ", req)
        result = find_itenary(User(ActivityDetails=req))
        return {"status" : "success", "llm_responce" : result}


@app.post("/itenary_details")
async def get_itenary_info():
    return None