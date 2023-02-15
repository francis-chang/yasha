import express from 'express'
import draftData from './draftData'

const draftRouter = express.Router()

draftRouter.get('/draftlist', draftData)

export default draftRouter
