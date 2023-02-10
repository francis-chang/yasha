import { prismaClient, wrapPrismaQuery } from '../../utils/prismaClient'
import { NextFunction, Request, Response } from 'express'
import { addDays } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

const findGames = async (num_games: number, draft_period: number) => {
    const now = Date.now()
    const draftPeriodEnd = addDays(now, draft_period)
    const utcDraftPeriodEnd = zonedTimeToUtc(draftPeriodEnd, Intl.DateTimeFormat().resolvedOptions().timeZone)
    return await prismaClient.game.findMany({
        where: { DateTime: { gte: utcDraftPeriodEnd } },
        orderBy: { DateTime: 'asc' },
        include: {
            home_team: { select: { Key: true, City: true, Name: true } },
            away_team: { select: { Key: true, City: true, Name: true } },
        },
    })
}

const findAllTeams = async () => {
    return await prismaClient.team.findMany({ select: { Key: true } })
}

type RequestBody = {
    num_games: number
    draft_period: number
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const { num_games, draft_period } = req.body as RequestBody
    if (!num_games || !draft_period) {
        return res.status(500).json({ msg: 'num_games is required in request body' })
    } else {
        const games = await wrapPrismaQuery(() => findGames(num_games, draft_period), res)
        const teams = await wrapPrismaQuery(() => findAllTeams(), res)

        if (games && teams) {
            const finalTeams = teams.map((t) => ({ ...t, games: [] }))
            games.forEach((g) => {
                const h_t = finalTeams.find((team) => team.Key === g.home_team.Key) as any
                const a_t = finalTeams.find((team) => team.Key === g.away_team.Key) as any

                const { GameID, DateTime, away_team, home_team } = g

                h_t.games.push({ GameID, DateTime, away_team, home_team })
                a_t.games.push({ GameID, DateTime, away_team, home_team })
            })

            const shortenedTeams = finalTeams.map((t) => {
                return { ...t, games: t.games.slice(0, num_games) }
            })
            return res.status(200).json(shortenedTeams)
        }
    }
}
