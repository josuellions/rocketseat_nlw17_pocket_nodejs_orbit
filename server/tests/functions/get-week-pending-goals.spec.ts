import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'

import { makeGoal } from '../factories/make-goal'
import { makeUser } from '../factories/make-user'
import { makeGoalCompletion } from '../factories/make-goal-completion'

import { getWeekPendingGoals } from '../../src/functions/get-week-pending-goals'

describe('get week pending goals', () => {
  it('should be able to get week pending goals', async () => {
    const user = await makeUser()

    const goal1 = await makeGoal({
      userId: user.id,
      title: faker.lorem.word(),
      desiredWeeklyFrequency: faker.number.int({ min: 1, max: 7 }),
    })
    const goal2 = await makeGoal({
      userId: user.id,
      title: faker.lorem.word(),
      desiredWeeklyFrequency: faker.number.int({ min: 1, max: 7 }),
    })
    const goal3 = await makeGoal({
      userId: user.id,
      title: faker.lorem.word(),
      desiredWeeklyFrequency: faker.number.int({ min: 1, max: 7 }),
    })

    await makeGoalCompletion({ goalId: goal1.id })
    await makeGoalCompletion({ goalId: goal2.id })
    await makeGoalCompletion({ goalId: goal3.id })
    await makeGoalCompletion({ goalId: goal3.id })

    const result = await getWeekPendingGoals({
      userId: user.id,
    })

    expect(result).toEqual({
      pendingGoals: expect.arrayContaining([
        expect.objectContaining({
          title: goal1.title,
          desiredWeeklyFrequency: goal1.desiredWeeklyFrequency,
          completionCount: 1,
        }),
        expect.objectContaining({
          title: goal2.title,
          desiredWeeklyFrequency: goal2.desiredWeeklyFrequency,
          completionCount: 1,
        }),
        expect.objectContaining({
          title: goal3.title,
          desiredWeeklyFrequency: goal3.desiredWeeklyFrequency,
          completionCount: 2,
        }),
      ]),
    })
  })
})
