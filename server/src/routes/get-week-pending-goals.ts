import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'
import z from 'zod'
import { authenticateUserHook } from '../http/hooks/authenticate-user'

export const getWeekPendingGoalsRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get(
    '/goals/pending-goals',
    {
      onRequest: [authenticateUserHook],
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
    async (_, reply) => {
      const { pendingGoals } = await getWeekPendingGoals()

      return reply.status(200).send({ pendingGoals })
    }
  )
}
