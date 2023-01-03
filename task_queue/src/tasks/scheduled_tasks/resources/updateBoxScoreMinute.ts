import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import { formatInTimeZone } from 'date-fns-tz'
import logger from '../../../utils/logger'
import { getBoxScoreByDate } from '../../../utils/api'
import { BoxScoreResponse, StatlineResponse, TeamStatlineResponse } from '../../../utils/types'
import { parseStatResponseToPrisma, parseTeamStatResponseToPrisma } from '../../tasks/resources/loadBoxScoreHelper'

const updateGame = async (GameID: number, boxScore: BoxScoreResponse) => {
    return prismaClient.game.update({
        where: { GameID },
        data: {
            // @ts-ignore prisma doesn't know how to read json
            Quarters: boxScore.Game.Quarters,
            Status: boxScore.Game.Status,
            AwayTeamScore: boxScore.Game.AwayTeamScore,
            HomeTeamScore: boxScore.Game.HomeTeamScore,
            CrewChiefID: boxScore.Game.CrewChiefID,
            UmpireID: boxScore.Game.UmpireID,
            RefereeID: boxScore.Game.RefereeID,
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

export default async () => {
    const nba_day = formatInTimeZone(new Date(), 'America/Los_Angeles', 'yyyy-MMM-dd')
    const boxScores = await getBoxScoreByDate(nba_day)
    if (boxScores) {
        boxScores.forEach(async (boxScore) => {
            const promises = [
                ...boxScore.TeamGames.map((teamStat) => wrapPrismaQuery(() => createTeamStatline(teamStat))),
                ...boxScore.PlayerGames.map((statline) => wrapPrismaQuery(() => createStatline(statline))),
                wrapPrismaQuery(() => updateGame(boxScore.Game.GameID, boxScore)),
            ]
            await Promise.all(promises)
        })
        logger.info('games loaded')
    }
}
