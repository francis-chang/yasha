import { Request, Response, NextFunction } from 'express'
import logger from '../../../utils/logger'
import redisClient from '../../../utils/redisClient'

const getFourDayScores = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await redisClient.get('FOUR_DAY_SCORES')
        if (!response) {
            res.status(404).json({ msg: 'four day scores are not Available' })
        } else {
            res.json(JSON.parse(response))
        }
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: 'An Error Occured trying to retreive data from Redis.' })
    }
}

export default getFourDayScores
