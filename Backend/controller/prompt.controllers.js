import axios from "axios";

export const Activity =  async (req , res) => {
   
    const{AgeGrp,SocialState,TravellingAlone,Budget}=req.body
    const data = {AgeGrp,SocialState,TravellingAlone,Budget}
    try{
        const responce = await axios.post("http://localhost:8000/activites_details", 
            data, 
            { headers: { 'Content-Type': 'application/json' } }
    );

    console.log(responce.data)
    res.status(200).json({fromLLM: responce.data});

  } catch (err) {
    console.error('Forwarding error:', err.message);
    res.status(500).json({ error: 'Python service failed' });
  }
}



export const Flight = async (req , res) => {
    const {numberOfDays, budgetClass, destination, origin, layovers, arrivalDate, departureDate} = req.body
    const data = {numberOfDays, budgetClass, destination, origin, layovers, arrivalDate, departureDate}

    console.log(data)
    try{
        const resp = await fetch("http://localhost:8000/flights_details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const Fdata = await resp.json()
        console.log(Fdata.llm_responce)
        res.status(200).json({"message" : "Success", flight_details: Fdata.llm_responce})

    } catch (err) {
        console.error('Forwarding error:', err.message);
        res.status(500).json({ error: 'Python service failed' });
    }
   
}

export const Hotel = async (req , res) => {
    const {prompt,location} = req.body
    const data = {prompt,location}

    try{
        const resp = await fetch("http://localhost:8000/hotels_details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const Hdata = await resp.json()
        res.status(200).json({hotel_details: Hdata.llm_responce})
    } catch (err) {
        console.error('Forwarding error:', err.message);
        res.status(500).json({ error: 'Python service failed' });
    }
}

