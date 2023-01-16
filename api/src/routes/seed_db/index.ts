import statsqueue from '../../utils/tasks/producer'

import express from 'express'
import logger from '../../utils/logger'
import redisClient from '../../utils/redisClient'

const seedDatabaseRouter = express.Router()

seedDatabaseRouter.post('/settask/:name', (req, res) => {
    const { name } = req.params
    if (!name) {
        res.status(400).json({ msg: 'no name provided for task' })
    } else {
        const { key, data } = req.body
        if (process.env.SETTASK_PASSWORD && key === process.env.SETTASK_PASSWORD) {
            statsqueue.add(name, data)
            res.status(201).json({ msg: `TASK ${name} HAS BEEN SENT` })
        } else {
            res.status(401).json({ msg: 'UNAUTHORIZED' })
        }
    }
})

seedDatabaseRouter.post('/getfromredis/:name', async (req, res) => {
    const { name } = req.params
    if (!name) {
        res.status(400).json({ msg: 'no key to get redis from' })
    } else {
        const { key } = req.body
        if (process.env.SETTASK_PASSWORD && key === process.env.SETTASK_PASSWORD) {
            const response = await redisClient.get(name)
            if (!response) {
                res.status(404).json({ msg: `REDIS DOES NOT HAVE ${name}` })
            } else {
                res.status(201).json(JSON.parse(response))
            }
        } else {
            res.status(401).json({ msg: 'UNAUTHORIZED' })
        }
    }
})

export default seedDatabaseRouter
