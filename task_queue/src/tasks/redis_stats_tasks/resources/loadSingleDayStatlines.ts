import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import logger from '../../../utils/logger'
import statlineSchema from './statlineSchema'
import redisClient from '../../../utils/redisClient'

const findStatlines = async (date: string) => {
    return await prismaClient.statline.findMany({
        where: { game: { nba_day: date } },
        orderBy: { FantasyPoints: 'desc' },
        select: statlineSchema,
        take: 20,
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

export default async (date: string) => {
    const response = await wrapPrismaQuery(() => findStatlines(date))
    if (response) {
        const formattedStatline = response.map(makePercentages)
        try {
            await redisClient.set(`TOP_STATLINES_${date}`.toUpperCase(), JSON.stringify(formattedStatline))
            logger.info(`TOP_STATLINES_${date} has been set`)
        } catch (err) {
            logger.error(err)
        }
    }
}
