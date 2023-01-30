import { getInjuries } from '../../../utils/api'
import logger from '../../../utils/logger'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import { PlayerResponse } from '../../../utils/types'
import { addDays } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { Game } from '@prisma/client'
import redisClient from '../../../utils/redisClient'

const getGames = async () => {
    const d = parseInt(formatInTimeZone(new Date(), 'America/New_York', 'HH'))
    const today = d >= 12 ? new Date() : addDays(new Date(), 1)
    let tomorrow = addDays(today, 1)
    const dates = []
    for (let i = 4; i > 0; i--) {
        dates.push(formatInTimeZone(tomorrow, 'America/New_York', 'yyyy-MMM-dd'))
        tomorrow = addDays(tomorrow, -1)
    }

    const responses: { date: string; games: any[] }[] = []
    await Promise.all(
        dates.map(async (date) => {
            const response = await prismaClient.game.findMany({
                where: { nba_day: date },
                select: {
                    GameID: true,
                    Status: true,
                    DateTime: true,
                    AwayTeamScore: true,
                    HomeTeamScore: true,
                    Quarter: true,
                    TimeRemainingMinutes: true,
                    TimeRemainingSeconds: true,
                    away_team: {
                        select: {
                            Key: true,
                        },
                    },
                    home_team: {
                        select: {
                            Key: true,
                        },
                    },
                },
            })
            responses.push({ date, games: response })
        })
    )
    responses.sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        return bDate.getDate() - aDate.getDate()
    })
    return responses
}

export default async () => {
    const response = await getGames()
    redisClient.set('FOUR_DAY_SCORES', JSON.stringify(response))
    console.log('FOUR_DAY_SCORES_UPLOADED')
}
