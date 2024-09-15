import { z } from 'zod';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createGoalCompletion } from '../../functions/create-goal-commpletion';

export const createCompletionGoalRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post('/completion', {
    schema: {
        body: z.object({
            goalId: z.string(),
        })
    }
  },
  async (request) => {
      const {goalId} = request.body;

      await createGoalCompletion({
          goalId,
      });
  });
};