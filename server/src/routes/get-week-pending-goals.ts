import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "../functions/get-week-pending-goals";

export const getWeekPendingGoalsRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get("/goals/pending-goals", async () => {
    const { pendingGoals } = await getWeekPendingGoals();

    return { pendingGoals };
  });
};
