import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';


export const client = postgres("postgresql://postgres:111111@172.19.176.1:5432");
export const db = drizzle(client, { schema, logger: true});