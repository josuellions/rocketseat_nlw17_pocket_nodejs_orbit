import { describe, it, expect } from 'vitest'
import {
  calculateExperienceToLevel,
  calculateLevelFromExperience,
  calculateTotalExperienceForLevel,
} from '../../src/modules/gamification'

describe('gamification experience', () => {
  it('experience to level', async () => {
    const exp1 = calculateExperienceToLevel(1)
    const exp2 = calculateExperienceToLevel(2)
    const exp3 = calculateExperienceToLevel(4)

    expect(exp1).toEqual(0)
    expect(exp2).toEqual(26)
    expect(exp3).toEqual(43)
  })

  it('total experience to level', async () => {
    const exp1 = calculateTotalExperienceForLevel(1)
    const exp2 = calculateTotalExperienceForLevel(2)
    const exp3 = calculateTotalExperienceForLevel(3)
    const exp4 = calculateTotalExperienceForLevel(4)

    expect(exp1).toEqual(0)
    expect(exp2).toEqual(26)
    expect(exp3).toEqual(26 + 33)
    expect(exp4).toEqual(26 + 33 + 43)
  })

  it('level from experience', async () => {
    const level1 = calculateLevelFromExperience(10)
    const level2 = calculateLevelFromExperience(27)
    const level4 = calculateLevelFromExperience(26 + 33 + 43)

    expect(level1).toEqual(1)
    expect(level2).toEqual(2)
    expect(level4).toEqual(4)
  })
})
