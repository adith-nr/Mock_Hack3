from typing_extensions import TypedDict
from typing import List, Literal,Dict

class Flight(TypedDict):
    numberOfDays: int
    budgetFlight: str
    destination: str
    origin: str
    layovers: List[str]
    arrivalDate: str
    departureDate: str

class Hotel(TypedDict):
    numberOfDaysStay: int
    budgetHotel: str
    location: str
    rating: str
    housingtype : str

class Activity(TypedDict):
    AgeGrp : int
    SocialState : Literal["intorvert", "extrovert" ,"ambivert"]
    TravellingAlone : Literal["yes", "no"]
    budgetActivity : int
    ActivityType : List[str]
    ActivityQuery : str 

class User(TypedDict):
    FlightDetails : Flight
    HotelDetails : Hotel
    ActivityDetails : Activity
     

