from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import time
import os

load_dotenv()

MODEL = "llama-3.1-8b-instant"
llm = ChatGroq(model=MODEL, temperature=0, api_key=os.environ.get("GROQ_API_KEY"))

def get_flight_info(user_query: str, flight_url: str):
    # Step 1: Set up headless Chrome
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")  # use --headless=new to avoid flaky JS
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=chrome_options)
    driver.get(flight_url)
    
    # Wait for content to load
    time.sleep(10)  # increase if flights load slowly

    # Step 2: Extract visible text from body
    visible_text = driver.find_element(By.TAG_NAME, "body").text
    driver.quit()

    short_text = visible_text[:4000]  # Token-safe limit

    # Step 3: Prompt LLM
    prompt = f"""
You are a flight booking assistant.

The user asked: "{user_query}"

From the following scraped page text, extract flight options and return JSON list with:

[
  {{
    "airline": "Airline Name",
    "price": "₹Price",
    "departure": "HH:MM",
    "arrival": "HH:MM",
    "duration": "Xh Ym",
    "stops": "Non-stop / 1 Stop"
  }},
  ...
]

Only include relevant flights based on the user's query.
Respond with **only valid JSON**.

Page content:
{short_text}
    """

    result = llm.invoke(prompt)
    return result.content

# Example usage
if __name__ == "__main__":
    url = "https://www.skyscanner.co.in/transport/flights/blr/ixd/250804/?adultsv2=1&cabinclass=economy"
    query = "Cheapest flights from Bangalore to Prayagraj on August 4 under ₹5000"
    flights_json = get_flight_info(query, url)
    print(flights_json)
