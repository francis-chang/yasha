import logger from '../../../utils/logger'
import { getGameIDsPastDays } from '../../../utils/api'
import format from 'date-fns/format'
import { formatInTimeZone } from 'date-fns-tz'
import { prismaClient } from '../../../utils/prismaClient'

export default async () => {
    const games = await prismaClient.game.findMany()

    games.forEach(async ({ GameID, DateTime }) => {
        const pacific = formatInTimeZone(DateTime, 'America/Los_Angeles', 'yyyy-MMM-dd')
        await prismaClient.game.update({
            where: { GameID },
            data: { nba_day: pacific },
        })
    })
}
