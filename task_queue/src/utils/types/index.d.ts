import TeamsResponse from './resources/TeamsResponse'
import StadiumsResponse from './resources/StadiumsResponse'
import RefereeResponse from './resources/RefereesResponse'

import GameOfScheduleResponse from './resources/GameOfScheduleResponse'
import TeamStatlineResponse from './resources/TeamStatlineResponse'
import StatlineResponse from './resources/StatlineResponse'
import PlayerResponse from './resources/PlayerResponse'

interface BoxScoreResponse {
    Game: GameOfScheduleResponse
    TeamGames: TeamStatlineResponse[]
    PlayerGames: StatlineResponse[]
}

export {
    TeamsResponse,
    StadiumsResponse,
    GameOfScheduleResponse,
    RefereeResponse,
    BoxScoreResponse,
    TeamStatlineResponse,
    StatlineResponse,
    PlayerResponse,
}
