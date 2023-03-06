import { getSchedule, getStadiums } from '../../../utils/api'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import { Game, Prisma } from '@prisma/client'
import { GameOfScheduleResponse } from '../../../utils/types'
import logger from '../../../utils/logger'

const insertGames = async (data: Game[]) => {
    return await prismaClient.game.createMany({
        data: data.map((game) => ({
            ...game,
            Quarters: game.Quarters as Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue | undefined,
        })),
    })
}

const upsertGame = async (data: Game) => {
    return await prismaClient.game.upsert({
        where: { GameID: data.GameID },
        update: {
            ...data,
            Quarters: data.Quarters as Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue | undefined,
        },
        create: {
            ...data,
            Quarters: data.Quarters as Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue | undefined,
        },
    })
}

const gameMapFunction = (game: GameOfScheduleResponse, stadium: string, city: string) => {
    // SportsData gives dates in EST
    const DateTime = new Date(game.DateTime + '-04:00')
    const Day = new Date(game.Day + '-04:00')
    return {
        GameID: game.GameID,
        Season: game.Season,
        SeasonType: game.SeasonType,
        Status: game.Status,
        Channel: game.Channel,
        Day,
        DateTime,
        AwayTeamID: game.AwayTeamID,
        HomeTeamID: game.HomeTeamID,
        stadium,
        city,
        AwayTeamScore: game.AwayTeamScore,
        HomeTeamScore: game.HomeTeamScore,
        Quarter: game.Quarter,
        TimeRemainingMinutes: null,
        TimeRemainingSeconds: null,
        Quarters: JSON.stringify(game.Quarters),
        CrewChiefID: game.CrewChiefID,
        UmpireID: game.UmpireID,
        RefereeID: game.RefereeID,
    } as Game
}

export default async () => {
    const [games, stadiums] = await Promise.all([getSchedule(), getStadiums()])

    if (games && stadiums) {
        const mappedGames = games.map((game) => {
            const stadium = stadiums.filter((s) => s.StadiumID === game.StadiumID)[0]
            if (!stadium) {
                logger.error(`Stadium not associated with game`)
                return gameMapFunction(game, 'N/A', 'N/A')
            } else {
                return gameMapFunction(game, stadium.Name, stadium.City)
            }
        })
        mappedGames.forEach(async (game) => {
            if (game.Status !== 'Canceled') {
                try {
                    const response = await upsertGame(game)
                } catch (err) {
                    console.log(game.GameID)
                    console.log(err)
                }
            }
        }, [])
        // await wrapPrismaQuery(() => insertGames(mappedGames))
        // logger.info('Games have been uploaded to db')
    }
}
