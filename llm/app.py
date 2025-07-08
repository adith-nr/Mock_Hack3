from fastapi import FastAPI, requests
from fastapi.middleware.cors import CORSMiddleware
from user import *
from utils_A import *
from utils_B import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or set specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class userDetails:
     FlightDetails : str

test_user = User(AgeGrp= 23, 
                 SocialState= 'ambivert',
                 TravellingAlone= 'yes',
                 BudgetActivity= 8000,
                 ActivityType= ["Adventure",
                                "Nature & Wildlife",
                                "Water Activities"],
                 ActivityQuery= "I want to do something exciting")

@app.post("/flights_details")
async def get_flight_info():
    return None

@app.post("/hotels_details")
async def get_hotel_info():
    return None

@app.post("/activites_details")
async def get_activities_info(req : userDetails):
        print("received Info: ", req)
        result = find_itenary(User)
        return {"status" : "success", "llm_responce" : result}

    

@app.post("/itenary_details")
async def get_itenary_info():
    return None