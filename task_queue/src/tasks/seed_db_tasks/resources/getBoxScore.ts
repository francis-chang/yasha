import { getBoxScore } from '../../../utils/api'
import logger from '../../../utils/logger'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import statsqueue from '../../../utils/bullmqProducer'

const getAllFinishedGames = async () => {
    // return await prismaClient.game.findMany({
    //     where: {
    //         NOT: [{ Status: 'Scheduled' }],
    //     },
    //     select: {
    //         GameID: true,
    //     },
    // })
    return [{ GameID: 18600 }, { GameID: 18263 }, { GameID: 18262 }, { GameID: 18278 }]
}

export default async () => {
    const response = await wrapPrismaQuery(getAllFinishedGames)
    if (response) {
        const GameIDs = response.map((element) => element.GameID)
        await statsqueue.add('loadBoxScore', GameIDs)
    }
}
