import { Prisma } from '@prisma/client'

export default {
    StatID: true,
    PlayerID: true,
    Name: true,
    FantasyPoints: true,
    Minutes: true,
    Seconds: true,
    FieldGoalsMade: true,
    FieldGoalsAttempted: true,
    FieldGoalsPercentage: true,
    TwoPointersMade: true,
    TwoPointersAttempted: true,
    ThreePointersMade: true,
    ThreePointersAttempted: true,
    ThreePointersPercentage: true,
    FreeThrowsMade: true,
    FreeThrowsAttempted: true,
    FreeThrowsPercentage: true,
    Rebounds: true,
    Assists: true,
    Steals: true,
    BlockedShots: true,
    Turnovers: true,
    Points: true,
    opponent_team: {
        select: {
            TeamID: true,
            Key: true,
            Name: true,
        },
    },
    team: {
        select: {
            TeamID: true,
            Key: true,
            Name: true,
            inner_color: true,
            outer_color: true,
        },
    },
    game: {
        select: {
            DateTime: true,
            AwayTeamID: true,
            HomeTeamID: true,
        },
    },
    player: {
        select: {
            Jersey: true,
            FirstName: true,
            LastName: true,
        },
    },
} as Prisma.StatlineSelect
