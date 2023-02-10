import { getPlayers } from '../../../utils/api'
import logger from '../../../utils/logger'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import { Player } from '@prisma/client'
import { PlayerResponse } from '../../../utils/types'

const createPlayers = async (data: Player[]) => {
    return await prismaClient.player.createMany({
        data,
    })
}

const parseString = (element: null | string) => {
    if (!element) {
        return ''
    } else {
        return element
    }
}

const parseInteger = (num: null | number) => {
    if (!num && num !== 0) {
        return -1
    } else {
        return num
    }
}

const parsePlayers = (player: PlayerResponse) => {
    return {
        PlayerID: player.PlayerID,
        TeamID: player.TeamID,
        Jersey: parseInteger(player.Jersey),
        PositionCategory: player.PositionCategory,
        Position: player.Position,
        FirstName: player.FirstName,
        LastName: player.LastName,
        Height: parseInteger(player.Height),
        Weight: parseInteger(player.Weight),
        BirthDate: parseString(player.BirthDate),
        BirthCity: parseString(player.BirthCity),
        BirthState: parseString(player.BirthState),
        BirthCountry: parseString(player.BirthCountry),
        HighSchool: parseString(player.HighSchool),
        College: parseString(player.College),
        PhotoUrl: parseString(player.PhotoUrl),
        SportRadarPlayerID: parseString(player.SportRadarPlayerID),
        RotoworldPlayerID: parseInteger(player.RotoworldPlayerID),
        RotoWirePlayerID: parseInteger(player.RotoWirePlayerID),
        FantasyAlarmPlayerID: parseInteger(player.FantasyAlarmPlayerID),
        InjuryStatus: player.InjuryStatus,
        InjuryBodyPart: player.InjuryBodyPart,
        InjuryStartDate: player.InjuryStartDate,
        InjuryNotes: player.InjuryNotes,
        FanDuelPlayerID: parseInteger(player.FanDuelPlayerID),
        DraftKingsPlayerID: parseInteger(player.DraftKingsPlayerID),
        YahooPlayerID: parseInteger(player.YahooPlayerID),
        FanDuelName: parseString(player.FanDuelName),
        DraftKingsName: parseString(player.DraftKingsName),
        YahooName: parseString(player.YahooName),
        DepthChartPosition: parseString(player.DepthChartPosition),
        DepthChartOrder: parseInteger(player.DepthChartOrder),
        UsaTodayPlayerID: parseInteger(player.UsaTodayPlayerID),
        UsaTodayHeadshotUrl: parseString(player.UsaTodayHeadshotUrl),
        UsaTodayHeadshotNoBackgroundUrl: parseString(player.UsaTodayHeadshotNoBackgroundUrl),
        UsaTodayHeadshotUpdated: parseString(player.UsaTodayHeadshotUpdated),
        UsaTodayHeadshotNoBackgroundUpdated: parseString(player.UsaTodayHeadshotNoBackgroundUpdated),
        NbaDotComPlayerID: parseInteger(player.NbaDotComPlayerID),
    } as Player
}

export default async () => {
    const response = await getPlayers()
    if (response) {
        await wrapPrismaQuery(() => createPlayers(response.map(parsePlayers)))
        logger.info('players have been updated to db')
    }
}
