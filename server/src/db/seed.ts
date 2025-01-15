import dayjs from 'dayjs'

import { client, db } from '.'
import { goals, goalsCompletions, users } from './schema'

async function seed() {
  await db.delete(goalsCompletions)
  await db.delete(goals)

  const [user] = await db
    .insert(users)
    .values({
      name: 'John Doe',
      externalAccountId: 123456789,
      avatarUrl: 'https://github.com/josuellions.png',
    })
    .returning()

  const result = await db
    .insert(goals)
    .values([
      { userId: user.id, title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { userId: user.id, title: 'Me exercitar', desiredWeeklyFrequency: 3 },
      { userId: user.id, title: 'Meditar', desiredWeeklyFrequency: 1 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalsCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() },
    { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
