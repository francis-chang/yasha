import logger from '../../../utils/logger'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import redisClient from '../../../utils/redisClient'

const getPlayersOrderByFan = async () => {
    return prismaClient.seasonAverages.findMany({
        orderBy: { FantasyPoints: 'desc' },
        select: {
            PlayerID: true,
            Points: true,
            Rebounds: true,
            Assists: true,
            Steals: true,
            BlockedShots: true,
            Turnovers: true,
            FantasyPoints: true,
            player: {
                select: {
                    FirstName: true,
                    LastName: true,
                    s_name: true,
                    team: {
                        select: {
                            City: true,
                            Name: true,
                            inner_color: true,
                            outer_color: true,
                            TeamID: true,
                        },
                    },
                },
            },
        },
    })
}

export default async () => {
    const response = await wrapPrismaQuery(getPlayersOrderByFan)
    if (response) {
        const parsedList = response.map((player) => ({
            ...player,
            Points: parseFloat(`${player.Points}`),
            Rebounds: parseFloat(`${player.Rebounds}`),
            Assists: parseFloat(`${player.Assists}`),
            Steals: parseFloat(`${player.Steals}`),
            BlockedShots: parseFloat(`${player.BlockedShots}`),
            Turnovers: parseFloat(`${player.Turnovers}`),
            FantasyPoints: parseFloat(`${player.FantasyPoints}`),
        }))
        redisClient.set('MOCK_DRAFT_LIST', JSON.stringify(parsedList))
        const filteredDraftList = parsedList.map((player, n: number) => ({
            PlayerID: player.PlayerID,
            name: player.player.s_name,
            n,
        }))
        redisClient.set('MOCK_DRAFT_LIST_FOR_PICK', JSON.stringify(filteredDraftList))

        logger.info('MOCK_DRAFT_LIST HAS BEEN SET INTO REDIS')
    } else {
        logger.error('NO RESPONSE FROM PRISMA WHEN TRYING TO SET MOCK_DRAFT_LIST')
    }
}
