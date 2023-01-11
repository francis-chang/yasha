import express from 'express'
import getGameInfo from './resources/getGameInfo'
import getMockDraftList from './resources/getMockDraft'
import getTopAverages from './resources/getTopAverages'
import getTopStatlines from './resources/getTopStatlines'
import getTopStatlinesForDay from './resources/getTopStatlinesForDay'

const redisStatsRouter = express.Router()

redisStatsRouter.get('/topstatlines', getTopStatlines)
redisStatsRouter.get('/topaverages', getTopAverages)
redisStatsRouter.get('/gameinfo', getGameInfo)
redisStatsRouter.get('/daystatlines/:date', getTopStatlinesForDay)
redisStatsRouter.get('/getmockdraftlist', getMockDraftList)

export default redisStatsRouter
