import { getInjuries } from '../../../utils/api'
import logger from '../../../utils/logger'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import { PlayerResponse } from '../../../utils/types'

const setInjuriesNull = async () => {
    return await prismaClient.player.updateMany({
        data: {
            InjuryBodyPart: null,
            InjuryNotes: null,
            InjuryStartDate: null,
            InjuryStatus: null,
        },
    })
}

const updateInjury = async (player: PlayerResponse) => {
    await prismaClient.player.updateMany({
        where: { PlayerID: player.PlayerID },
        data: {
            InjuryBodyPart: player.InjuryBodyPart,
            InjuryNotes: player.InjuryNotes,
            InjuryStartDate: player.InjuryStartDate,
            InjuryStatus: player.InjuryStatus,
        },
    })
}

export default async () => {
    await wrapPrismaQuery(setInjuriesNull)
    const response = await getInjuries()
    if (response) {
        response.forEach(async (player) => {
            await wrapPrismaQuery(() => updateInjury(player))
        })
        logger.info('INJURIES HAVE BEEN UPDATED')
    }
}
