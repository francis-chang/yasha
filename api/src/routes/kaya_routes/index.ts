import getSchedulesSingleDraft from './getSchedulesSingleDraft'
import express from 'express'

const kayaRouter = express.Router()

kayaRouter.post('/getschedulesd', getSchedulesSingleDraft)

export default kayaRouter
