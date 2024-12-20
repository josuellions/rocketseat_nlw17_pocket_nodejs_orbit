import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createGoalRoute } from "../routes/create-goal";
import { createGoalCompletionRoute } from "../routes/create-goal-completion";
import { getWeekPendingGoalsRoute } from "../routes/get-week-pending-goals";
import { getWeekSummaryRoute } from "../routes/get-week-summary";
import fastifyCors from "@fastify/cors";

const port = 3333;
const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(createGoalCompletionRoute);
app.register(getWeekPendingGoalsRoute);
app.register(getWeekSummaryRoute);

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`>> Orbit HTTP server running port: ${port}`);
  });
