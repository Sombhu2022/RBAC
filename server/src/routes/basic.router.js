
import express from 'express'
import { fetchData } from '../controllers/basic.controller.js'


const router = express.Router()

router
     .get('/' , fetchData )


export const basicRouter = router