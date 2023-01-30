const { zonedTimeToUtc, utcToZonedTime, formatInTimeZone } = require('date-fns-tz')
const { addDays } = require('date-fns')

const d = formatInTimeZone(new Date(), 'America/New_York', 'yyyy-MMM-dd')
const today = 12 >= d ? new Date() : addDays(new Date(), -1)

console.log(d)
