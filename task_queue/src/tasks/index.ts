import { Job } from 'bullmq'
import { loadGameInfo, loadSingleDayStatlines, loadTopAverages, loadTopStatlines } from './redis_stats_tasks'
import {
    loadDraftList,
    loadFourDayScores,
    loadTStatlines,
    updateBoxScoreMinute,
    updateBoxScoreThreeSeconds,
    updateInjuries,
    updateStandings,
} from './scheduled_tasks'
import { getTeams, getReferees, getGames, getBoxScore, getPlayers, updateDates, updateSmallName } from './seed_db_tasks'
import {
    loadBoxScore,
    testTask,
    loadStatsByNumDays,
    updateAverages,
    updateAllAverages,
    updateLastFiveAverages,
    addPlayer,
    loadDraftListForMock,
    loadComputerPickDraftList,
} from './tasks'

const productionSwitch = async (job: Job) => {
    switch (job.name) {
        // every 10 minutes
        case 'updateInjuries':
            updateInjuries()
            break
        // every 10 seconds
        case 'loadSingleDayStatlines':
            loadSingleDayStatlines()
            break
        // every 10 minutes
        case 'updateStandings':
            updateStandings()
            break
        // every minute
        case 'loadGameInfo':
            loadGameInfo()
            break
        // every 5 seconds
        case 'updateBoxScoreThreeSeconds':
            updateBoxScoreThreeSeconds()
            break
        // every minute
        // if status = final -> final loadboxscore
        case 'updateBoxScoreMinute':
            updateBoxScoreMinute()
            break
        case 'updateAverages':
            updateAverages(job.data)
            break
        case 'loadBoxScore':
            await loadBoxScore(job.data)
            break
    }
}

export default async (job: Job) => {
    switch (job.name) {
        case 'loadDraftList':
            loadDraftList()
            break
        case 'loadComputerPickDraftList':
            loadComputerPickDraftList()
            break
        case 'loadTStatlines':
            loadTStatlines()
            break
        case 'loadFourDayScores':
            loadFourDayScores()
            break
        case 'loadDraftListForMock':
            loadDraftListForMock()
            break
        case 'updateSmallName':
            updateSmallName()
            break
        case 'updateDates':
            updateDates()
            break
        case 'updateInjuries':
            updateInjuries()
            break
        case 'loadSingleDayStatlines':
            loadSingleDayStatlines()
            break
        case 'updateStandings':
            updateStandings()
            break
        case 'loadGameInfo':
            loadGameInfo()
            break
        case 'addPlayer':
            addPlayer(job.data)
            break
        case 'updateBoxScoreThreeSeconds':
            updateBoxScoreThreeSeconds()
            break
        case 'updateBoxScoreMinute':
            updateBoxScoreMinute()
            break
        case 'loadTopAverages':
            loadTopAverages()
            break
        case 'loadTopStatlines':
            loadTopStatlines(job.data.numberOfDaysAgo, job.data.numberOfStatlines)
            break
        case 'updateLastFiveAverages':
            updateLastFiveAverages(job.data)
            break
        case 'updateAllAverages':
            updateAllAverages()
            break
        case 'updateAverages':
            updateAverages(job.data)
            break
        case 'testTask':
            testTask()
            break
        case 'loadStatsByNumDays':
            loadStatsByNumDays(job.data)
            break
        case 'loadBoxScore':
            await loadBoxScore(job.data)
            break
        case 'seedGetPlayers':
            await getPlayers()
            break
        case 'seedGetBoxScore':
            await getBoxScore()
            break
        case 'seedGetTeams':
            await getTeams()
            break
        case 'seedGetReferees':
            await getReferees()
            break
        case 'seedGetGames':
            await getGames()
            break
        default:
            break
    }
}
