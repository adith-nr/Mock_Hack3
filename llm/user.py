from typing_extensions import TypedDict
from typing import List, Literal
class User(TypedDict):
    #Flight State


    #Hotel State


    #Activites State
    AgeGrp : int | 23
    SocialState : Literal["intorvert", "extrovert" ,"ambivert"]
    BudgetActivity : int
    ActivityType : List
    PersonalPreference : str 
