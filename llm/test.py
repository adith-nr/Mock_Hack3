import requests
import selenium
import random, json
from bs4 import BeautifulSoup
from consts import *
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import undetected_chromedriver as uc
from webdriver_manager.chrome import ChromeDriverManager
import time
from playwright.sync_api import sync_playwright
import time
import warnings

warnings.filterwarnings("ignore")



def change_date(ini_date):
    l = ini_date.split('-')
    l = l[::-1]

    a = '/'.join(l)
    return a

origin_k = "mumbai"
dest_k = "hyderabad"

origin_mmt = ""
dest_mmt = ""

departure = "2025-07-31"
back = "2025-08-20"

url = f"https://www.tripozo.com/flight/results?adult=1&child=0&class=1&destination={airports[dest_k.title()]}&fareType=Regular&from={departure}&infant=0&origin={airports[origin_k.title()]}&tripType=oneWay"
kiwi  = f"https://www.kiwi.com/en/search/results/{origin_k.lower()}-india/{dest_k.lower()}-india/{departure}/{back}"
mmt = f"https://www.makemytrip.com/flight/search?tripType=R&itinerary={airports[origin_k.title()]}-{airports[dest_k.title()]}-{change_date(departure)}_{airports[dest_k.title()]}-{airports[origin_k.title()]}-{change_date(back)}&paxType=A-1_C-0_I-0&cabinClass=E"
print(url)

flights = [('Mumbai', 'Delhi', '2025-08-15')]#, ('Delhi', 'Hyderabad', '2025-08-18')]#, ('Hyderabad', 'Mumbai', '2025-08-21')]

from utils_A import get_all_data

ok = get_all_data(flights)

# with open('data2.json', 'w') as f:
#     json.dump(ok ,f)
print(ok)