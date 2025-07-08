import express from "express"
import cors from "cors"
import promptRoute from "./routes/prompt.route.js"
const app = express()
const PORT = 3000;


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use("api/prompt", promptRoute)

app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT)
})
