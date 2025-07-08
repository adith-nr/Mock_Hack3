import requests




def getFlightDetails(fromId,toId,departDate,adults,currency_code):
    url = url = "https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights"

    querystring = {
        "fromId": fromId,
        "toId": toId,
        "departDate": departDate,
        "adults": adults,
        "currency_code": currency_code,
        "locale": "en"
    }

    headers = {
        "X-RapidAPI-Key": "5ce6e34b6cmshc4dee68cfcf86abp1ce118jsn7c5b14d6aaa1",
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com"
    }
    response = requests.get(url,headers=headers,params=querystring)
    data = response.json()
    flightOffers = data.get('data',{}).get('flightOffers',[])
    flight_list=[]
    for index,flight in enumerate(flightOffers):
        if index == 5:
            break
        total_time_secs = flight['segments'][0].get("totalTime", 0)
        total_time_hr = total_time_secs // 3600
        total_time_min = (total_time_secs % 3600) // 60


        price_info = flight.get("unifiedPriceBreakdown", {}).get("price", {})
        units = price_info.get("units", 0)
        nanos = price_info.get("nanos", 0)
        currency = price_info.get("currencyCode", "AED")
        price = units + nanos / 1e9

        
        airline_name = flight.get("segments", [{}])[0].get("legs", [{}])[0].get("carriersData", [{}])[0].get("name", "Unknown")

    
        departure_time = flight.get("segments", [{}])[0].get("departureTime", "N/A")
        arrival_time = flight.get("segments", [{}])[0].get("arrivalTime", "N/A")
        
        flight_list.append({
            "airline": airline_name,
            "departure": departure_time,
            "arrival": arrival_time,
            "price": price,
            "currency": currency,
            "duration_str": f"{total_time_hr} hours {total_time_min} minutes",
            "duration_secs": total_time_secs
        })

    
        for i, flight in enumerate(flight_list[:5]):
            print(f"\n✈️  Airline:   {flight['airline']} ({i+1})")
            print(f"🛫 Departure: {flight['departure']}")
            print(f"🛬 Arrival:   {flight['arrival']}")
            print(f"💰 Price:     {flight['currency']} {flight['price']:.2f}")
            print(f"🕒 Duration:  {flight['duration_str']}")
        
    return flight_list






getFlightDetails("IXD.AIRPORT","BLR.AIRPORT","2025-07-15","1","INR")