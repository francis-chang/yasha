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

        // statsqueue.add('loadStatsByNumDays', 2)
        // statsqueue.add('updateStandings', null)
        // statsqueue.add('loadBoxScore', 18729)
        // await statsqueue.add('loadTopStatlines', { numberOfDaysAgo: 10, numberOfStatlines: 20 })
        //await statsqueue.add('loadTopAverages', null)
        // await statsqueue.add('updateBoxScoreMinute', null, { repeat: { every: 60000 } })
        // await statsqueue.add('updateBoxScoreThreeSeconds', null, { repeat: { every: 3000 } })
    })()
} else {
    console.log('env var TQ_STATS_URL not found, please check bull service in docker-compose.yml')
}
