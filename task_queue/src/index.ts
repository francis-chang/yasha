import { Worker } from 'bullmq'
import IORedis from 'ioredis'
import jobProcessor from './tasks'
import statsqueue from './utils/bullmqProducer'

if (process.env.REDIS_BULLMQ_URL) {
    const connection = new IORedis(process.env.REDIS_BULLMQ_URL, {
        maxRetriesPerRequest: null,
    })

    const worker = new Worker('myqueue', jobProcessor, {
        connection,
    })

    worker.on('completed', (job) => {
        console.log(`${job.id} has completed!`)
    })

    worker.on('failed', (job, err) => {
        if (job) {
            console.log(`${job.id} has failed with ${err.message}`)
        } else {
            console.log('no job')
        }
    })
    ;(async () => {
        const jobs = await statsqueue.getRepeatableJobs()
        jobs.forEach(async (job) => {
            await statsqueue.removeRepeatableByKey(job.key)
        })
        // await statsqueue.add('loadDraftListForMock', null, { repeat: { every: 600000 } })
        // await statsqueue.add('updateInjuries', null, { repeat: { every: 600000 } })
        // await statsqueue.add('loadSingleDayStatlines', null, { repeat: { every: 10000 } })
        // await statsqueue.add('updateStandings', null, { repeat: { every: 600000 } })
        // await statsqueue.add('updateBoxScoreMinute', null, { repeat: { every: 100000 } })
        // await statsqueue.add('updateBoxScoreThreeSeconds', null, { repeat: { every: 5000 } })
        // await statsqueue.add('loadFourDayScores', null, { repeat: { every: 5000 } })
        // await statsqueue.add('loadTStatlines', null, { repeat: { every: 5000 } })
        // await statsqueue.add('loadGameInfo', null, { repeat: { every: 10000 } })
        // await statsqueue.add('loadTopAverages', null, { repeat: { pattern: '*/15 * * * *' } })
        // await statsqueue.add('loadTopStatlines', null, { repeat: { pattern: '*/30 * * * *' } })
        // await statsqueue.add('loadDraftList', null, { repeat: { pattern: '0 0 * * *' } })
    })()
} else {
    console.log('env var TQ_STATS_URL not found, please check bull service in docker-compose.yml')
}
