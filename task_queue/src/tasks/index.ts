import { Job } from 'bullmq'
import { loadTopAverages, loadTopStatlines } from './redis_stats_tasks'
import { updateBoxScoreMinute, updateBoxScoreThreeSeconds } from './scheduled_tasks'
import { getTeams, getReferees, getGames, getBoxScore, getPlayers } from './seed_db_tasks'
import {
    loadBoxScore,
    testTask,
    loadStatsByNumDays,
    updateAverages,
    updateAllAverages,
    updateLastFiveAverages,
    addPlayer,
} from './tasks'

export default async (job: Job) => {
    switch (job.name) {
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
