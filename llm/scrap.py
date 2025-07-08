from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Set up Chrome in headless mode
options = webdriver.ChromeOptions()
# options.add_argument('--headless')
options.add_argument('--disable-gpu')
options.add_argument('--no-sandbox')
options.add_argument('window-size=1920x1080')

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Navigate to Goa hotels page
url = "https://www.cleartrip.com/hotels/hotels-in-goa"
driver.get(url)


hotels = driver.find_elements(By.CSS_SELECTOR, "div.hotelCard")

print(f"Found {len(hotels)} hotels:\n")

for hotel in hotels:
    name = hotel.find_element(By.CSS_SELECTOR, ".hotelCard__hotelName").text.strip()
    price_el = hotel.find_element(By.CSS_SELECTOR, ".hotelCard__startingPrice")
    price = price_el.text.strip() if price_el else "N/A"
    rating_el = hotel.find_elements(By.CSS_SELECTOR, ".hotelRating")
    rating = rating_el[0].text.strip() if rating_el else "N/A"

    print(f"🏨 Name: {name}")
    print(f"💰 Price: {price}")
    print(f"⭐ Rating: {rating}")
    print("-"*40)

driver.quit()
