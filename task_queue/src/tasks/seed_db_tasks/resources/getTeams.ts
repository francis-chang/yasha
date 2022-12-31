import { getAllNBATeams, getStadiums } from '../../../utils/api'
import { prismaClient, wrapPrismaQuery } from '../../../utils/prismaClient'
import { Team } from '@prisma/client'
import { TeamsResponse } from '../../../utils/types'
import teamColors from '../../../utils/teamColors'
import logger from '../../../utils/logger'

const insertTeam = async (data: Team[]) => {
    return await prismaClient.team.createMany({ data })
}

const teamMapFunction = (team: TeamsResponse, stadium: string, inner_color: string, outer_color: string) => {
    return {
        TeamID: team.TeamID,
        Key: team.Key,
        City: team.City,
        Name: team.Name,
        stadium: stadium,
        Conference: team.Conference,
        Division: team.Division,
        inner_color: inner_color,
        outer_color: outer_color,
        WikipediaLogoUrl: team.WikipediaLogoUrl,
        Wins: 0,
        Losses: 0,
    } as Team
}

export default async () => {
    const [teams, stadiums] = await Promise.all([getAllNBATeams(), getStadiums()])
    if (teams && stadiums) {
        const t = [] as Team[]
        teams.forEach((team) => {
            let inner_color = ''
            let outer_color = ''
            teamColors.forEach((nba_color_team) => {
                if (nba_color_team.team_name === team.City + ' ' + team.Name) {
                    inner_color = nba_color_team.inner_color
                    outer_color = nba_color_team.outer_color
                }
            })
            const stadiumObj = stadiums.filter((st) => team.StadiumID === st.StadiumID)[0]
            if (stadiumObj) {
                t.push(teamMapFunction(team, stadiumObj.Name, inner_color, outer_color))
            }
        })
        await wrapPrismaQuery(() => insertTeam(t))
        logger.info('Teams have been uploaded to db')
    }
}
