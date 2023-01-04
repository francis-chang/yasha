import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import redisStatsRouter from './redis_stats'
import seedDatabaseRouter from './seed_db'

const defaultRouter = express.Router()

defaultRouter.use('/redis_stats', redisStatsRouter)
defaultRouter.use('/seed/', seedDatabaseRouter)
// defaultRouter.use('/game', gameRouter)
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
        res.status(500).json({ msg: 'A fatal error occured' })
    }
}
defaultRouter.use(fallBack)

export default defaultRouter
