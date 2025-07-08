from playwright.sync_api import sync_playwright
import requests
import selenium
import random
from bs4 import BeautifulSoup
from consts import *
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import undetected_chromedriver as uc
from webdriver_manager.chrome import ChromeDriverManager
import time
import warnings

warnings.filterwarnings("ignore")



def change_date(ini_date):
    l = ini_date.split('-')
    l = l[::-1]

    a = '/'.join(l)
    return a

source_k = "mumbai"
dest_k = "agra"

source_mmt = ""
dest_mmt = ""

departure = "2025-07-31"
back = "2025-08-20"

kiwi  = f"https://www.kiwi.com/en/search/results/{source_k.lower()}-india/{dest_k.lower()}-india/{departure}/{back}"
mmt = f"https://www.makemytrip.com/flight/search?tripType=R&itinerary={airports[source_k.title()]}-{airports[dest_k.title()]}-{change_date(departure)}_{airports[dest_k.title()]}-{airports[source_k.title()]}-{change_date(back)}&paxType=A-1_C-0_I-0&cabinClass=E"
print(mmt)

with sync_playwright() as p:
    browser = p.firefox.launch(headless=False)
    page = browser.new_page()
    page.goto(mmt, wait_until="networkidle")
    page.wait_for_timeout(10000)
    with open("mmt.html", "w", encoding="utf-8") as f:
        f.write(page.content())
    browser.close()
