import { Prisma, PrismaClient } from '@prisma/client'
import { Response } from 'express'

import logger from './logger'

const prismaClient = new PrismaClient()

async function wrapPrismaQuery<T>(fn: () => Promise<T>, response: Response): Promise<T | undefined> {
    try {
        const result = await fn()
        return result
    } catch (error) {
        logger.error('PRISMA WRAP WORKS')
        if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            logger.error('PRISMA WRAP WORKS- UNKNOWN')
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            logger.error('PRISMA WRAP WORKS - KNOWN')
        }
        logger.error(error)
        response.status(400).send()
    }
    return undefined
}

// async function wrapPrismaQuery<T>(fn: () => Promise<T>, response: Response): Promise<T | undefined> {
//     try {
//         const result = await fn()
//         return result
//     } catch (error) {
//         console.error(error)
//         // elaborate error logging
//         response.status(400).send()
//     }
//     return undefined
// }

export { wrapPrismaQuery, prismaClient }
