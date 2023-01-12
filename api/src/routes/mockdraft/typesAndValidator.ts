import { z } from 'zod'

export const TeamPlayerSchema = z.object({
    PlayerID: z.number(),
    name: z.string(),
    n: z.number(),
    pickedAt: z.number(),
})

export const TeamSchema = z.array(
    z.object({
        name: z.string(),
        team: z.array(TeamPlayerSchema),
    })
)

export type TeamPlayer = z.infer<typeof TeamPlayerSchema>

export type Team = z.infer<typeof TeamSchema>

export type MockDraftPlayer = {
    PlayerID: number
    name: string
    n: number
}
