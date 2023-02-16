import { Request, Response, NextFunction } from 'express'
import logger from '../../../utils/logger'
import redisClient from '../../../utils/redisClient'

const getFourDayScores = async (req: Request, res: Response, next: NextFunction) => {
    const { redis_key } = req.params

    try {
        const response = await redisClient.get(redis_key)
        if (!response) {
            res.status(404).json({ msg: `${redis_key} are not Available` })
        } else {
            res.status(200).json(JSON.parse(response))
        }
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: `An Error Occured trying to retreieve ${redis_key}` })
    }
    next()
}

export default getFourDayScores
