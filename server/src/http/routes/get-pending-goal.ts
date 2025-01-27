import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekPendingGoals } from '../../functions/get-week-pending-goal';

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.get('/pending-goals', async () => {
    const {pendingGoals} = await getWeekPendingGoals();

    return { pendingGoals };
  })
};