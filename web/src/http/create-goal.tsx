interface CreateGoalRequest {
  title: string,
  desiredWeeklyFrenquency: number,
}

export async function createGoal({ title, desiredWeeklyFrenquency }: CreateGoalRequest) {
  await fetch("http://localhost:3333/goals", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  title, desiredWeeklyFrenquency})
  })
}