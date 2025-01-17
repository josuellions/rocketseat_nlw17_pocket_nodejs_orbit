import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .optional()
    .default('production'),
  POSTGRES_DATABASE_URL: z.string().url(),
  EXPERIENCE_FACTOR: z.coerce.number(),
  BASE_EXPERIENCE: z.coerce.number(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
