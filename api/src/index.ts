import express from 'express'
import pino from 'pino-http'
import defaultRouter from './routes'
import cors from 'cors'
import { seedGetTeams, seedGetReferees, seedGetGames, seedGetBoxScore, seedGetPlayers } from './tasks'

const app = express()
const PORT = process.env.API_PORT ? process.env.API_PORT : 3000

app.use(pino())
app.use(cors())
app.use(defaultRouter)

app.listen(PORT, async () => {
    console.log(`Express server is listening at ${PORT}`)
    // seedGetBoxScore()
})
