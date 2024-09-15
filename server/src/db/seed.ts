import dayjs from "dayjs";
import { client, db } from ".";
import { goalCompletions, goals } from "./schema";

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db.insert(goals).values([
    {title: "acordar cedo", desiredWeeklyFrenquency: 5},
    {title: "Me exercitar", desiredWeeklyFrenquency: 3},
    {title: "Meditar", desiredWeeklyFrenquency: 2}
  ]).returning();

  const startOfWeek = dayjs().startOf('week');

  await db.insert(goalCompletions).values([
    {goalId: result[0].id, createdAt: startOfWeek.toDate()},
    {goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate()}

  ])
}

seed().finally(() => {
  client.end()
})