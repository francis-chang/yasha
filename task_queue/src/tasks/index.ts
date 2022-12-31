import { Job } from 'bullmq'
import { getTeams, getReferees, getGames, getBoxScore, getPlayers } from './seed_db_tasks'
import { loadBoxScore, testTask } from './tasks'

export default async (job: Job) => {
    switch (job.name) {
        case 'testTask':
            testTask()
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
