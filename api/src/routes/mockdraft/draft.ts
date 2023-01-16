import express, { Request, Response, NextFunction } from 'express'
import logger from '../../utils/logger'
import redisClient from '../../utils/redisClient'
import { TeamPlayer, TeamPlayerSchema, Team, TeamSchema, MockDraftPlayer } from './typesAndValidator'
import { z } from 'zod'

const botPick = (draftList: MockDraftPlayer[], filterList: number[]) => {
    const newDraftList = draftList.filter((player) => !filterList.includes(player.PlayerID))

    if (filterList.length > newDraftList[0].n + 4) {
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

const draft = async (req: Request, res: Response, next: NextFunction) => {
    let draftList
    try {
        draftList = await redisClient.get('MOCK_DRAFT_LIST_FOR_PICK')
    } catch (err) {
        logger.error(err)
        res.status(500).json({
            msg: 'Something went wrong. Refresh the page to restart draft.',
            desc: 'Redis could not be reached to retreive mockdraftlistforpick',
        })
        return
    }
    if (!draftList) {
        logger.error('Redis does not have value for MOCK_DRAFT_LIST_FOR_PICK')
        res.status(500).json({
            msg: 'Something went wrong. Refresh the page to restart draft.',
            desc: 'Redis does not have value for MOCK_DRAFT_LIST_FOR_PICK',
        })
    } else {
        // validate request body
        let {
            teams,
            round,
            picked,
            currentPick,
            draftFinished,
        }: { teams: Team; round: number; picked: number; currentPick: number; draftFinished: boolean } = req.body
        try {
            TeamSchema.parse(teams)
            const numValidator = z.number()
            numValidator.parse(round)
            // numValidator.parse(picked)
        } catch (err) {
            logger.error(err)
            res.status(400).json({
                msg: 'Something went wrong. Refresh the page to restart draft.',
                desc: 'the request body was not valid',
            })
            return
        }

        // first check if the round is either the first or last round

        if (round === 13 || draftFinished) {
            res.json({ draftFinished: true })
            return
        }

        const dList: MockDraftPlayer[] = JSON.parse(draftList)

        if (round === 0) {
            const picked: number[] = []
            let i = 0
            while (teams[i].name !== 'YOU') {
                const { PlayerID, n, name } = botPick(dList, picked)
                teams[i].team.push({
                    PlayerID,
                    n,
                    name,
                    pickedAt: currentPick,
                    pickedString: `Round 1 Pick ${((currentPick - 1) % 12) + 1}`,
                })
                picked.push(PlayerID)
                currentPick++
                i++
            }

            res.json({
                teams,
                round: round + 1,
                currentPick,
            })
            return
        }

        // iterate through each team and flatten all picked playerIDs into a list
        let allPickedPlayerIDs: number[] = []
        teams.forEach(({ team }) => {
            allPickedPlayerIDs = [...allPickedPlayerIDs, ...team.map(({ PlayerID }) => PlayerID)]
        })

        // check to see if picked PlayerID has already been drafted
        // this should never be reached in the front end client, but just in case
        // instead of throwing an error, just return the current state replacing pick with null
        if (!picked || allPickedPlayerIDs.includes(picked)) {
            res.json({ picked: null })
            return
        }

        // get the index where you is located
        let i = 0
        while (teams[i].name !== 'YOU') {
            i++
        }
        const pickedPlayer = dList.find(({ PlayerID }) => PlayerID === picked)

        // this condition is reached if request body has a PlayerID
        // but it is not associated with any player in draftList
        // do not throw an error, just return state with pick :null
        if (!pickedPlayer) {
            res.json({ picked: null })
            return
        } else {
            const { PlayerID, n, name } = pickedPlayer
            teams[i].team.push({
                PlayerID,
                n,
                name,
                pickedAt: currentPick,
                pickedString: `Round ${Math.ceil(currentPick / 12)} Pick ${((currentPick - 1) % 12) + 1}`,
            })
            currentPick++
            allPickedPlayerIDs.push(PlayerID)
        }

        if (round === 12) {
            for (let b = i - 1; b >= 0; b--) {
                const pick = botPick(dList, allPickedPlayerIDs)
                const { PlayerID, n, name } = pick
                teams[b].team.push({
                    PlayerID,
                    n,
                    name,
                    pickedAt: currentPick,
                    pickedString: `Round ${Math.ceil(currentPick / 12)} Pick ${((currentPick - 1) % 12) + 1}`,
                })
                currentPick++
                allPickedPlayerIDs.push(PlayerID)
            }
        } else if (round % 2 == 0) {
            for (let b = i - 1; b >= 0; b--) {
                const pick = botPick(dList, allPickedPlayerIDs)
                const { PlayerID, n, name } = pick
                teams[b].team.push({
                    PlayerID,
                    n,
                    name,
                    pickedAt: currentPick,
                    pickedString: `Round ${Math.ceil(currentPick / 12)} Pick ${((currentPick - 1) % 12) + 1}`,
                })
                currentPick++
                allPickedPlayerIDs.push(PlayerID)
            }
            for (let x = 0; x < i; x++) {
                const pick = botPick(dList, allPickedPlayerIDs)
                const { PlayerID, n, name } = pick
                teams[x].team.push({
                    PlayerID,
                    n,
                    name,
                    pickedAt: currentPick,
                    pickedString: `Round ${Math.ceil(currentPick / 12)} Pick ${((currentPick - 1) % 12) + 1}`,
                })
                currentPick++
                allPickedPlayerIDs.push(PlayerID)
            }
        } else {
            for (let x = i + 1; x < teams.length; x++) {
                const pick = botPick(dList, allPickedPlayerIDs)
                const { PlayerID, n, name } = pick
                teams[x].team.push({
                    PlayerID,
                    n,
                    name,
                    pickedAt: currentPick,
                    pickedString: `Round ${Math.ceil(currentPick / 12)} Pick ${((currentPick - 1) % 12) + 1}`,
                })
                currentPick++
                allPickedPlayerIDs.push(PlayerID)
            }
            for (let b = teams.length - 1; b > i; b--) {
                const pick = botPick(dList, allPickedPlayerIDs)
                const { PlayerID, n, name } = pick
                teams[b].team.push({
                    PlayerID,
                    n,
                    name,
                    pickedAt: currentPick,
                    pickedString: `Round ${Math.ceil(currentPick / 12)} Pick ${((currentPick - 1) % 12) + 1}`,
                })
                currentPick++
                allPickedPlayerIDs.push(PlayerID)
            }
        }

        res.json({
            teams,
            round: round + 1,
            currentPick,
            draftFinished: round + 1 === 13,
        })
        return
    }
}

export default draft
