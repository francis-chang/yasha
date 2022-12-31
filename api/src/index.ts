import express from 'express'
import pino from 'pino-http'
import { seedGetTeams, seedGetReferees, seedGetGames } from './tasks'

const app = express()
const PORT = process.env.API_PORT ? process.env.API_PORT : 3000

app.use(pino())

app.get('/testseed', async (req, res) => {
    res.json({ msg: 'task sentssssss' })
})

app.listen(PORT, async () => {
    console.log(`Express server is listening at ${PORT}`)
    seedGetGames()
})
