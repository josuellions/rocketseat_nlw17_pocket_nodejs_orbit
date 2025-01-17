import { describe, it, expect } from 'vitest'
import { makeUser } from '../factories/make-user'
import { getUserLevelAndExperience } from '../../src/functions/get-user-level-and-experience'
import {
  calculateLevelFromExperience,
  calculateTotalExperienceForLevel,
} from '../../src/modules/gamification'

describe('get user level and experience', () => {
  it('should be able to get a user level and experience', async () => {
    const user = await makeUser({
      experience: 200,
    })

    const sut = await getUserLevelAndExperience({ userId: user.id })

    const level = calculateLevelFromExperience(200)

    const experienceToNextLevel = calculateTotalExperienceForLevel(level)

    expect(sut).toEqual({
      experienceToNextLevel,
      experience: 200,
      level,
    })
  })
})
