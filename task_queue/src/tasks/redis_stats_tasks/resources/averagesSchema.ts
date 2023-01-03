import { Prisma } from '@prisma/client'

export default {
    PlayerID: true,
    FantasyPoints: true,
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
    OffensiveRebounds: true,
    DefensiveRebounds: true,
    Rebounds: true,
    Assists: true,
    Steals: true,
    BlockedShots: true,
    Turnovers: true,
    Points: true,
    player: {
        select: {
            TeamID: true,
            Jersey: true,
            FirstName: true,
            LastName: true,
            team: {
                select: {
                    TeamID: true,
                    Key: true,
                    Name: true,
                    inner_color: true,
                    outer_color: true,
                },
            },
        },
    },
} as Prisma.SeasonAveragesSelect
