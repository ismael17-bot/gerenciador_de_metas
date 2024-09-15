import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import dayjs from "dayjs";

import { db } from "../db"
import { goalCompletions, goals } from "../db/schema"

interface CreateGoalCompletionRequest {
  goalId: string
}

export async function createGoalCompletion({ goalId } : CreateGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate();
  const lastDayOfWeek = dayjs().endOf('week').toDate();

  const goalCompletionCounts = db.$with('goal_completion_counts').as(
    db.select({
      goalId: goalCompletions.goalId,
      completionCount: count(goalCompletions.id).as('completionCount')
    })
    .from(goalCompletions)
    .where(
      and(
        gte(goalCompletions.createdAt, firstDayOfWeek),
        lte(goalCompletions.createdAt, lastDayOfWeek),
        eq(goalCompletions.goalId, goalId)
      )
    )
    .groupBy(goalCompletions.goalId)
  )

  const result = await db.with(goalCompletionCounts)
    .select({
      desiredWeeklyFrenquency: goals.desiredWeeklyFrenquency,
      completionCount: sql`COALESCE(${goalCompletionCounts.completionCount}, 0)`.mapWith(Number)
    }).from(goals)
    .leftJoin(goalCompletionCounts, eq(goalCompletionCounts.goalId, goals.id))
    .where(eq(goals.id, goalId))
  
  
  const { completionCount, desiredWeeklyFrenquency } = result[0];
  
  if (completionCount >= desiredWeeklyFrenquency) {
    throw new Error('Goal already completes this week');
  }

  const InsertResult = await db.insert(goalCompletions).values({ goalId }).returning();
  const goalCompletion = InsertResult[0];

  return {
    goalCompletion
  };
}