import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import addDays from 'date-fns/addDays'
import redisClient from '../../../utils/redisClient'
import logger from '../../../utils/logger'

const prismaGetStatlines = async () => {
    const eightDaysAgo = addDays(Date.now(), -120)
    const games = await prismaClient.game.findMany({
        where: {
            DateTime: { gte: eightDaysAgo },
        },
        select: {
            statlines: {
                select: {
                    StatID: true,
                    PlayerID: true,
                    team: {
                        select: {
                            City: true,
                            Name: true,
                            inner_color: true,
                            outer_color: true,
                        },
                    },
                    Name: true,
                    player: {
                        select: { Jersey: true, s_name: true },
                    },
                    opponent_team: {
                        select: {
                            Key: true,
                        },
                    },
                    game: {
                        select: {
                            nba_day: true,
                        },
                    },
                    FantasyPoints: true,
                    FieldGoalsMade: true,
                    FieldGoalsAttempted: true,
                    FieldGoalsPercentage: true,
                    ThreePointersMade: true,
                    ThreePointersAttempted: true,
                    ThreePointersPercentage: true,
                    FreeThrowsMade: true,
                    FreeThrowsAttempted: true,
                    FreeThrowsPercentage: true,
                    Rebounds: true,
                    Assists: true,
                    Steals: true,
                    BlockedShots: true,
                    Points: true,
                    Turnovers: true,
                },
            },
        },
    })

    return games
        .map((g) => [...g.statlines])
        .flat()
        .sort((a, b) => {
            //@ts-ignore
            return b.FantasyPoints - a.FantasyPoints
        })
        .slice(0, 100)
}

export default async () => {
    const response = await wrapPrismaQuery(prismaGetStatlines)

    if (response) {
        await redisClient.set('TOP_STATLINES_DAYS', JSON.stringify(response))
        logger.info('TOP_STATLINES_DAYS HAVE BEEN SET')
    }
}
