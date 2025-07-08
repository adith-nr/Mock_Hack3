import axios from "axios";

export const Activity =  async (req , res) => {
    //data = req.body
    data = new FormData()
    //data.append("age" : age)

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
    console.log(req.body)
   const {numberOfDays, budgetClass, destination, origin, layovers, arrivalDate, departureDate} = req.body
    const data = {numberOfDays, budgetClass, destination, origin, layovers, arrivalDate, departureDate}

    try{
        const resp = await fetch("http://localhost:8000/flight_details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const Fdata = await resp.json()
        res.status(200).json({flight_details: Fdata})

    } catch (err) {
        console.error('Forwarding error:', err.message);
        res.status(500).json({ error: 'Python service failed' });
    }
   
}

export const Hotel = async (req , res) => {
    const {city, check_in, check_out, budget} = req.body
    const data = {city, check_in, check_out, budget}

    try{
        const resp = await fetch("http://localhost:8000/hotel_details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const data = await resp.json()
        res.status(200).json({hotel_details: data})
    } catch (err) {
        console.error('Forwarding error:', err.message);
        res.status(500).json({ error: 'Python service failed' });
    }
}

