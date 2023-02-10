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
                    stadium: true,
                    TimeRemainingMinutes: true,
                    TimeRemainingSeconds: true,
                    away_team: {
                        select: {
                            Key: true,
                            Score: true,
                        },
                    },
                    home_team: {
                        select: {
                            Key: true,
                            Score: true,
                        },
                    },
                },
            })
            responses.push({ date, games: response })
        })
    )
    responses.sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate: Date = new Date(b.date)
        return aDate.getTime() - bDate.getTime()
    })

    responses.forEach((day) => {
        //@ts-ignore
        day.games.sort((a: any, b: any) => {
            let statusOrder = {
                InProgress: 0,
                Scheduled: 1,
                Final: 2,
                'F/OT': 2,
            } as any
            if (statusOrder[a.Status] === statusOrder[b.Status]) {
                const aScore = a.home_team.Score + a.away_team.Score
                const bScore = b.home_team.Score + b.away_team.Score
                const score = bScore - aScore

                return score
            } else {
                return statusOrder[a.Status] - statusOrder[b.Status]
            }
        })
    })
    return responses
}

export default async () => {
    const response = await getGames()
    redisClient.set('FOUR_DAY_SCORES', JSON.stringify(response))
    console.log('FOUR_DAY_SCORES_UPLOADED')
}
