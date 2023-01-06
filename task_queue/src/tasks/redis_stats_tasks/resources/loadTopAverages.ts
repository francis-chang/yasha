import redisClient from '../../../utils/redisClient'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import logger from '../../../utils/logger'
import averagesSchema from './averagesSchema'

const getTopAverages = async () => {
    const seasonPromise = prismaClient.seasonAverages.findMany({
        orderBy: { FantasyPoints: 'desc' },
        select: averagesSchema,
        take: 20,
    })
    const lastFivePromise = prismaClient.lastFiveGameAverages.findMany({
        orderBy: { FantasyPoints: 'desc' },
        select: averagesSchema,
        take: 20,
    })

    return await Promise.all([seasonPromise, lastFivePromise])
}

const makePercentages = (response: any) => {
    return {
        ...response,
        percentages: `${Math.round(response.FieldGoalsPercentage)}/${Math.round(
            response.ThreePointersPercentage
        )}/${Math.round(response.FreeThrowsPercentage)}`,
    }
}

export default async () => {
    const response = await wrapPrismaQuery(getTopAverages)
    const now = new Date().toISOString()

    if (response) {
        const newObj = {
            seasonAverages: response[0].map(makePercentages),
            lastFiveAverages: response[1].map(makePercentages),
            updated: now,
        }
        try {
            await redisClient.set('TOP_AVERAGES', JSON.stringify(newObj))
            logger.info('TOP_AVERAGES HAVE BEEN SET')
        } catch (err) {
            logger.error(err)
        }
    }
}
