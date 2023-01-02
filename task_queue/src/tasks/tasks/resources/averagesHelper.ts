import { Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'

const formatAverageData = (data: { [key: string]: Decimal | null }) => {
    return {
        FantasyPoints: data.FantasyPoints ? data.FantasyPoints : 0,
        FieldGoalsMade: data.FieldGoalsMade ? data.FieldGoalsMade : 0,
        FieldGoalsAttempted: data.FieldGoalsAttempted ? data.FieldGoalsAttempted : 0,
        TwoPointersMade: data.TwoPointersMade ? data.TwoPointersMade : 0,
        TwoPointersAttempted: data.TwoPointersAttempted ? data.TwoPointersAttempted : 0,
        ThreePointersMade: data.ThreePointersMade ? data.ThreePointersMade : 0,
        ThreePointersAttempted: data.ThreePointersAttempted ? data.ThreePointersAttempted : 0,
        FreeThrowsMade: data.FreeThrowsMade ? data.FreeThrowsMade : 0,
        FreeThrowsAttempted: data.FreeThrowsAttempted ? data.FreeThrowsAttempted : 0,
        OffensiveRebounds: data.OffensiveRebounds ? data.OffensiveRebounds : 0,
        DefensiveRebounds: data.DefensiveRebounds ? data.DefensiveRebounds : 0,
        Rebounds: data.Rebounds ? data.Rebounds : 0,
        Assists: data.Assists ? data.Assists : 0,
        Steals: data.Steals ? data.Steals : 0,
        BlockedShots: data.BlockedShots ? data.BlockedShots : 0,
        Turnovers: data.Turnovers ? data.Turnovers : 0,
        PersonalFouls: data.PersonalFouls ? data.PersonalFouls : 0,
        Points: data.Points ? data.Points : 0,
        FantasyPointsFanDuel: data.FantasyPointsFanDuel ? data.FantasyPointsFanDuel : 0,
        FantasyPointsDraftKings: data.FantasyPointsDraftKings ? data.FantasyPointsDraftKings : 0,
        FantasyPointsYahoo: data.FantasyPointsYahoo ? data.FantasyPointsYahoo : 0,
        PlusMinus: -1,
    }
}

// this is used for aggregate _avg
const avgFields: Prisma.StatlineAvgAggregateInputType = {
    FantasyPoints: true,
    FieldGoalsMade: true,
    FieldGoalsAttempted: true,
    TwoPointersMade: true,
    TwoPointersAttempted: true,
    ThreePointersMade: true,
    ThreePointersAttempted: true,
    FreeThrowsMade: true,
    FreeThrowsAttempted: true,
    OffensiveRebounds: true,
    DefensiveRebounds: true,
    Rebounds: true,
    Assists: true,
    Steals: true,
    BlockedShots: true,
    Turnovers: true,
    PersonalFouls: true,
    Points: true,
    FantasyPointsFanDuel: true,
    FantasyPointsDraftKings: true,
    FantasyPointsYahoo: true,
}

const sumFields: Prisma.StatlineAvgAggregateInputType = {
    Minutes: true,
    Seconds: true,
    FieldGoalsAttempted: true,
    FieldGoalsMade: true,
    TwoPointersAttempted: true,
    TwoPointersMade: true,
    ThreePointersAttempted: true,
    ThreePointersMade: true,
    FreeThrowsAttempted: true,
    FreeThrowsMade: true,
}

export { avgFields, sumFields, formatAverageData }
