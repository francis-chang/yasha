import { Request, Response, NextFunction } from 'express'
import logger from '../../../utils/logger'
import redisClient from '../../../utils/redisClient'

const getTopStatlinesForDay = async (req: Request, res: Response, next: NextFunction) => {
    const date = req.params.date
    try {
        const response = await redisClient.get(`TOP_STATLINES_${date}`.toUpperCase())
        if (!response) {
            res.status(404).json({ msg: `Top statlines for ${date} are not Available` })
        } else {
            res.json(JSON.parse(response))
        }
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: 'An Error Occured trying to retreive data from Redis.' })
    }
}

export default getTopStatlinesForDay
