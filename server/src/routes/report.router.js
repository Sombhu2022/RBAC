import express from 'express'
import { authorizeRoles, isAuthenticate } from '../middlewares/authentication.js'
import { addNewReport, fetchAllReport, updateReportStatus } from '../controllers/report.controller.js'

const router = express.Router()

router
    .post('/' , isAuthenticate , addNewReport )
    .get('/' , isAuthenticate , authorizeRoles('controller' , 'admin') , fetchAllReport)
    .patch('/status/:reportId' , isAuthenticate , authorizeRoles('controller' , 'admin') , updateReportStatus)

export const reportRouter = router