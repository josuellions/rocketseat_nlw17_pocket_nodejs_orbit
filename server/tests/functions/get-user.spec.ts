import { eq } from 'drizzle-orm'
import { describe, it, expect, beforeEach } from 'vitest'

import { db } from '../../src/db'
import { users } from '../../src/db/schema'
import { getUser } from '../../src/functions/get-user'

describe('get user', () => {
  const userId = 'john-doe'
  const userAvatarUrl = 'https://github.com/josuellions.png'

  beforeEach(async () => {
    await db.delete(users).where(eq(users.id, userId))
  })

  it('should be able to get a user', async () => {
    await db.insert(users).values({
      id: userId,
      avatarUrl: userAvatarUrl,
      externalAccountId: 123456789,
    })

    const result = await getUser({ userId })

    expect(result).toEqual({
      user: {
        id: userId,
        name: null,
        email: null,
        avatarUrl: userAvatarUrl,
      },
    })
  })
})
