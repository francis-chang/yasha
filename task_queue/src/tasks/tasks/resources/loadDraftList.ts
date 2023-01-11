import logger from '../../../utils/logger'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import redisClient from '../../../utils/redisClient'

const getPlayersOrderByFan = async () => {
    const seasonAverages = prismaClient.seasonAverages.findMany({
        orderBy: { FantasyPoints: 'desc' },
    })
    const lastFiveAverages = prismaClient.lastFiveGameAverages.findMany({
        orderBy: { FantasyPoints: 'desc' },
    })

    return Promise.all([seasonAverages, lastFiveAverages])
}

// this will be for actual draft list
// remember to account for games played within the past 10
// maybe add last 15 game average as well

export default async () => {
    const response = await wrapPrismaQuery(getPlayersOrderByFan)
    if (response) {
        const draftList = []
        // seasonAverages.forEach(() => {

        // })
    }
}
