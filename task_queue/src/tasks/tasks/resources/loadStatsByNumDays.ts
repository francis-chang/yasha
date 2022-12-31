import { getGameIDsPastDays } from '../../../utils/api'
import statsqueue from '../../../utils/bullmqProducer'
import logger from '../../../utils/logger'

export default async (numDays: number) => {
    const response = await getGameIDsPastDays(numDays)

    if (response) {
        await statsqueue.add('loadBoxScore', response)
    }
}
