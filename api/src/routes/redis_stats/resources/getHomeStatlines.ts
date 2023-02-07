import { Request, Response, NextFunction } from 'express'
import logger from '../../../utils/logger'
import redisClient from '../../../utils/redisClient'

const getHomeStatlines = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await redisClient.get('TOP_STATLINES_DAYS')
        if (!response) {
            res.status(404).json({ msg: 'TOP_STATLINES_DAYS IS not Available' })
        } else {
            res.json(JSON.parse(response))
        }
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: 'An Error Occured trying to retreive data from Redis.' })
    }
}

export default getHomeStatlines
