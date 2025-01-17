import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  name: text('name'),
  email: text('email'),
  avatarUrl: text('avatar_url').notNull(),
  experience: integer('experience').notNull().default(0),
  externalAccountId: integer('external_account_id').notNull().unique(),
})

export const goals = pgTable('goals', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const goalsCompletions = pgTable('goals_completions', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  goalId: text('gols_id')
    .references(() => goals.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
