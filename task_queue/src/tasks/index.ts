import { Job } from 'bullmq'
import { getTeams, getReferees, getGames, getBoxScore, getPlayers } from './seed_db_tasks'
import { loadBoxScore } from './tasks'

export default async (job: Job) => {
    switch (job.name) {
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
