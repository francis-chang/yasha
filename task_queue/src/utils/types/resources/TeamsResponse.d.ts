interface TeamsResponse {
    TeamID: number
    Key: string
    Active: boolean
    City: string
    Name: string
    LeagueID: number
    StadiumID: number
    Conference: string
    Division: string
    PrimaryColor: string
    SecondaryColor: string
    TertiaryColor: string
    QuaternaryColor: string
    WikipediaLogoUrl: string
    GlobalTeamID: number
    NbaDotComTeamID: number
}

export default TeamsResponse

// EXAMPLE RESPONSE []
// {
//     "TeamID": 1,
//     "Key": "WAS",
//     "Active": true,
//     "City": "Washington",
//     "Name": "Wizards",
//     "LeagueID": 3,
//     "StadiumID": 1,
//     "Conference": "Eastern",
//     "Division": "Southeast",
//     "PrimaryColor": "002B5C",
//     "SecondaryColor": "E31837",
//     "TertiaryColor": "C4CED4",
//     "QuaternaryColor": "FFFFFF",
//     "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg",
//     "WikipediaWordMarkUrl": null,
//     "GlobalTeamID": 20000001,
//     "NbaDotComTeamID": 1610612764
//   }
