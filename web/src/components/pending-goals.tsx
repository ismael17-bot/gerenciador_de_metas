import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { getPendingGoals } from "../http/get-pending-goals";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createGoalCompletion } from "../http/create-goal-completion";

export function PendingGolas() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['pendingGoals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60
  })

  if (!data) {
    return null
  }

  async function handleCompleteGoal(goalId: String) {
    await createGoalCompletion(goalId)
    queryClient.invalidateQueries({ queryKey: ['summary']})
    queryClient.invalidateQueries({ queryKey: ['pendingGoals']})
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        return (
          <OutlineButton 
            key={goal.id} 
            disabled={goal.completionCount >= goal.desiredWeeklyFrenquency} 
            onClick={() => { handleCompleteGoal(goal.id); }}
          >
            <Plus className="size-4 text-zinc-600"/>
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
  
}