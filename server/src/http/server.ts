import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { createGoalRoute } from '../routes/create-goal'
import { createGoalCompletionRoute } from '../routes/create-goal-completion'
import { getWeekPendingGoalsRoute } from '../routes/get-week-pending-goals'
import { getWeekSummaryRoute } from '../routes/get-week-summary'
import { authenticateFromGithubRoute } from '../routes/authenticate-from-github'
import fastifyJwt from '@fastify/jwt'
import { env } from '../env'
import { getProfileRoute } from '../routes/get-profile'

const port = 3333
const host = '0.0.0.0'
const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'in.orbit',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(authenticateFromGithubRoute)
app.register(createGoalCompletionRoute)
app.register(getWeekPendingGoalsRoute)
app.register(getWeekSummaryRoute)
app.register(createGoalRoute)
app.register(getProfileRoute)

app
  .listen({
    port,
    host,
  })
  .then(() => {
    console.log(`>> Orbit HTTP server running port: ${port}`)
  })
