import { Player } from '@prisma/client'
import { getPlayer } from '../../../utils/api'
import logger from '../../../utils/logger'
import { prismaClient } from '../../../utils/prismaClient'
import { PlayerResponse } from '../../../utils/types'

const createPlayer = async (data: Player) => {
    return await prismaClient.player.create({
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
    if (!num) {
        return -1
    } else {
        return num
    }
}
const parsePlayers = (player: PlayerResponse) => {
    return {
        PlayerID: player.PlayerID,
        TeamID: player.TeamID,
        Jersey: player.Jersey,
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

export default async (PlayerID: number) => {
    const response = await getPlayer(PlayerID)
    if (response) {
        await createPlayer(parsePlayers(response))
        logger.info(`${response.FirstName} ${response.LastName} has updated into the DB`)
    }
}
