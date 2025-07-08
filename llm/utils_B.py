from user import *
import google.generativeai as genai
from dotenv import load_dotenv
import os, re, json
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage


load_dotenv()


MODEL = "llama-3.1-8b-instant"
llm = ChatGroq(model=MODEL, temperature=0 , api_key= os.environ.get("GROQ_API_KEY"))


# genai.configure(api_key= os.environ.get("GEMINI_API"))
# model = genai.GenerativeModel("gemini-2.5-flash")

def find_itenary(state: User) -> User:

    state = state['ActivityDetails']
    
    SystemSetup = "You are the world's best Itenary Planner Assistant"
    prompt = f"""
    Generate a list of Activities that the user can do based on user age: {state['AgeGrp']},
    travelling {"Alone" if state["TravellingAlone"] == "yes" else "In a Group"}
    user's total budget of Rs {state['BudgetActivity']} for all activites combined,
    user being a {state['SocialState']}, 
    user prefers {state['ActivityType'] if len(state['ActivityType']) != 0 else "Any Activity"}

    Generate the list based on the above information and user query: {state['ActivityQuery']}

    Return only a single JSON object of format like this:
    {{
    <Activity_Name> : [<price(int)>, <location>, <brief about the activity>]
    }}
    """

    llm_responce = llm.invoke([SystemMessage(SystemSetup), HumanMessage(prompt)])
    pattern = r"\{[^{}]*\}"
    match = re.search(pattern, str(llm_responce.content), re.DOTALL)
    
    data = json.loads(match.group())
    print(data)

    return None

test_user = User(AgeGrp= 23, 
                 SocialState= 'ambivert',
                 TravellingAlone= 'yes',
                 BudgetActivity= 8000,
                 ActivityType= ["Adventure",
                                "Nature & Wildlife",
                                "Water Activities"],
                 ActivityQuery= "I want to do something exciting")

find_itenary(test_user)
