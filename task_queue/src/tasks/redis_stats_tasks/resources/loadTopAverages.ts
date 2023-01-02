import redisClient from '../../../utils/redisClient'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import logger from '../../../utils/logger'

const getTopAverages = async () => {
    const seasonPromise = prismaClient.seasonAverages.findMany({
        orderBy: { FantasyPoints: 'desc' },
        include: {
            player: { include: { team: true } },
        },
        take: 20,
    })
    const lastFivePromise = prismaClient.lastFiveGameAverages.findMany({
        orderBy: { FantasyPoints: 'desc' },
        include: {
            player: { include: { team: true } },
        },
        take: 20,
    })

    return await Promise.all([seasonPromise, lastFivePromise])
}

export default async () => {
    const response = await wrapPrismaQuery(getTopAverages)
    const now = new Date().toISOString()
    if (response) {
        try {
            await redisClient.set('TOP_AVERAGES', JSON.stringify({ averages: response, updated: now }))
            logger.info('TOP_AVERAGES HAVE BEEN SET')
        } catch (err) {
            logger.error(err)
        }
    }
}
