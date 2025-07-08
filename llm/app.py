from fastapi import FastAPI, requests
from fastapi.middleware.cors import CORSMiddleware
from user import *
from utilsA import *
from utilsB import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or set specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sharedUser = User()

@app.post("/flights_details")
async def get_flight_info():
    return None

@app.post("/hotels_details")
async def get_hotel_info():
    return None

@app.post("/activites_details")
async def get_activities_info():
    return None

@app.post("/itenary_details")
async def get_itenary_info():
    return None