import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { authenticateUserHook } from '../http/hooks/authenticate-user'
import { getUserLevelAndExperience } from '../functions/get-user-level-and-experience'

export const getUserExperienceAndLevelRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/profile/gamification',
      {
        onRequest: [authenticateUserHook],
        schema: {
          tags: ['gamification'],
          description: 'Get user experience and level',
          response: {
            200: z.object({
              experienceToNextLevel: z.number(),
              experience: z.number(),
              level: z.number(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = request.user.sub

        const { experienceToNextLevel, experience, level } =
          await getUserLevelAndExperience({ userId })

        return reply
          .status(200)
          .send({ experienceToNextLevel, experience, level })
      }
    )
  }
