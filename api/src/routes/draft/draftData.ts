import express, { Request, Response, NextFunction } from 'express'
import logger from '../../utils/logger'
import { prismaClient, wrapPrismaQuery } from '../../utils/prismaClient'

/**
 * THIS ENDPOINT MUST GET A CACHED LIST ON REDIS SET BY THE TASK QUEUE
 */

const getPlayersOrderByFan = async () => {
    return prismaClient.player.findMany({
        orderBy: { season_averages: { FantasyPoints: 'desc' } },
        where: {
            season_averages: { isNot: null },
        },
        select: {
            FirstName: true,
            LastName: true,
            s_name: true,
            Jersey: true,
            team: {
                select: {
                    City: true,
                    Name: true,
                    inner_color: true,
                    outer_color: true,
                    TeamID: true,
                },
            },
            season_averages: true,
            last_five_averages: true,
            statlines: {
                where: { NOT: { game: { Status: 'Scheduled' } } },
                orderBy: { game: { DateTime: 'desc' } },
                select: {
                    InjuryStatus: true,
                    Minutes: true,
                    Seconds: true,
                    FieldGoalsMade: true,
                    FieldGoalsAttempted: true,
                    FieldGoalsPercentage: true,
                    ThreePointersMade: true,
                    ThreePointersAttempted: true,
                    FreeThrowsMade: true,
                    FreeThrowsAttempted: true,
                    FreeThrowsPercentage: true,
                    Rebounds: true,
                    Assists: true,
                    Steals: true,
                    BlockedShots: true,
                    Points: true,
                    Turnovers: true,
                    opponent_team: { select: { Key: true } },
                },

                take: 7,
            },
        },
    })
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const response = await wrapPrismaQuery(getPlayersOrderByFan, res)

    if (response) {
        const newSeason = response.map((player) => {
            if (!player.season_averages && !player.last_five_averages) {
                return player
            } else {
                //@ts-ignore
                const { FieldGoalsPercentage, ThreePointersPercentage, FreeThrowsPercentage } = player.season_averages
                const fgpFloat = parseFloat(`${FieldGoalsPercentage}`)
                const tppFloat = parseFloat(`${ThreePointersPercentage}`)
                const ftpFloat = parseFloat(`${FreeThrowsPercentage}`)
                const fgp = Number.isNaN(fgpFloat) || fgpFloat < 0 ? '~' : Math.round(fgpFloat)
                const tpp = Number.isNaN(fgpFloat) || fgpFloat < 0 ? '~' : Math.round(tppFloat)
                const ftp = Number.isNaN(fgpFloat) || fgpFloat < 0 ? '~' : Math.round(ftpFloat)

                //@ts-ignore
                const lfgafgpFloat = parseFloat(`${player.last_five_averages.FieldGoalsPercentage}`)
                //@ts-ignore
                const lfgatppFloat = parseFloat(`${player.last_five_averages.ThreePointersPercentage}`)
                //@ts-ignore
                const lfgaftpFloat = parseFloat(`${player.last_five_averages.FreeThrowsPercentage}`)
                const lfgafgp = Number.isNaN(lfgafgpFloat) || lfgafgpFloat < 0 ? '~' : Math.round(lfgafgpFloat)
                const lfgatpp = Number.isNaN(lfgafgpFloat) || lfgafgpFloat < 0 ? '~' : Math.round(lfgatppFloat)
                const lfgaftp = Number.isNaN(lfgafgpFloat) || lfgafgpFloat < 0 ? '~' : Math.round(lfgaftpFloat)
                return {
                    ...player,
                    season_averages: { ...player.season_averages, pct: `${fgp}/${tpp}/${ftp}` },
                    last_five_averages: { ...player.last_five_averages, pct: `${lfgafgp}/${lfgatpp}/${lfgaftp}` },
                }
            }
        })
        return res.status(200).json(newSeason)
    }

    return next()
}
