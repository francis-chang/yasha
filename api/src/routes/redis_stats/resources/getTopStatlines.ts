import { subDays } from 'date-fns'
import { Request, Response, NextFunction } from 'express'
import { loadTopStatlines } from '../../../utils/tasks'
import redisClient from '../../../utils/redisClient'

const getTopStatlines = async (req: Request, res: Response, next: NextFunction) => {
    const { numberOfDaysAgo, numberOfStatlines } = req.query
    if (!numberOfDaysAgo || !numberOfStatlines) {
        try {
            const response = await redisClient.get('TOP_STATLINES')
            if (!response) {
                await loadTopStatlines(10, 20)
                res.status(404).json({
                    msg: 'redis default top statlines are not loaded, however a task has been sent to set the default top statlines. if this error reoccurs, there is an issue setting the default statlines',
                })
            } else {
                res.json(JSON.parse(response))
            }
        } catch (err) {
            console.error(err)
            res.status(500).json({ msg: 'An Error Occured When Fetching From Redis' })
        }
    } else {
        const parsedNumberOfDaysAgo = parseInt(numberOfDaysAgo as string)
        const parsedNumberOfStatlines = parseInt(numberOfStatlines as string)
        if (!parsedNumberOfDaysAgo || !parsedNumberOfStatlines) {
            res.status(400).json({
                msg: `days:${numberOfDaysAgo} not parsable to Int, or statlines: ${numberOfStatlines} not parsable to int`,
            })
        } else {
            try {
                const response = await redisClient.get(`TOP_STATLINES_${numberOfDaysAgo}_${numberOfStatlines}`)
                if (!response) {
                    await loadTopStatlines(parsedNumberOfDaysAgo, parsedNumberOfStatlines)
                    res.status(404).json({
                        msg: 'redis statlines for these params are not loaded, however a task has been sent to set these statlines with these configs. if this error reoccurs, there is an issue setting the statlines',
                    })
                } else {
                    const parsedJSON = JSON.parse(response)
                    const oneDayAgo = subDays(new Date(), 1)
                    if (parsedJSON.updated < oneDayAgo) {
                        res.json({
                            ...parsedJSON,
                            msg: 'these statlines are more than a day old, this request has sent a task to renew statlines with the said parameters. request again shortly, to receive updated statlines.',
                        })
                    } else {
                        res.json(parsedJSON)
                    }
                }
            } catch (err) {
                console.error(err)
                res.status(500).json({ msg: 'An Error Occured When Fetching From Redis' })
            }
        }
    }
}

export default getTopStatlines
