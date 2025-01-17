import { z } from 'zod'
import dayjs from 'dayjs'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { getWeekSummary } from '../functions/get-week-summary'
import { authenticateUserHook } from '../http/hooks/authenticate-user'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get(
    '/summary',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        description: 'Get week summary',
        querystring: z.object({
          weekStartsAt: z.coerce
            .date()
            .optional()
            .default(dayjs().startOf('week').toDate()),
        }),
        response: {
          200: z.object({
            summary: z.object({
              completed: z.number(),
              total: z.number(),
              goalsPerDay: z.record(
                z.string(),
                z.array(
                  z.object({
                    id: z.string(),
                    title: z.string(),
                    completedAt: z.string(),
                  })
                )
              ),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub
      const { weekStartsAt } = request.query
      const { summary } = await getWeekSummary({ userId, weekStartsAt })

      return reply.status(200).send({ summary })
    }
  )
}
