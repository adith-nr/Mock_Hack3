from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
from bs4 import BeautifulSoup
import requests

load_dotenv()

MODEL = "llama-3.1-8b-instant"
llm = ChatGroq(model=MODEL, temperature=0, api_key=os.environ.get("GROQ_API_KEY"))

def get_hotel_info(user_query: str,location: str):
    location = location.lower()
    url = f"https://www.cleartrip.com/hotels/hotels-in-{location}"
    headers = {
        "User-Agent": "Mozilla/5.0 ",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
        "Referer": "https://www.google.com"
    }

    # Step 1: Scrape the page
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    visible_text = soup.get_text(separator="\n", strip=True)
    short_text = visible_text[:4000]  # Approx ~2000 tokens
    print(short_text)
    # Step 2: Form the LLM prompt
    prompt = f"""
You are a travel agent assistant.

A user is asking: "{user_query}"

From the following website text, extract hotel **name**, **price**, and **rating** strictly in JSON format.

Only include hotels that are relevant to the user's query (based on location, budget, and preference).
Use the format:
Sort the hotels by rating and stars in ascending order.

  {{
    "name": "Hotel Name",
    "price": "₹2000",
    "rating": "2.5",
    "stars": "3"(if mentioned),
    "discount": "10%"(if mentioned),
    "location": "Optional location if mentioned"
  }},
  ...


Make sure to return only relevant hotels and **nothing else but the JSON**.

Website Text:
{short_text}
    """

    # Step 3: Call the LLM
    result = llm.invoke(prompt)
    return result.content


#print(get_hotel_info("I want to stay in a hotel in Shimla", "Shimla"))