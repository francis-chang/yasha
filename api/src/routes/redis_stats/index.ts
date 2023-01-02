import express from 'express'
import getTopAverages from './resources/getTopAverages'
import getTopStatlines from './resources/getTopStatlines'

const redisStatsRouter = express.Router()

redisStatsRouter.get('/topstatlines', getTopStatlines)
redisStatsRouter.get('/topaverages', getTopAverages)

export default redisStatsRouter
