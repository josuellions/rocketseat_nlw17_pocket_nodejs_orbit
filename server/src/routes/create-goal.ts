import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../functions/create-goal'
import { authenticateUserHook } from '../http/hooks/authenticate-user'

export const createGoalRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post(
    '/goals/create',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        description: 'Create a goal',
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { title, desiredWeeklyFrequency } = request.body

      await createGoal({
        title,
        desiredWeeklyFrequency,
      })

      return reply.status(201).send()
    }
  )
}
