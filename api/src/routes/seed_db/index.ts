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
})
seedDatabaseRouter.get('/getrefs', (req, res) => {
    statsqueue.add('seedGetReferees', null)
})
seedDatabaseRouter.get('/getGames', (req, res) => {
    statsqueue.add('seedGetGames', null)
})
seedDatabaseRouter.get('/getplayers', (req, res) => {
    statsqueue.add('seedGetPlayers', null)
})
seedDatabaseRouter.get('/getboxscore', (req, res) => {
    statsqueue.add('seedGetBoxScore', null)
})

export default seedDatabaseRouter
