import { Request, Response, NextFunction } from 'express'
import { loadTopStatlines } from '../../../tasks'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import redisClient from '../../../utils/redisClient'

const getTopStatlines = async (req: Request, res: Response, next: NextFunction) => {
    const { numberOfDaysAgo, numberOfStatlines } = req.query
    if (!numberOfDaysAgo || !numberOfStatlines) {
        const response = await redisClient.get('TOP_STATLINES')
        if (!response) {
            await loadTopStatlines(10, 20)
            res.status(404).json({
                msg: 'redis default top statlines are not loaded, however a task has been sent to set the default top statlines. if this error reoccurs, there is an issue setting the default statlines',
            })
        } else {
            res.json(JSON.parse(response))
        }
    } else {
        const parsedNumberOfDaysAgo = parseInt(numberOfDaysAgo as string)
        const parsedNumberOfStatlines = parseInt(numberOfStatlines as string)
        if (!parsedNumberOfDaysAgo || !parsedNumberOfStatlines) {
            res.status(400).json({
                msg: `days:${numberOfDaysAgo} not parsable to Int, or statlines: ${numberOfStatlines} not parsable to int`,
            })
        } else {
            const response = await redisClient.get(`TOP_STATLINES_${numberOfDaysAgo}_${numberOfStatlines}`)
            if (!response) {
                await loadTopStatlines(parsedNumberOfDaysAgo, parsedNumberOfStatlines)
                res.status(404).json({
                    msg: 'redis statlines for these params are not loaded, however a task has been sent to set these statlines with these configs. if this error reoccurs, there is an issue setting the statlines',
                })
            } else {
                res.json(JSON.parse(response))
            }
        }
    }
}

export default getTopStatlines
