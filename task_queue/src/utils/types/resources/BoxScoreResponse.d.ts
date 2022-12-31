export default interface BoxScoreResponse {
    StatID: number
    TeamID: number
    SeasonType: number
    Season: number
    Name: string
    Team: string
    Wins: number | null
    Losses: number | null
    Possessions: number | null
    GlobalTeamID: number | null
    GameID: number | null
    OpponentID: number | null
    Opponent: string
    Day: string
    DateTime: string
    HomeOrAway: string
    IsGameOver: true
    GlobalGameID: number | null
    GlobalOpponentID: number | null
    Updated: string
    Games: number | null
    FantasyPoints: number | null
    Minutes: number | null
    Seconds: number | null
    FieldGoalsMade: number | null
    FieldGoalsAttempted: number | null
    FieldGoalsPercentage: number | null
    EffectiveFieldGoalsPercentage: number | null
    TwoPointersMade: number | null
    TwoPointersAttempted: number | null
    TwoPointersPercentage: number | null
    ThreePointersMade: number | null
    ThreePointersAttempted: number | null
    ThreePointersPercentage: number | null
    FreeThrowsMade: number | null
    FreeThrowsAttempted: number | null
    FreeThrowsPercentage: number | null
    OffensiveRebounds: number | null
    DefensiveRebounds: number | null
    Rebounds: number | null
    OffensiveReboundsPercentage: number | null
    DefensiveReboundsPercentage: number | null
    TotalReboundsPercentage: number | null
    Assists: number | null
    Steals: number | null
    BlockedShots: number | null
    Turnovers: number | null
    PersonalFouls: number | null
    Points: number | null
    TrueShootingAttempts: number | null
    TrueShootingPercentage: number | null
    PlayerEfficiencyRating: number | null
    AssistsPercentage: number | null
    StealsPercentage: number | null
    BlocksPercentage: number | null
    TurnOversPercentage: number | null
    UsageRatePercentage: number | null
    FantasyPointsFanDuel: number | null
    FantasyPointsDraftKings: number | null
    FantasyPointsYahoo: number | null
    PlusMinus: number | null
    DoubleDoubles: number | null
    TripleDoubles: number | null
    FantasyPointsFantasyDraft: number | null
    IsClosed: boolean
}

// {
//     "StatID": 1010357,
//     "TeamID": 12,
//     "SeasonType": 1,
//     "Season": 2023,
//     "Name": "Cleveland Cavaliers",
//     "Team": "CLE",
//     "Wins": 0,
//     "Losses": 1,
//     "Possessions": 96.62,
//     "GlobalTeamID": 20000012,
//     "GameID": 18183,
//     "OpponentID": 10,
//     "Opponent": "TOR",
//     "Day": "2022-10-19T00:00:00",
//     "DateTime": "2022-10-19T19:30:00",
//     "HomeOrAway": "AWAY",
//     "IsGameOver": true,
//     "GlobalGameID": 20018183,
//     "GlobalOpponentID": 20000010,
//     "Updated": "2022-10-22T04:00:11",
//     "Games": 1,
//     "FantasyPoints": 191.10,
//     "Minutes": 240,
//     "Seconds": 0,
//     "FieldGoalsMade": 38.00,
//     "FieldGoalsAttempted": 77.00,
//     "FieldGoalsPercentage": 49.4,
//     "EffectiveFieldGoalsPercentage": 55.8,
//     "TwoPointersMade": 28.00,
//     "TwoPointersAttempted": 49.00,
//     "TwoPointersPercentage": 57.1,
//     "ThreePointersMade": 10.00,
//     "ThreePointersAttempted": 28.00,
//     "ThreePointersPercentage": 35.7,
//     "FreeThrowsMade": 19.00,
//     "FreeThrowsAttempted": 23.00,
//     "FreeThrowsPercentage": 82.6,
//     "OffensiveRebounds": 6.00,
//     "DefensiveRebounds": 32.00,
//     "Rebounds": 38.00,
//     "OffensiveReboundsPercentage": null,
//     "DefensiveReboundsPercentage": null,
//     "TotalReboundsPercentage": null,
//     "Assists": 25.00,
//     "Steals": 5.00,
//     "BlockedShots": 5.00,
//     "Turnovers": 17.00,
//     "PersonalFouls": 21.00,
//     "Points": 105.00,
//     "TrueShootingAttempts": 87.12,
//     "TrueShootingPercentage": 60.3,
//     "PlayerEfficiencyRating": null,
//     "AssistsPercentage": null,
//     "StealsPercentage": null,
//     "BlocksPercentage": null,
//     "TurnOversPercentage": null,
//     "UsageRatePercentage": null,
//     "FantasyPointsFanDuel": 201.10,
//     "FantasyPointsDraftKings": 208.00,
//     "FantasyPointsYahoo": 201.10,
//     "PlusMinus": -15.00,
//     "DoubleDoubles": 1.00,
//     "TripleDoubles": 0.00,
//     "FantasyPointsFantasyDraft": 208.00,
//     "IsClosed": false,
//     "LineupConfirmed": null,
//     "LineupStatus": null
//   },
