import { z } from 'zod';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createGoal } from '../../functions/create-goal';

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
  app.post('/goals', {
    schema: {
        body: z.object({
            title: z.string(),
            desiredWeeklyFrenquency: z.number().int().min(1).max(7),
        })
    }
  },
  async (request) => {
      const {title, desiredWeeklyFrenquency} = request.body;

      const { goal } = await createGoal({
        title,
        desiredWeeklyFrenquency,
      })

      return { goalId: goal.id }
  })
};