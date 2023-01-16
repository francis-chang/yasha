import express, { json } from 'express'
import pino from 'pino-http'
import defaultRouter from './routes'
import cors from 'cors'

const app = express()
const PORT = process.env.API_PORT ? process.env.API_PORT : 3000

app.use(
    pino({
        transport: {
            target: 'pino-pretty',
        },
    })
)

const corsOptions = {
    origin: [
        'http://localhost:3333',
        'http://localhost:5173',
        'http://47.148.96.183',
        'https://fty.gg',
        'https://app.fty.gg',
        'http://164.92.105.119',
        'http://159.203.186.40',
    ],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
}

app.use(cors(corsOptions))
app.use(json())
app.use(defaultRouter)

app.listen(PORT, async () => {
    console.log(`Express server is listening at ${PORT}`)
})
