import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'

import { makeUser } from '../factories/make-user'
import { createGoal } from '../../src/functions/create-goal'

describe('create goal', () => {
  it('should be able to create a new goal', async () => {
    const newTitle = faker.lorem.word()
    const newDesiredWeeklyFrequency = faker.number.int({ min: 1, max: 7 })

    const user = await makeUser()
    const result = await createGoal({
      userId: user.id,
      title: newTitle,
      desiredWeeklyFrequency: newDesiredWeeklyFrequency,
    })

    expect(result).toEqual({
      goal: expect.objectContaining({
        id: expect.any(String),
        title: newTitle,
        desiredWeeklyFrequency: newDesiredWeeklyFrequency,
      }),
    })
  })
})
