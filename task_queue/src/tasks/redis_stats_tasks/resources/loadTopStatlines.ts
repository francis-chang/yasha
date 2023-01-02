import redisClient from '../../../utils/redisClient'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import { subDays } from 'date-fns'
import logger from '../../../utils/logger'

const getTopStatlines = async (numberOfDaysAgo: number, numberOfStatlines: number) => {
    const nDaysAgo = subDays(new Date(), numberOfDaysAgo)
    return await prismaClient.statline.findMany({
        where: {
            game: { Day: { gte: nDaysAgo } },
        },
        include: {
            opponent_team: true,
            team: true,
            game: true,
        },
        orderBy: {
            FantasyPoints: 'desc',
        },
        take: numberOfStatlines,
    })
}

export default async (numberOfDaysAgo: number, numberOfStatlines: number) => {
    // if this task is called with these parameters, it will get uploaded to REDIS
    const DEFAULT_NUM_DAYS = 10
    const DEFAULT_NUM_STATLINES = 20

    const response = await wrapPrismaQuery(() => getTopStatlines(numberOfDaysAgo, numberOfStatlines))
    if (response) {
        const now = new Date().toISOString()
        if (numberOfDaysAgo === DEFAULT_NUM_DAYS && numberOfStatlines === DEFAULT_NUM_STATLINES) {
            try {
                await redisClient.set('TOP_STATLINES', JSON.stringify({ statlines: response, updated: now }))
                logger.info('TOP_STATLINES HAVE BEEN SET')
            } catch (err) {
                logger.error(err)
            }
        } else {
            try {
                await redisClient.set(
                    `TOP_STATLINES_${numberOfDaysAgo}_${numberOfStatlines}`,
                    JSON.stringify({ statlines: response, updated: now })
                )
                logger.info(`TOP_STATLINES_${numberOfDaysAgo}_${numberOfStatlines} HAVE BEEN SET`)
            } catch (err) {
                logger.error(err)
            }
        }
    }
}
