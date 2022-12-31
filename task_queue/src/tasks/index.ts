import { Job } from 'bullmq'
import { getTeams, getReferees, getGames } from './seed_db_tasks'

export default async (job: Job) => {
    switch (job.name) {
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
