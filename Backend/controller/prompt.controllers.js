import axios from "axios";

const Activity =  async (req , res) => {
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

export default Activity