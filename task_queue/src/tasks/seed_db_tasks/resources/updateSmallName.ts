import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import logger from '../../../utils/logger'

const findManyPlayers = async () => {
    return await prismaClient.player.findMany({
        select: {
            PlayerID: true,
            FirstName: true,
            LastName: true,
        },
    })
}

const updatePlayer = async (PlayerID: number, s_name: string) => {
    return await prismaClient.player.update({
        where: { PlayerID },
        data: {
            s_name,
        },
    })
}

const makeNameSmaller = (FirstName: string, LastName: string) => {
    if (`${FirstName} ${LastName}`.length <= 16) {
        return `${FirstName} ${LastName}`
    } else if (`${FirstName[0]}. ${LastName}`.length <= 16) {
        return `${FirstName[0]}. ${LastName}`
    } else {
        const dashIndex = LastName.indexOf('-')
        if (dashIndex > 0) {
            return `${FirstName} ${LastName[0]}-${LastName[dashIndex + 1]}.`
        } else {
            if (LastName.indexOf('Jr.') > 0) {
                return `${FirstName} ${LastName[0]}. Jr.`
            } else if (LastName.indexOf('III') > 0) {
                return `${FirstName} ${LastName[0]}. III`
            } else if (LastName.indexOf('IV') > 0) {
                return `${FirstName} ${LastName[0]}. IV`
            } else {
                return `${FirstName} ${LastName[0]}.`
            }
        }
    }
}

export default async () => {
    const players = await findManyPlayers()

    if (players) {
        const mappedPlayers = players.map(({ PlayerID, FirstName, LastName }) => {
            const s_name = makeNameSmaller(FirstName, LastName)
            return wrapPrismaQuery(() => updatePlayer(PlayerID, s_name))
        })

        await Promise.all(mappedPlayers)
        logger.info('Small Names have been updated')
    }
}
