import { getBoxScore } from '../../../utils/api'
import logger from '../../../utils/logger'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import statsqueue from '../../../utils/bullmqProducer'
import { BoxScoreResponse, TeamStatlineResponse, StatlineResponse } from '../../../utils/types'
import { parseTeamStatResponseToPrisma, parseStatResponseToPrisma } from './loadBoxScoreHelper'

const updateGame = async (GameID: number, boxScore: BoxScoreResponse) => {
    return prismaClient.game.update({
        where: { GameID },
        data: {
            // @ts-ignore prisma doesn't know how to read json
            Quarters: boxScore.Game.Quarters,
            Status: boxScore.Game.Status,
            AwayTeamScore: boxScore.Game.AwayTeamScore,
            HomeTeamScore: boxScore.Game.HomeTeamScore,
        },
    })
}

const createTeamStatline = async (teamStatline: TeamStatlineResponse) => {
    return prismaClient.teamStatlines.upsert({
        where: { StatID: teamStatline.StatID },
        create: parseTeamStatResponseToPrisma(teamStatline),
        update: parseTeamStatResponseToPrisma(teamStatline),
    })
}

const createStatline = async (statline: StatlineResponse) => {
    const response = await prismaClient.player.findUnique({ where: { PlayerID: statline.PlayerID } })
    if (!response) {
        console.warn(`${statline.Name} - ${statline.PlayerID} NOT PRESENT IN DB`)
    } else {
        return prismaClient.statline.upsert({
            where: { StatID: statline.StatID },
            create: parseStatResponseToPrisma(statline),
            update: parseStatResponseToPrisma(statline),
        })
    }
}

export default async (GameIDs: number[]) => {
    logger.info(GameIDs)
    const GameIDsCopy = GameIDs.slice()
    const GameID = GameIDsCopy.pop()
    if (!GameID) {
        logger.info('BoxScore Finished')
    } else {
        const gameResponse = await getBoxScore(GameID)
        if (gameResponse) {
            const promises = [
                ...gameResponse.TeamGames.map((teamStat) => wrapPrismaQuery(() => createTeamStatline(teamStat))),
                ...gameResponse.PlayerGames.map((statline) => wrapPrismaQuery(() => createStatline(statline))),
                wrapPrismaQuery(() => updateGame(GameID, gameResponse)),
            ]
            try {
                await Promise.all(promises)
            } catch (err) {
                console.error(err)
            }
        }

        logger.info(`${GameID} being processed`)
        if (GameIDsCopy.length > 0) {
            logger.info(`${GameIDsCopy.length} more games to process box scores`)
            await statsqueue.add('loadBoxScore', GameIDsCopy, { delay: 3000 })
        } else {
            logger.info('Finished processing all box scores')
        }
    }
}
