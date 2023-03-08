import { getSchedule } from '../../../utils/api'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import logger from '../../../utils/logger'
import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz'

const updateGame = async (GameID: number, DateTime: Date, nba_day: string) => {
    return await prismaClient.game.update({
        where: { GameID },
        data: {
            nba_day,
            DateTime,
        },
    })
}

export default async () => {
    const games = await getSchedule()

    if (games) {
        const mappedGames = games.map(({ GameID, DateTimeUTC }) => {
            // const zonedTime = utcToZonedTime(new Date(DateTimeUTC), 'America/Los_Angeles')
            if (DateTimeUTC) {
                const formattedTime = formatInTimeZone(
                    new Date(DateTimeUTC + 'Z'),
                    'America/Los_Angeles',
                    'yyyy-MMM-dd'
                )
                return wrapPrismaQuery(() => updateGame(GameID, new Date(DateTimeUTC), formattedTime))
            }
        })

        await Promise.all(mappedGames)
        logger.info('Dates for Games have been updated')
    }
}
