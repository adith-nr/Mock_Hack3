from typing_extensions import TypedDict
from typing import List, Literal, Optional
class User(TypedDict):
    #General State
    AgeGrp : int
    SocialState : Literal["intorvert", "extrovert" ,"ambivert"]
    TravellingAlone : Literal["yes", "no"]

    #Flight State


    #Hotel State


    #Activites State
    BudgetActivity : int
    ActivityType : List[str]
    ActivityQuery : str 
