// import { drizzle } from "drizzle-orm/postgres-js";
// import { neon } from '@neondatabase/serverless';

// const client = neon(process.env.DATABASE_URL!)

// export const db = drizzle(client)

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';


const sql = neon(process.env.DATABASE_URL!)

// export const db = drizzle(sql, {logger: true});
export const db = drizzle(sql);