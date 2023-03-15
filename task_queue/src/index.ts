import { Worker } from 'bullmq'
import IORedis from 'ioredis'
import jobProcessor from './tasks'
import statsqueue from './utils/bullmqProducer'

const addRepeatedJob = async (job_name: string, is_every: boolean, pattern: string | null, duration: number | null) => {
    if (is_every && duration) {
        await statsqueue.add(job_name, null, {
            repeat: { every: duration },
            removeOnComplete: {
                age: 60,
            },
        })
    } else if (!is_every && pattern) {
        await statsqueue.add(job_name, null, { repeat: { pattern }, removeOnComplete: { age: 60 } })
    }
}

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
        await addRepeatedJob('loadDraftListForMock', true, null, 600000)

        await addRepeatedJob('updateInjuries', true, null, 600000)
        await addRepeatedJob('loadSingleDayStatlines', true, null, 10000)
        await addRepeatedJob('updateStandings', true, null, 600000)
        await addRepeatedJob('updateBoxScoreMinute', true, null, 100000)
        await addRepeatedJob('updateBoxScoreThreeSeconds', true, null, 5000)
        await addRepeatedJob('loadFourDayScores', true, null, 5000)
        await addRepeatedJob('loadTStatlines', true, null, 5000)
        await addRepeatedJob('loadGameInfo', true, null, 10000)
        await addRepeatedJob('loadDraftList', true, null, 10000)

        await addRepeatedJob('loadTopAverages', false, '*/15 * * * *', null)
        await addRepeatedJob('loadTopStatlines', false, '*/30 * * * *', null)
        await addRepeatedJob('loadComputerPickDraftList', false, '0 0 * * *', null)
    })()
} else {
    console.log('env var TQ_STATS_URL not found, please check bull service in docker-compose.yml')
}
