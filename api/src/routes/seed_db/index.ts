import statsqueue from '../../tasks/producer'

import express from 'express'
import logger from '../../utils/logger'

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

export default seedDatabaseRouter
