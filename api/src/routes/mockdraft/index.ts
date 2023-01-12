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

type DraftListPlayer = {
    PlayerID: number
    Points: number
    Rebounds: number
    Assists: number
    Steals: number
    BlockedShots: number
    Turnovers: number
    FantasyPoints: number
    player: {
        FirstName: string
        LastName: string
        s_name: string
        team: {
            City: string
            Name: string
            inner_color: string
            outer_color: string
            TeamID: number
        }
    }
}

type TeamElement = {
    name: string
    team: FilteredDraftedPlayer[]
}

type FilteredDraftedPlayer = {
    PlayerID: number
    name: string
    score: number
    n: number
}

const botPick = (draftList: FilteredDraftedPlayer[], filterList: number[]) => {
    const newDraftList = draftList.filter((player) => {
        if (!filterList.includes(player.PlayerID)) {
            return player
        }
    })

    if (filterList.length > newDraftList[0].n + 5) {
        return newDraftList[0]
    } else if (filterList.length <= 3) {
        return newDraftList[0]
    } else if (filterList.length <= 15) {
        const random = Math.round(Math.random() * 3)
        return newDraftList[random]
    } else if (filterList.length <= 35) {
        const random = Math.round(Math.random() * 5)
        return newDraftList[random]
    } else if (filterList.length <= 70) {
        const random = Math.round(Math.random() * 8)
        return newDraftList[random]
    } else {
        const random = Math.round(Math.random() * 10)
        return newDraftList[random]
    }
}

mockDraftRouter.post('/draft', async (req, res) => {
    const draftListString = await redisClient.get('MOCK_DRAFT_LIST')
    if (draftListString) {
        const draftList: DraftListPlayer[] = JSON.parse(draftListString)
        const filteredDraftList = draftList.map((player, n: number) => ({
            PlayerID: player.PlayerID,
            name: player.player.s_name,
            score: player.FantasyPoints,
            n,
        }))

        let pickedNumbers: number[] = []

        // if is the first round, the draft has started and draft picks for players until you pick
        const { teams, round, picked }: { teams: TeamElement[]; round: number; picked: DraftListPlayer } = req.body

        if (round === 13) {
            res.json({ msg: 'Draft has Finished' })
            return
        }

        if (round === 0) {
            let i = 0
            while (teams[i].name !== 'YOU') {
                const pick = botPick(filteredDraftList, pickedNumbers)
                teams[i].team.push(pick)
                pickedNumbers.push(pick.PlayerID)
                i++
            }

            res.json({
                teams,
                round: round + 1,
            })
            return
        }

        if (!picked) {
            res.status(400).json({ msg: 'A Player has not been picked.' })
            return
        }
        // else if not first pick add the chosen pick to you

        let i = 0
        while (teams[i].name !== 'YOU') {
            i++
        }
        // we will not validate this pick because its a mock draft
        // if players want to draft 10 luka doncic's because they somehow found a way to make that request in a mock draft
        // then so be it.
        const pPlayer = draftList.filter((d) => d.PlayerID === picked.PlayerID)[0]
        teams[i].team.push({
            PlayerID: pPlayer.PlayerID,
            name: pPlayer.player.s_name,
            score: pPlayer.FantasyPoints,
            n: -1,
        })

        teams.forEach(({ team }) => {
            const idsOnly = team.map(({ PlayerID }: any) => PlayerID)
            pickedNumbers = [...pickedNumbers, ...idsOnly]
        })

        // we have i which is where you is located
        // now find out if even or odd round
        // for simplicity sake, YOU will not be in i=0, or i = 11
        if (round === 12) {
            for (let n = i - 1; n >= 0; n--) {
                const pick = botPick(filteredDraftList, pickedNumbers)
                teams[n].team.push(pick)
                pickedNumbers.push(pick.PlayerID)
            }
        } else if (round % 2 == 0) {
            for (let n = i - 1; n >= 0; n--) {
                const pick = botPick(filteredDraftList, pickedNumbers)
                teams[n].team.push(pick)
                pickedNumbers.push(pick.PlayerID)
            }
            for (let x = 0; x < i; x++) {
                const pick = botPick(filteredDraftList, pickedNumbers)
                teams[x].team.push(pick)
                pickedNumbers.push(pick.PlayerID)
            }
        } else {
            for (let x = i + 1; x < teams.length; x++) {
                const pick = botPick(filteredDraftList, pickedNumbers)
                teams[x].team.push(pick)
                pickedNumbers.push(pick.PlayerID)
            }
            for (let n = teams.length - 1; n > i; n--) {
                const pick = botPick(filteredDraftList, pickedNumbers)
                teams[n].team.push(pick)
                pickedNumbers.push(pick.PlayerID)
            }
        }

        // for (let i = 0; i < 12; i++) {
        //     const pick = botPick(filteredDraftList, pickedNumbers)

        //     teams[i].team.push(pick)
        //     pickedNumbers.push(pick.PlayerID)
        // }

        res.json({
            teams,
            round: round + 1,
        })
        return
    }
    res.json({ msg: 'nothing' })
})

export default mockDraftRouter
