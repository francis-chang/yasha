import { z } from 'zod'

export const TeamPlayerSchema = z.object({
    PlayerID: z.number(),
    name: z.string(),
    n: z.number(),
    pickedAt: z.number(),
    pickedString: z.string(),
    statlines: z.any().optional(),
})

export const TeamSchema = z.array(
    z.object({
        name: z.string(),
        team: z.array(TeamPlayerSchema),
        totals: z.any().optional(),
        rankings: z.any().optional(),
    })
)

export type TeamPlayer = z.infer<typeof TeamPlayerSchema>

export type Team = z.infer<typeof TeamSchema>

export type MockDraftPlayer = {
    PlayerID: number
    name: string
    n: number
}
