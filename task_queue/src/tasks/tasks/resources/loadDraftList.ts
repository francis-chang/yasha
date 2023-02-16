import logger from '../../../utils/logger'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import redisClient from '../../../utils/redisClient'

const getPlayersOrderByFan = async () => {
    return await prismaClient.$queryRaw`
        SELECT 
            p."s_name", 
            p."PlayerID", 
            (lfga."FantasyPoints" + sa."FantasyPoints") AS "TotalFantasyPoints"
        FROM 
            "Player" p
            INNER JOIN "SeasonAverages" sa ON sa."PlayerID" = p."PlayerID"
            INNER JOIN "LastFiveGameAverages" lfga ON lfga."PlayerID" = p."PlayerID"
        WHERE 
            EXISTS (
                SELECT 
                    1
                FROM 
                    "Statline" s 
                    INNER JOIN "Game" g ON g."GameID" = s."GameID" 
                WHERE 
                    s."PlayerID" = p."PlayerID" AND
                    g."DateTime" >= '2023-02-10' and
                    s."Minutes" > 0
            )
        ORDER BY 
            (lfga."FantasyPoints" + sa."FantasyPoints") DESC;
    `
}
// this will be for actual draft list
// remember to account for games played within the past 10
// maybe add last 15 game average as well

export default async () => {
    const response = await wrapPrismaQuery(getPlayersOrderByFan)
    if (response) {
        try {
            await redisClient.set('COMPUTER_DRAFT_LIST', JSON.stringify(response))
            logger.info('COMPUTER_DRAFT_LIST HAS BEEN SET')
        } catch (err) {
            logger.info(err)
        }
    }
}
