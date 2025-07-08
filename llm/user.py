from typing_extensions import TypedDict
from typing import List, Literal,Dict

class Flight(TypedDict):
    airline : str
    departure : str
    arrival : str
    price : str
    currency : str
    duration_str : str
    duration_secs : int

class User(TypedDict):
    #General State
    AgeGrp : int
    SocialState : Literal["intorvert", "extrovert" ,"ambivert"]
    TravellingAlone : Literal["yes", "no"]

    #Flight State
    flight_list : List[Flight]

    #Hotel State


    #Activites State
    BudgetActivity : int
    ActivityType : List[str]
    ActivityQuery : str 
