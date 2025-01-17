import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'

import { makeGoal } from '../factories/make-goal'
import { makeUser } from '../factories/make-user'
import { makeGoalCompletion } from '../factories/make-goal-completion'

import { getWeekSummary } from '../../src/functions/get-week-summary'
import dayjs from 'dayjs'

async function createMakeGoal(userId: string, weekStartsAt: Date) {
  return await makeGoal({
    userId: userId,
    title: faker.lorem.word(),
    createdAt: weekStartsAt,
    desiredWeeklyFrequency: faker.number.int({ min: 1, max: 7 }),
  })
}

describe('get week summary', () => {
  it('should be able to get week summary', async () => {
    const weekStartsAt = dayjs(new Date(2025, 0, 5))
      .startOf('week')
      .toDate()
    const addDays = [2, 2, 3, 5]
    const user = await makeUser()

    const goal1 = await createMakeGoal(user.id, weekStartsAt)
    const goal2 = await createMakeGoal(user.id, weekStartsAt)
    const goal3 = await createMakeGoal(user.id, weekStartsAt)

    await makeGoalCompletion({
      goalId: goal1.id,
      createdAt: dayjs(weekStartsAt).add(2, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal2.id,
      createdAt: dayjs(weekStartsAt).add(2, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal3.id,
      createdAt: dayjs(weekStartsAt).add(3, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal3.id,
      createdAt: dayjs(weekStartsAt).add(5, 'days').toDate(),
    })

    const result = await getWeekSummary({
      userId: user.id,
      weekStartsAt,
    })

    const goalsCompleted = 4
    const totalGoalsCreated =
      goal1.desiredWeeklyFrequency +
      goal2.desiredWeeklyFrequency +
      goal3.desiredWeeklyFrequency

    expect(result).toEqual({
      summary: {
        completed: goalsCompleted,
        total: totalGoalsCreated,
        goalsPerDay: {
          '2025-01-10': expect.arrayContaining([
            expect.objectContaining({
              title: goal3.title,
            }),
          ]),
          '2025-01-08': expect.arrayContaining([
            expect.objectContaining({
              title: goal3.title,
            }),
          ]),
          '2025-01-07': expect.arrayContaining([
            expect.objectContaining({
              title: goal1.title,
            }),
            expect.objectContaining({
              title: goal2.title,
            }),
          ]),
        },
      },
    })
  })
})
