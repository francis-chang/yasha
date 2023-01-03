import redisClient from '../../../utils/redisClient'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import { subDays } from 'date-fns'
import logger from '../../../utils/logger'
import statlineSchema from './statlineSchema'

const getTopStatlines = async (numberOfDaysAgo: number, numberOfStatlines: number) => {
    const nDaysAgo = subDays(new Date(), numberOfDaysAgo)
    return await prismaClient.statline.findMany({
        where: {
            game: { Day: { gte: nDaysAgo } },
        },
        select: statlineSchema,
        orderBy: {
            FantasyPoints: 'desc',
        },
        take: numberOfStatlines,
    })
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

export default async (numberOfDaysAgo: number, numberOfStatlines: number) => {
    // if this task is called with these parameters, it will get uploaded to REDIS
    const DEFAULT_NUM_DAYS = 10
    const DEFAULT_NUM_STATLINES = 20

    const response = await wrapPrismaQuery(() => getTopStatlines(numberOfDaysAgo, numberOfStatlines))
    if (response) {
        const now = new Date().toISOString()
        const newResponse = response.map(makePercentages)
        if (numberOfDaysAgo === DEFAULT_NUM_DAYS && numberOfStatlines === DEFAULT_NUM_STATLINES) {
            try {
                await redisClient.set('TOP_STATLINES', JSON.stringify({ statlines: newResponse, updated: now }))
                logger.info('TOP_STATLINES HAVE BEEN SET')
            } catch (err) {
                logger.error(err)
            }
        } else {
            try {
                await redisClient.set(
                    `TOP_STATLINES_${numberOfDaysAgo}_${numberOfStatlines}`,
                    JSON.stringify({ statlines: newResponse, updated: now })
                )
                logger.info(`TOP_STATLINES_${numberOfDaysAgo}_${numberOfStatlines} HAVE BEEN SET`)
            } catch (err) {
                logger.error(err)
            }
        }
    }
}
