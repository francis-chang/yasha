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
        jobs.forEach((job) => {
            statsqueue.removeRepeatableByKey(job.key)
        })
    })()

    statsqueue.add('loadTopStatlines', { numberOfDaysAgo: 10, numberOfStatlines: 20 })
} else {
    console.log('env var TQ_STATS_URL not found, please check bull service in docker-compose.yml')
}
