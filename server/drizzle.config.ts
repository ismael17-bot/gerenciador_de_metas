import { defineConfig } from 'drizzle-kit'
import { env } from './src/env';

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: './.migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://postgres:111111@172.19.176.1:5432"
  }
})