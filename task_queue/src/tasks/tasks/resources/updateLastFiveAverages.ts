import logger from '../../../utils/logger'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import { sumFields, avgFields, formatAverageData } from './averagesHelper'

const findPercentage = (made: number | null | undefined, attempted: number | null | undefined) => {
    if (attempted === 0) {
        return -1
    } else if (!attempted || !made) {
        return 0
    } else {
        return (made / attempted) * 100
    }
}

export default async (PlayerID: number) => {
    try {
        const aggregateData = await prismaClient.statline.aggregate({
            _max: { Name: true },
            _avg: avgFields,
            _sum: sumFields,
            // count is grabbed so we can divide minutes by it to get avg minutes per line 20
            _count: { PlayerID: true },
            where: {
                AND: [{ PlayerID }, { OR: [{ Minutes: { gt: 0 } }, { Seconds: { gt: 0 } }] }],
            },
            orderBy: {
                game: {
                    Day: 'desc',
                },
            },
            take: 5,
        })
        const { Name } = aggregateData._max
        if (Name) {
            const { Minutes, Seconds } = aggregateData._sum
            let avgMinutes = 0
            if (Minutes && Seconds && aggregateData._count.PlayerID) {
                const totalSeconds = Minutes * 60 + Seconds
                const avgTotalSeconds = totalSeconds / aggregateData._count.PlayerID
                avgMinutes = Math.round(avgTotalSeconds / 60)
            }

            const {
                FieldGoalsAttempted,
                FieldGoalsMade,
                TwoPointersAttempted,
                TwoPointersMade,
                ThreePointersAttempted,
                ThreePointersMade,
                FreeThrowsAttempted,
                FreeThrowsMade,
            } = aggregateData._sum

            const FieldGoalsPercentage = findPercentage(FieldGoalsMade, FieldGoalsAttempted)
            const TwoPointersPercentage = findPercentage(TwoPointersMade, TwoPointersAttempted)
            const ThreePointersPercentage = findPercentage(ThreePointersMade, ThreePointersAttempted)
            const FreeThrowsPercentage = findPercentage(FreeThrowsMade, FreeThrowsAttempted)

            await prismaClient.lastFiveGameAverages.upsert({
                where: { PlayerID },
                create: {
                    //@ts-ignore prisma _avg type is not able to infer the type that we pass it
                    ...formatAverageData(aggregateData._avg),
                    PlayerID,
                    Minutes: avgMinutes,
                    FieldGoalsPercentage,
                    TwoPointersPercentage,
                    ThreePointersPercentage,
                    FreeThrowsPercentage,
                },
                update: {
                    //@ts-ignore prisma _avg type is not able to infer the type that we pass it
                    ...formatAverageData(aggregateData._avg),
                    PlayerID,
                    Minutes: avgMinutes,
                    FieldGoalsPercentage,
                    TwoPointersPercentage,
                    ThreePointersPercentage,
                    FreeThrowsPercentage,
                },
            })
            logger.info(`${aggregateData._max.Name}  ${PlayerID} Last Five Average Updated`)
        } else {
            logger.info(`${PlayerID} has not played this season, therefore avg not calculated`)
        }
    } catch (err) {
        logger.error(err)
    }
}
