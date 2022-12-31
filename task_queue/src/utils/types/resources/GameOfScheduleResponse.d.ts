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
    Quarters: Quarter[]
}

interface Quarter {
    QuarterID: number
    GameID: number
    Number: number
    Name: string
    AwayScore: number
    HomeScore: number
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
