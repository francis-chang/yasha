import { RedisConnection } from 'bullmq'
import IORedis from 'ioredis'
import logger from './logger'

const redisUrl = process.env.REDIS_DATA_URL ? process.env.REDIS_DATA_URL : ''

if (redisUrl === '') {
    logger.error('UNABLE TO CONNECT TO REDIS - CHECK ENV VAR REDIS_DATA_URL')
}

const redisClient = new IORedis(redisUrl, {
    maxRetriesPerRequest: 10,
    retryStrategy: (times) => Math.min(times * 50, 2000),
})

export default redisClient
