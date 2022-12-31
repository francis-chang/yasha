import axios from 'axios'
import axiosRetry from 'axios-retry'
import format from 'date-fns/format'
import {
    TeamsResponse,
    StadiumsResponse,
    GameOfScheduleResponse,
    RefereeResponse,
    BoxScoreResponse,
    PlayerResponse,
} from './types'
import logger from './logger'

const scoresBase = axios.create({
    baseURL: 'https://api.sportsdata.io/v3/nba/',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.SPORTDATA_REAL_KEY,
    },
})

axiosRetry(scoresBase, {
    retries: 10,
    retryDelay: (retryCount) => {
        return retryCount * 1000
    },
})

const projectionsBase = axios.create({
    baseURL: 'https://api.sportsdata.io/v3/nba/',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.SPORTSDATA_PROJECTIONS_KEY,
    },
})

const apiCall = async <T>(url: string): Promise<T | null> => {
    try {
        const response = await scoresBase.get<T, any>(url)
        return response.data
    } catch (err: any) {
        logger.error(`error fetching ${url}`)
        if (err.response) {
            logger.error(err.response.data)
            logger.error(err.response.status)
            logger.error(err.response.headers)
        } else if (err.request) {
            // The request was made but no response was received
            // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            logger.error(err.request)
        } else {
            // Something happened in setting up the request that triggered an err
            logger.error(err.message)
        }
        return null
    }
}

const getAllNBATeams = async () => {
    const response = await apiCall<TeamsResponse[]>('/scores/json/AllTeams')
    return response
}

const getStadiums = async () => {
    const response = await apiCall<StadiumsResponse[]>('scores/json/Stadiums')
    return response
}

const getSchedule = async () => {
    const response = await apiCall<GameOfScheduleResponse[]>('scores/json/Games/2023')
    return response
}

const getReferees = async () => {
    const response = await apiCall<RefereeResponse[]>('scores/json/Referees')
    return response
}

const getPlayers = async () => {
    const response = await apiCall<PlayerResponse[]>('scores/json/Players')
    return response
}

const getBoxScore = async (GameID: number | string) => {
    const response = await apiCall<BoxScoreResponse>(`stats/json/BoxScore/${GameID}`)
    return response
}

export { getAllNBATeams, getStadiums, getSchedule, getReferees, getBoxScore, getPlayers }
