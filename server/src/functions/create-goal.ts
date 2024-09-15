import { db } from "../db"
import { goals } from "../db/schema"

interface CreateFoalRequest {
  title: string
  desiredWeeklyFrenquency: number
}

export async function createGoal({title, desiredWeeklyFrenquency} : CreateFoalRequest) {
  const [goal] = await db.insert(goals).values({
    title, 
    desiredWeeklyFrenquency

  }).returning();
  
  return {
    goal
  };
}