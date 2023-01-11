import { Request, Response, NextFunction } from 'express'
import logger from '../../../utils/logger'
import redisClient from '../../../utils/redisClient'

const getMockDraftList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await redisClient.get('MOCK_DRAFT_LIST')
        if (!response) {
            res.status(404).json({ msg: 'MOCK_DRAFT_LIST IS not Available' })
        } else {
            res.json(JSON.parse(response))
        }
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: 'An Error Occured trying to retreive data from Redis.' })
    }
}

export default getMockDraftList
