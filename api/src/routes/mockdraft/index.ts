import express from 'express'
import draft from './draft'
import scoreDraft from './scoreDraft'

const mockDraftRouter = express.Router()

mockDraftRouter.post('/d', draft)
mockDraftRouter.post('/scoredraft', scoreDraft)

export default mockDraftRouter
