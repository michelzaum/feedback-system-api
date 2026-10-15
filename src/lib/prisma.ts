import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generate/prisma/client";
import { resolveDatabaseUrl } from "./database";

// pg 8.23 treats sslmode=require as verify-full and prints a deprecation
// warning; pg v9 will switch require to the weaker libpq semantics. Neon's
// connection strings use sslmode=require, so rewrite it to make the current
// strict behavior (certificate + hostname verification) explicit. The local
// connection string has no sslmode, so the rewrite is a no-op there.
const connectionString = resolveDatabaseUrl("pooled").replace(
  "sslmode=require",
  "sslmode=verify-full",
);

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
