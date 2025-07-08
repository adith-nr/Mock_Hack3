import express from 'express'
import Activity from '../controller/prompt.controllers.js'

const router = express.Router()

router.post("/Activities",Activity)
export default router