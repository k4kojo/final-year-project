import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema.js";
import { DATABASE_URL } from "./env.js";

const sql = neon(DATABASE_URL);
export const db = drizzle(sql, { schema });
