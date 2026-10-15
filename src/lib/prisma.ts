import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generate/prisma/client";

// pg 8.23 treats sslmode=require as verify-full and prints a deprecation
// warning; pg v9 will switch require to the weaker libpq semantics. Neon's
// connection strings use sslmode=require, so rewrite it to make the current
// strict behavior (certificate + hostname verification) explicit.
const connectionString = process.env.DATABASE_URL!.replace(
  "sslmode=require",
  "sslmode=verify-full",
);

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
