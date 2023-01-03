import { getStandings } from '../../../utils/api'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'

const updateTeamWinsLosses = async (TeamID: number, Wins: number, Losses: number) => {
    return await prismaClient.team.update({
        where: { TeamID },
        data: {
            Wins,
            Losses,
        },
    })
}

export default async () => {
    const response = await getStandings()
    if (response) {
        response.forEach(async ({ TeamID, Wins, Losses }) => {
            await wrapPrismaQuery(() => updateTeamWinsLosses(TeamID, Wins, Losses))
        })
    }
}
