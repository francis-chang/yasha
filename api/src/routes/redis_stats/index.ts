import express from 'express'
import getFourDayScores from './resources/getFourDayScores'
import getGameInfo from './resources/getGameInfo'
import getHomeStatlines from './resources/getHomeStatlines'
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
redisStatsRouter.get('/getfourdayscores', getFourDayScores)
redisStatsRouter.get('/gethomestatlines', getHomeStatlines)

export default redisStatsRouter
