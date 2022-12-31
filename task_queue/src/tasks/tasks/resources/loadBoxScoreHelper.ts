import { StatlineResponse, TeamStatlineResponse } from '../../../utils/types'
import { TeamStatlines, Prisma, Statline } from '@prisma/client'

const parseDecimal = (num: number | null) => {
    if (!num) {
        return new Prisma.Decimal(-1)
    } else {
        return new Prisma.Decimal(num)
    }
}

const parseInteger = (num: number | null) => {
    if (!num) {
        return 0
    } else {
        return num
    }
}

const parseStatResponseToPrisma = (data: StatlineResponse) => {
    return {
        StatID: data.StatID,
        TeamID: data.TeamID,
        PlayerID: data.PlayerID,
        Name: data.Name,
        Position: data.Position,
        Started: data.Started,
        InjuryStatus: data.InjuryStatus,
        InjuryBodyPart: data.InjuryBodyPart,
        InjuryStartDate: data.InjuryStartDate,
        InjuryNotes: data.InjuryNotes,
        GameID: data.GameID,
        OpponentID: data.OpponentID,
        HomeOrAway: data.HomeOrAway,
        FantasyPoints: parseDecimal(data.FantasyPoints),
        Minutes: parseInteger(data.Minutes),
        Seconds: parseInteger(data.Seconds),
        FieldGoalsMade: parseInteger(data.FieldGoalsMade),
        FieldGoalsAttempted: parseInteger(data.FieldGoalsAttempted),
        FieldGoalsPercentage: parseDecimal(data.FieldGoalsPercentage),
        EffectiveFieldGoalsPercentage: parseDecimal(data.EffectiveFieldGoalsPercentage),
        TwoPointersMade: parseInteger(data.TwoPointersMade),
        TwoPointersAttempted: parseInteger(data.TwoPointersAttempted),
        TwoPointersPercentage: parseDecimal(data.TwoPointersPercentage),
        ThreePointersMade: parseInteger(data.ThreePointersMade),
        ThreePointersAttempted: parseInteger(data.ThreePointersAttempted),
        ThreePointersPercentage: parseDecimal(data.ThreePointersPercentage),
        FreeThrowsMade: parseInteger(data.FreeThrowsMade),
        FreeThrowsAttempted: parseInteger(data.FreeThrowsAttempted),
        FreeThrowsPercentage: parseDecimal(data.FreeThrowsPercentage),
        OffensiveRebounds: parseInteger(data.OffensiveRebounds),
        DefensiveRebounds: parseInteger(data.DefensiveRebounds),
        Rebounds: parseInteger(data.Rebounds),
        OffensiveReboundsPercentage: parseDecimal(data.OffensiveReboundsPercentage),
        DefensiveReboundsPercentage: parseDecimal(data.DefensiveReboundsPercentage),
        TotalReboundsPercentage: parseDecimal(data.TotalReboundsPercentage),
        Assists: parseInteger(data.Assists),
        Steals: parseInteger(data.Steals),
        BlockedShots: parseInteger(data.BlockedShots),
        Turnovers: parseInteger(data.Turnovers),
        PersonalFouls: parseInteger(data.PersonalFouls),
        Points: parseInteger(data.Points),
        TrueShootingPercentage: parseDecimal(data.TrueShootingPercentage),
        PlayerEfficiencyRating: parseDecimal(data.PlayerEfficiencyRating),
        AssistsPercentage: parseDecimal(data.AssistsPercentage),
        StealsPercentage: parseDecimal(data.StealsPercentage),
        BlocksPercentage: parseDecimal(data.BlocksPercentage),
        TurnOversPercentage: parseDecimal(data.TurnOversPercentage),
        UsageRatePercentage: parseDecimal(data.UsageRatePercentage),
        FantasyPointsFanDuel: parseDecimal(data.FantasyPointsFanDuel),
        FantasyPointsDraftKings: parseDecimal(data.FantasyPointsDraftKings),
        FantasyPointsYahoo: parseDecimal(data.FantasyPointsYahoo),
        PlusMinus: data.PlusMinus,
        DoubleDoubles: data.DoubleDoubles,
        TripleDoubles: data.TripleDoubles,
        FantasyPointsFantasyDraft: parseDecimal(data.FantasyPointsFantasyDraft),
    } as Statline
}

const parseTeamStatResponseToPrisma = (data: TeamStatlineResponse) => {
    return {
        StatID: data.StatID,
        TeamID: data.TeamID,
        Season: data.Season,
        Name: data.Name,
        Team: data.Team,
        Wins: data.Wins,
        Losses: data.Losses,
        GameID: data.GameID,
        OpponentID: data.OpponentID,
        Opponent: data.Opponent,
        HomeOrAway: data.HomeOrAway,
        IsGameOver: data.IsGameOver,
        FieldGoalsMade: data.FieldGoalsMade,
        FieldGoalsAttempted: data.FieldGoalsAttempted,
        FieldGoalsPercentage: parseDecimal(data.FieldGoalsPercentage),
        EffectiveFieldGoalsPercentage: parseDecimal(data.EffectiveFieldGoalsPercentage),
        TwoPointersMade: data.TwoPointersMade,
        TwoPointersAttempted: data.TwoPointersAttempted,
        TwoPointersPercentage: parseDecimal(data.TwoPointersPercentage),
        ThreePointersMade: data.ThreePointersMade,
        ThreePointersAttempted: data.ThreePointersAttempted,
        ThreePointersPercentage: parseDecimal(data.ThreePointersPercentage),
        FreeThrowsMade: data.FreeThrowsMade,
        FreeThrowsAttempted: data.FreeThrowsAttempted,
        FreeThrowsPercentage: parseDecimal(data.FreeThrowsPercentage),
        OffensiveRebounds: data.OffensiveRebounds,
        DefensiveRebounds: data.DefensiveRebounds,
        Rebounds: data.Rebounds,
        Assists: data.Assists,
        Steals: data.Steals,
        BlockedShots: data.BlockedShots,
        Turnovers: data.Turnovers,
        PersonalFouls: data.PersonalFouls,
        Points: data.Points,
        TrueShootingPercentage: parseDecimal(data.TrueShootingPercentage),
        FantasyPointsFanDuel: parseDecimal(data.FantasyPointsFanDuel),
        FantasyPointsDraftKings: parseDecimal(data.FantasyPointsDraftKings),
        FantasyPointsYahoo: parseDecimal(data.FantasyPointsYahoo),
    } as TeamStatlines
}

export { parseTeamStatResponseToPrisma, parseStatResponseToPrisma }
