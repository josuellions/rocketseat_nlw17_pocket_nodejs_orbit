import type { InferSelectModel } from 'drizzle-orm'

import { db } from '../../src/db'
import { goalsCompletions } from '../../src/db/schema'

export async function makeGoalCompletion(
  override: Partial<InferSelectModel<typeof goalsCompletions>> &
    Pick<InferSelectModel<typeof goalsCompletions>, 'goalId'>
) {
  const [goalCompletion] = await db
    .insert(goalsCompletions)
    .values(override)
    .returning()

  return goalCompletion
}
