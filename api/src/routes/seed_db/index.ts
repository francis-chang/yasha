import statsqueue from '../../tasks/producer'

import express from 'express'

const seedDatabaseRouter = express.Router()

// case 'seedGetPlayers':
//     await getPlayers()
//     break
// case 'seedGetBoxScore':
//     await getBoxScore()
//     break
// case 'seedGetTeams':
//     await getTeams()
//     break
// case 'seedGetReferees':
//     await getReferees()
//     break
// case 'seedGetGames':
//     await getGames()
//     break

seedDatabaseRouter.get('/getteams', (req, res) => {
    statsqueue.add('seedGetTeams', null)
    res.status(200).json({ msg: 'TASK SENT' })
})
seedDatabaseRouter.get('/getrefs', (req, res) => {
    statsqueue.add('seedGetReferees', null)
    res.status(200).json({ msg: 'TASK SENT' })
})
seedDatabaseRouter.get('/getGames', (req, res) => {
    statsqueue.add('seedGetGames', null)
    res.status(200).json({ msg: 'TASK SENT' })
})
seedDatabaseRouter.get('/getplayers', (req, res) => {
    statsqueue.add('seedGetPlayers', null)
    res.status(200).json({ msg: 'TASK SENT' })
})
seedDatabaseRouter.get('/getboxscore', (req, res) => {
    statsqueue.add('seedGetBoxScore', null)
    res.status(200).json({ msg: 'TASK SENT' })
})

export default seedDatabaseRouter
