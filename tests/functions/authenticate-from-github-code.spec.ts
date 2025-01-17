import { beforeEach, describe, it, vi, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import { and, eq, ne } from 'drizzle-orm'

import { authenticateFromGithubCode } from '../../src/functions/authenticate-from-github-code'

import { db } from '../../src/db'
import { users } from '../../src/db/schema'
import * as github from '../../src/modules/github-oauth'

import { makeUser } from '../factories/make-user'

describe('authenticate from github code', () => {
  beforeEach(() => {
    vi.mock('../../src/modules/github-oauth')
    vi.clearAllMocks()
  })

  it('should be able to authenticate from github code', async () => {
    const gitUserMock = {
      id: faker.number.int({ min: 1000_00, max: 10_000_00 }),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar_url: faker.image.avatarGitHub(),
    }

    vi.spyOn(github, 'getUserFromAccessToken').mockResolvedValueOnce(
      gitUserMock
    )

    const sut = await authenticateFromGithubCode({
      code: 'sample-github-code',
    })

    expect(sut.token).toEqual(expect.any(String))

    const [userOnDb] = await db
      .select()
      .from(users)
      .where(eq(users.externalAccountId, gitUserMock.id))

    expect(userOnDb.name).toEqual(gitUserMock.name)
  })

  it('should be able to authenticate with existing github user', async () => {
    const existingUser = await makeUser({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
    })

    const user = {
      id: existingUser.externalAccountId,
      name: existingUser.name,
      email: existingUser.email,
      avatar_url: existingUser.avatarUrl,
    }

    await db
      .delete(users)
      .where(
        and(
          eq(users.externalAccountId, existingUser.externalAccountId),
          ne(users.id, existingUser.id)
        )
      )

    vi.spyOn(github, 'getUserFromAccessToken').mockResolvedValueOnce(user)

    const sut = await authenticateFromGithubCode({
      code: 'sample-github-code',
    })

    expect(sut.token).toEqual(expect.any(String))

    const [userOnDb] = await db
      .select()
      .from(users)
      .where(eq(users.externalAccountId, existingUser.externalAccountId))

    expect(userOnDb.name).toEqual(user.name)
  })
})
