export default interface GameOfScheduleResponse {
    GameID: number
    Season: number
    SeasonType: number
    Status: string
    Day: string
    DateTime: string
    AwayTeam: string
    HomeTeam: string
    AwayTeamID: number
    HomeTeamID: number
    StadiumID: number
    Channel: string
    Attendance: number
    AwayTeamScore: number | null
    HomeTeamScore: number | null
    Updated: string
    Quarter: null | number
    TimeRemainingMinutes: null
    TimeRemainingSeconds: null
    PointSpread: number | null
    OverUnder: number | null
    AwayTeamMoneyLine: number | null
    HomeTeamMoneyLine: number | null
    GlobalGameID: number
    GlobalAwayTeamID: number
    GlobalHomeTeamID: number
    PointSpreadAwayTeamMoneyLine: number | null
    PointSpreadHomeTeamMoneyLine: number | null
    LastPlay: null | string
    IsClosed: boolean
    GameEndDateTime: string
    HomeRotationNumber: number
    AwayRotationNumber: number
    NeutralVenue: false | null
    OverPayout: number | null
    UnderPayout: number | null
    CrewChiefID: number | null
    UmpireID: number | null
    RefereeID: number | null
    AlternateID: null
    DateTimeUTC: string
    SeriesInfo: null
    Quarters: any[]
}

// "GameID": 19287,
// "Season": 2023,
// "SeasonType": 1,
// "Status": "Scheduled",
// "Day": "2023-03-26T00:00:00",
// "DateTime": "2023-03-26T18:00:00",
// "AwayTeam": "BKN",
// "HomeTeam": "ORL",
// "AwayTeamID": 8,
// "HomeTeamID": 5,
// "StadiumID": 5,
// "Channel": "BSF",
// "Attendance": null,
// "AwayTeamScore": null,
// "HomeTeamScore": null,
// "Updated": "2022-11-02T04:12:53",
// "Quarter": null,
// "TimeRemainingMinutes": null,
// "TimeRemainingSeconds": null,
// "PointSpread": null,
// "OverUnder": null,
// "AwayTeamMoneyLine": null,
// "HomeTeamMoneyLine": null,
// "GlobalGameID": 20019287,
// "GlobalAwayTeamID": 20000008,
// "GlobalHomeTeamID": 20000005,
// "PointSpreadAwayTeamMoneyLine": null,
// "PointSpreadHomeTeamMoneyLine": null,
// "LastPlay": null,
// "IsClosed": false,
// "GameEndDateTime": null,
// "HomeRotationNumber": null,
// "AwayRotationNumber": null,
// "NeutralVenue": false,
// "OverPayout": null,
// "UnderPayout": null,
// "CrewChiefID": null,
// "UmpireID": null,
// "RefereeID": null,
// "AlternateID": null,
// "DateTimeUTC": "2023-03-26T22:00:00",
// "SeriesInfo": null,
// "Quarters": [

// ]

// [
//     {
//       "GameID": 18176,
//       "Season": 2023,
//       "SeasonType": 1,
//       "Status": "Final",
//       "Day": "2022-10-18T00:00:00",
//       "DateTime": "2022-10-18T19:30:00",
//       "AwayTeam": "PHI",
//       "HomeTeam": "BOS",
//       "AwayTeamID": 7,
//       "HomeTeamID": 9,
//       "StadiumID": 9,
//       "Channel": "TNT",
//       "Attendance": 19156,
//       "AwayTeamScore": 117,
//       "HomeTeamScore": 126,
//       "Updated": "2022-11-16T04:14:32",
//       "Quarter": null,
//       "TimeRemainingMinutes": null,
//       "TimeRemainingSeconds": null,
//       "PointSpread": -3.0,
//       "OverUnder": 216.0,
//       "AwayTeamMoneyLine": 124,
//       "HomeTeamMoneyLine": -149,
//       "GlobalGameID": 20018176,
//       "GlobalAwayTeamID": 20000007,
//       "GlobalHomeTeamID": 20000009,
//       "PointSpreadAwayTeamMoneyLine": -110,
//       "PointSpreadHomeTeamMoneyLine": -111,
//       "LastPlay": null,
//       "IsClosed": true,
//       "GameEndDateTime": "2022-10-18T22:07:41",
//       "HomeRotationNumber": 502,
//       "AwayRotationNumber": 501,
//       "NeutralVenue": false,
//       "OverPayout": -112,
//       "UnderPayout": -109,
//       "CrewChiefID": 20000017,
//       "UmpireID": 20000050,
//       "RefereeID": 20000041,
//       "AlternateID": null,
//       "DateTimeUTC": "2022-10-18T23:30:00",
//       "SeriesInfo": null,
//       "Quarters": [

//       ]
//     },

export default interface TeamStat {
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
