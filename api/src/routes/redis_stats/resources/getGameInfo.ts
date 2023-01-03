import { Request, Response, NextFunction } from 'express'
import logger from '../../../utils/logger'
import redisClient from '../../../utils/redisClient'

const getGameInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await redisClient.get('GAME_INFO')
        if (!response) {
            res.status(404).json({ msg: 'GAME INFO IS not Available' })
        } else {
            res.json(JSON.parse(response))
        }
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: 'An Error Occured trying to retreive data from Redis.' })
    }
}

export default getGameInfo
