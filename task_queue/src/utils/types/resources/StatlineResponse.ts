export default interface StatlineResponse {
    StatID: number
    TeamID: number
    PlayerID: number
    SeasonType: number
    Season: number
    Name: string
    Team: string
    Position: string
    Started: number
    FanDuelSalary: number
    DraftKingsSalary: number
    FantasyDataSalary: number
    YahooSalary: number
    InjuryStatus: string | null
    InjuryBodyPart: string | null
    InjuryStartDate: string | null
    InjuryNotes: string | null
    FanDuelPosition: string
    DraftKingsPosition: string
    YahooPosition: string
    OpponentRank: number
    OpponentPositionRank: number
    GlobalTeamID: number
    FantasyDraftSalary: null | string
    FantasyDraftPosition: null | string
    GameID: number
    OpponentID: number
    Opponent: string
    Day: string
    DateTime: string
    HomeOrAway: string
    IsGameOver: boolean
    GlobalGameID: number
    GlobalOpponentID: number
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
    LineupConfirmed: boolean
    LineupStatus: string
}
