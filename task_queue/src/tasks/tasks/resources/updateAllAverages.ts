import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import statsqueue from '../../../utils/bullmqProducer'
const findAllPlayerIds = async () => {
    return prismaClient.player.findMany({
        select: { PlayerID: true },
    })
}

export default async () => {
    const response = await wrapPrismaQuery(findAllPlayerIds)
    if (response) {
        const promises = response.map(({ PlayerID }) => statsqueue.add('updateAverages', PlayerID))
        const lastFivepromises = response.map(({ PlayerID }) => statsqueue.add('updateLastFiveAverages', PlayerID))
        await Promise.all([...promises, ...lastFivepromises])
    }
}
