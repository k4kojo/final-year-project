import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { DATABASE_URI } from "../config/env.js";
import * as schema from "./schema.js";

const pool = new Pool({
  connectionString: DATABASE_URI,
});

export const db = drizzle(pool, { schema });
