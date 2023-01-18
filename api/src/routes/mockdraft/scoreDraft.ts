import express, { Request, Response, NextFunction } from 'express'
import logger from '../../utils/logger'
import { prismaClient, wrapPrismaQuery } from '../../utils/prismaClient'
import { Team, TeamSchema } from './typesAndValidator'
import format from 'date-fns/format'

function getRandomIntegers(n: number): number[] {
    var randomNumbers = new Set<number>()
    while (randomNumbers.size < 3) {
        randomNumbers.add(Math.floor(Math.random() * (n + 1)))
    }
    return Array.from(randomNumbers)
}

const twelveMinus = (length: number, n: number) => {
    return length - n
}

const findPlayerStats = async (PlayerID: number) => {
    const response = await prismaClient.statline.findMany({
        where: {
            AND: [
                { PlayerID },
                { game: { DateTime: { lte: new Date(Date.now() - 86400000) } } },
                { FantasyPoints: { gt: 0 } },
            ],
        },
        select: {
            game: { select: { nba_day: true } },
            StatID: true,
            Points: true,
            Rebounds: true,
            Assists: true,
            Steals: true,
            BlockedShots: true,
            Turnovers: true,
            FieldGoalsMade: true,
            FieldGoalsAttempted: true,
            FreeThrowsAttempted: true,
            FreeThrowsMade: true,
            ThreePointersMade: true,
            opponent_team: {
                select: {
                    City: true,
                    Name: true,
                    Key: true,
                },
            },
            player: {
                select: {
                    Jersey: true,
                },
            },
            team: { select: { inner_color: true, outer_color: true } },
        },
        orderBy: {
            game: { nba_day: 'desc' },
        },
    })
    const randomInts = getRandomIntegers(response.length - 1)
    const statlines = [response[randomInts[0]], response[randomInts[1]], response[randomInts[2]]]
    statlines.forEach((s) => {
        const date = new Date(s.game.nba_day)
        const formattedDate = format(date, 'M/d/yy')
        ;(s.game as any).formattedDate = formattedDate
    })
    return { PlayerID, statlines }
}

const scoreDraft = async (req: Request, res: Response, next: NextFunction) => {
    const teams: Team = req.body
    try {
        TeamSchema.parse(teams)
    } catch (err) {
        logger.error(err)
        res.status(400).json({
            msg: 'Something went wrong. Refresh the page to restart draft.',
            desc: 'the request body was not valid',
        })
        return
    }
    let playerIDs: number[] = []

    teams.forEach((t) => {
        playerIDs = [...playerIDs, ...t.team.map(({ PlayerID }) => PlayerID)]
    })
    let response: any
    try {
        response = await Promise.all(playerIDs.map((id) => wrapPrismaQuery(() => findPlayerStats(id), res)))
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: 'Something went wrong when finalizing draft. Please Try again.' })
        return
    }

    teams.forEach((t) => {
        const totals = {
            Points: 0,
            Rebounds: 0,
            Assists: 0,
            Steals: 0,
            BlockedShots: 0,
            FieldGoalsMade: 0,
            FieldGoalsAttempted: 0,
            fgp: 0,
            FreeThrowsMade: 0,
            FreeThrowsAttempted: 0,
            ftp: 0,
            ThreePointersMade: 0,
            Turnovers: 0,
        }
        t.team.forEach((player) => {
            const statlines = response.find((p: any) => p.PlayerID === player.PlayerID)
            player.statlines = statlines.statlines
            statlines.statlines.forEach((stat: any) => {
                totals.Points += stat.Points
                totals.Rebounds += stat.Rebounds
                totals.Assists += stat.Assists
                totals.Steals += stat.Steals
                totals.BlockedShots += stat.BlockedShots
                totals.FieldGoalsMade += stat.FieldGoalsMade
                totals.FieldGoalsAttempted += stat.FieldGoalsAttempted
                totals.FreeThrowsMade += stat.FreeThrowsMade
                totals.FreeThrowsAttempted += stat.FreeThrowsAttempted
                totals.ThreePointersMade += stat.ThreePointersMade
                totals.Turnovers += stat.Turnovers
            })
        })
        totals.fgp = Math.round((totals.FieldGoalsMade / totals.FieldGoalsAttempted) * 1000) / 10
        totals.ftp = Math.round((totals.FreeThrowsMade / totals.FreeThrowsAttempted) * 1000) / 10
        t.totals = totals
    })

    const pointsSorted = [...teams].sort((a, b) => b.totals.Points - a.totals.Points)
    const rebSorted = [...teams].sort((a, b) => b.totals.Rebounds - a.totals.Rebounds)
    const astSorted = [...teams].sort((a, b) => b.totals.Assists - a.totals.Assists)
    const stlSorted = [...teams].sort((a, b) => b.totals.Steals - a.totals.Steals)
    const blkSorted = [...teams].sort((a, b) => b.totals.BlockedShots - a.totals.BlockedShots)
    const fgpSorted = [...teams].sort((a, b) => b.totals.fgp - a.totals.fgp)
    const ftpSorted = [...teams].sort((a, b) => b.totals.ftp - a.totals.ftp)
    const tpmSorted = [...teams].sort((a, b) => b.totals.ThreePointersMade - a.totals.ThreePointersMade)
    const tosSorted = [...teams].sort((a, b) => a.totals.Turnovers - b.totals.Turnovers)

    teams.forEach((t) => {
        t.rankings = {
            Points: pointsSorted.findIndex((p) => p.name === t.name) + 1,
            Rebounds: rebSorted.findIndex((p) => p.name === t.name) + 1,
            Assists: astSorted.findIndex((p) => p.name === t.name) + 1,
            Steals: stlSorted.findIndex((p) => p.name === t.name) + 1,
            BlockedShots: blkSorted.findIndex((p) => p.name === t.name) + 1,
            fgp: fgpSorted.findIndex((p) => p.name === t.name) + 1,
            ftp: ftpSorted.findIndex((p) => p.name === t.name) + 1,
            ThreePointersMade: tpmSorted.findIndex((p) => p.name === t.name) + 1,
            Turnovers: tosSorted.findIndex((p) => p.name === t.name) + 1,
        }
    })
    teams.forEach((t) => {
        const total =
            twelveMinus(teams.length, t.rankings.Points) +
            twelveMinus(teams.length, t.rankings.Rebounds) +
            twelveMinus(teams.length, t.rankings.Assists) +
            twelveMinus(teams.length, t.rankings.Steals) +
            twelveMinus(teams.length, t.rankings.BlockedShots) +
            twelveMinus(teams.length, t.rankings.fgp) +
            twelveMinus(teams.length, t.rankings.ftp) +
            twelveMinus(teams.length, t.rankings.ThreePointersMade) +
            twelveMinus(teams.length, t.rankings.Turnovers)
        t.rankings.total = total
    })
    teams.sort((a, b) => b.rankings.total - a.rankings.total)
    return res.status(200).json(teams)
}

export default scoreDraft
