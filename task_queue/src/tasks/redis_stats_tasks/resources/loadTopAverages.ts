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

const makeNameSmaller = (FirstName: string, LastName: string) => {
    if (`${FirstName} ${LastName}`.length <= 16) {
        return `${FirstName} ${LastName}`
    } else if (`${FirstName[0]}. ${LastName}`.length <= 16) {
        return `${FirstName[0]}. ${LastName}`
    } else {
        const dashIndex = LastName.indexOf('-')
        if (dashIndex > 0) {
            return `${FirstName} ${LastName[0]}-${LastName[dashIndex + 1]}.`
        } else {
            if (LastName.indexOf('Jr.') > 0) {
                return `${FirstName} ${LastName[0]}. Jr.`
            } else if (LastName.indexOf('III') > 0) {
                return `${FirstName} ${LastName[0]}. III`
            } else if (LastName.indexOf('IV') > 0) {
                return `${FirstName} ${LastName[0]}. IV`
            } else {
                return `${FirstName} ${LastName[0]}.`
            }
        }
    }
}

const makePercentages = (response: any) => {
    return {
        ...response,
        smallName: makeNameSmaller(response.player.FirstName, response.player.LastName),
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
