import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'
import z from 'zod'

export const getWeekPendingGoalsRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get(
    '/goals/pending-goals',
    {
      schema: {
        tags: ['goals'],
        description: 'Get pending goals',
        response: {
          200: z.object({
            pendingGoals: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                desiredWeeklyFrequency: z.number(),
                completionCount: z.number(),
              })
            ),
          }),
        },
      },
    },
    async (_, replay) => {
      const { pendingGoals } = await getWeekPendingGoals()

      return replay.status(200).send({ pendingGoals })
    }
  )
}
