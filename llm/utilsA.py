import requests

url = url = "https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights"

querystring = {
    "fromId": "city--mumbai",    # or airport--BOM
    "toId": "city--delhi",       # or airport--DEL
    "departDate": "2025-07-15",
    "adults": "1",
    "currency_code": "AED",
    "locale": "en"
}

headers = {
    "X-RapidAPI-Key": "5ce6e34b6cmshc4dee68cfcf86abp1ce118jsn7c5b14d6aaa1",
    "X-RapidAPI-Host": "booking-com15.p.rapidapi.com"
}
response = requests.get
data = 