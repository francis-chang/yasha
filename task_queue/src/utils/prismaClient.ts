import { PrismaClient } from '@prisma/client'
import logger from './logger'

const prismaClient = new PrismaClient()

async function wrapPrismaQuery<T>(fn: () => Promise<T>): Promise<T | undefined> {
    try {
        const result = await fn()
        return result
    } catch (error) {
        logger.error(error)
    }
    return undefined
}

export { wrapPrismaQuery, prismaClient }
