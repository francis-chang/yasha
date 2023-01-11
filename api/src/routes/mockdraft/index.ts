import statsqueue from '../../tasks/producer'

import express, { json } from 'express'
import logger from '../../utils/logger'
import redisClient from '../../utils/redisClient'

const mockDraftRouter = express.Router()

// [
//     { name: 'AdamAI', team: [] },
//     { name: 'BenjaminAI', team: [] },
//     { name: 'CharlieAI', team: [] },
//     { name: 'DavidAI', team: [] },
//     { name: 'EdwardAI', team: [] },
//     { name: 'YOU', team: [] },
//     { name: 'GeorgeAI', team: [] },
//     { name: 'HarryAI', team: [] },
//     { name: 'IsabellaAI', team: [] },
//     { name: 'JuliaAI', team: [] },
//     { name: 'KendallAI', team: [] },
//     { name: 'MariAI', team: [] },
// ]

const botPick = (draftList: any, filterList: any[]) => {
    const newDraftList = draftList.filter((player: any) => {
        if (!filterList.includes(player.PlayerID)) {
            return player
        }
    })

    if (filterList.length <= 3) {
        return newDraftList[0]
    } else if (filterList.length <= 10) {
        const random = Math.round(Math.random() * 3 + 1)
        return newDraftList[random]
    } else if (filterList.length <= 30) {
        const random = Math.round(Math.random() * 5 + 1)
        return newDraftList[random]
    } else if (filterList.length <= 80) {
        const random = Math.round(Math.random() * 8 + 1)
        return newDraftList[random]
    } else {
        const random = Math.round(Math.random() * 10 + 1)
        return newDraftList[random]
    }
}

function partiallyShuffle(array: any[]) {
    // Keep the first 5 elements in place
    for (let i = 5; i < array.length; i++) {
        // The further down the array, the more variance in the shuffle
        let j = Math.floor(Math.random() * (i + 1 - 5) + 5)
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

mockDraftRouter.post('/draft', async (req, res) => {
    const draftListString = await redisClient.get('MOCK_DRAFT_LIST')
    if (draftListString) {
        const draftList = JSON.parse(draftListString)
        const filteredDraftList = draftList.map((player: any) => ({
            PlayerID: player.PlayerID,
            name: player.player.s_name,
            score: player.FantasyPoints,
        }))
        res.json(partiallyShuffle(filteredDraftList))
    }
    res.json({ msg: 'nothing' })
})

export default mockDraftRouter
