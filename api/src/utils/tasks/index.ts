import statsqueue from './producer'

const addToQueue = (name: string, data: any) => {
    try {
        statsqueue.add(name, data)
    } catch (err) {
        console.log(err)
    }
}

// loadTopStatlines(job.data.numberOfDaysAgo, job.data.numberOfStatlines)

const loadTopStatlines = async (numberOfDaysAgo: number, numberOfStatlines: number) => {
    addToQueue('loadTopStatlines', { numberOfDaysAgo, numberOfStatlines })
}

const seedGetTeams = async () => {
    addToQueue('seedGetTeams', null)
}

const seedGetReferees = async () => {
    addToQueue('seedGetReferees', null)
}

const seedGetGames = async () => {
    addToQueue('seedGetGames', null)
}

const seedGetBoxScore = async () => {
    addToQueue('seedGetBoxScore', null)
}
const seedGetPlayers = async () => {
    addToQueue('seedGetPlayers', null)
}

export { seedGetTeams, seedGetReferees, seedGetGames, seedGetBoxScore, seedGetPlayers, loadTopStatlines }
