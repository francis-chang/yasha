import { getReferees } from '../../../utils/api'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import { Referee } from '@prisma/client'
import { RefereeResponse } from '../../../utils/types'
import logger from '../../../utils/logger'

const insertReferees = async (data: Referee[]) => {
    return await prismaClient.referee.createMany({
        data,
    })
}

const refMapFunction = (ref: RefereeResponse) => {
    return {
        RefereeID: ref.RefereeID,
        Name: ref.Name,
        Number: ref.Number,
    } as Referee
}

export default async () => {
    const referees = await getReferees()
    if (referees) {
        await wrapPrismaQuery(() => insertReferees(referees.map(refMapFunction)))
        logger.info('Referees have been uploaded to db')
    }
}
