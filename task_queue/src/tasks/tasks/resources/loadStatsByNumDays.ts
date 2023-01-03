import { getGameIDsPastDays } from '../../../utils/api'
import statsqueue from '../../../utils/bullmqProducer'
import logger from '../../../utils/logger'

export default async (numDays: number) => {
    const response = await getGameIDsPastDays(numDays)

    if (response) {
        response.forEach((game, n) => {
            setTimeout(async () => {
                await statsqueue.add('loadBoxScore', game)
                const totalSeconds = response.length
                logger.info(`approx ${totalSeconds - n} s to go`)
            }, n * 1000)
        })
    }
}
