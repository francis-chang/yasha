import express from 'express'
import getTopStatlines from './resources/getTopStatlines'

const redisStatsRouter = express.Router()

redisStatsRouter.get('/topstatlines', getTopStatlines)

export default redisStatsRouter
