import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import redisStatsRouter from './redis_stats'
import seedDatabaseRouter from './seed_db'
import mockDraftRouter from './mockdraft'
import kayaRouter from './kaya_routes'

const defaultRouter = express.Router()

defaultRouter.use('/rdata', redisStatsRouter)
defaultRouter.use('/seed', seedDatabaseRouter)
defaultRouter.use('/mockdraft', mockDraftRouter)
defaultRouter.use('/kayaendpoints', kayaRouter)
// defaultRouter.use('/user', userRouter)
// defaultRouter.use('/stats', statRouter)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const environment = process.env.NODE_ENV

    environment === 'development'
        ? res.status(500).json({ error: err })
        : res.status(500).json({ error: 'Server Error, Please try again later.' })
}

defaultRouter.use(errorHandler)

const fallBack = (req: Request, res: Response, next: NextFunction) => {
    if (!res.headersSent) {
        res.status(404).json({ msg: 'An error occured, most likely route is not defined' })
    }
}
defaultRouter.use(fallBack)

export default defaultRouter
