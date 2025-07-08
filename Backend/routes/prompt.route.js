import express from 'express'
import { Activity, Flight, Hotel } from '../controller/prompt.controllers.js'

const router = express.Router()

router.post("/Activities",Activity)
router.post("/Flight",Flight)
router.post("/Hotel",Hotel)
export default router