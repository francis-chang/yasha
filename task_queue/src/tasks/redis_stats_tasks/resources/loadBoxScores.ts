import redisClient from '../../../utils/redisClient'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import logger from '../../../utils/logger'
import { subDays, addDays } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

const select = {
    GameID: true,
    Status: true,
    DateTime: true,
    nba_day: true,
    away_team: {
        select: {
            TeamID: true,
            Key: true,
            City: true,
            Name: true,
            Wins: true,
            Losses: true,
        },
    },
    home_team: {
        select: {
            TeamID: true,
            Key: true,
            City: true,
            Name: true,
            Wins: true,
            Losses: true,
        },
    },
    AwayTeamScore: true,
    HomeTeamScore: true,
}

const findBoxScores = async (yesterday: string, today: string, tomorrow: string) => {
    const yDayBoxScores = prismaClient.game.findMany({
        where: { nba_day: yesterday },
        select,
    })
    const tDayBoxScores = prismaClient.game.findMany({
        where: { nba_day: today },
        select,
    })
    const tomBoxScores = prismaClient.game.findMany({
        where: { nba_day: tomorrow },
        select,
    })

    return await Promise.all([yDayBoxScores, tDayBoxScores, tomBoxScores])
}

export default async () => {
    const now = new Date()
    const yesterday = formatInTimeZone(subDays(now, 1), 'America/Los_Angeles', 'yyyy-MMM-dd')
    const today = formatInTimeZone(now, 'America/Los_Angeles', 'yyyy-MMM-dd')
    const tomorrow = formatInTimeZone(addDays(now, 1), 'America/Los_Angeles', 'yyyy-MMM-dd')
    const response = await wrapPrismaQuery(() => findBoxScores(yesterday, today, tomorrow))
    if (response) {
        try {
            await redisClient.set('GAME_INFO', JSON.stringify(response))
            logger.info('GAME INFO HAS BEEN SET')
        } catch (err) {
            logger.error(err)
        }
    }
}
