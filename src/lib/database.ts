// Resolves which database the application and the Prisma CLI talk to.
//
// DATABASE_TARGET explicitly selects the target:
//   - "local"      -> local development Postgres (Docker container "pg")
//   - "production" -> production Neon database
//
// When DATABASE_TARGET is not set, the default is "local", unless
// DATABASE_URL is present in the environment. The deployed Neon Functions
// runtime and `neon-env run` always inject DATABASE_URL, so they resolve to
// production on their own. The local .env deliberately does not define
// DATABASE_URL, which keeps plain `npm run dev` on the local database.

export type DatabaseTarget = "local" | "production";

export type DatabaseUrlKind = "pooled" | "unpooled";

export function resolveDatabaseTarget(): DatabaseTarget {
  const explicit = process.env.DATABASE_TARGET;

  if (explicit === "local" || explicit === "production") {
    return explicit;
  }

  if (explicit !== undefined) {
    throw new Error(
      `Invalid DATABASE_TARGET "${explicit}". Use "local" or "production".`,
    );
  }

  return process.env.DATABASE_URL ? "production" : "local";
}

// Pooled URL (PgBouncer) carries application query traffic; the unpooled
// (direct) URL is for migrations, because PgBouncer transaction mode does
// not support session-level operations.
export function resolveDatabaseUrl(kind: DatabaseUrlKind): string {
  const target = resolveDatabaseTarget();
  const suffix = kind === "pooled" ? "" : "_UNPOOLED";

  if (target === "local") {
    const url = process.env[`DATABASE_URL${suffix}_LOCAL`];

    if (!url) {
      throw new Error(
        `DATABASE_URL${suffix}_LOCAL is not set, but the database target is "local".`,
      );
    }

    return url;
  }

  // Production: prefer DATABASE_URL / DATABASE_URL_UNPOOLED when injected
  // (deployed runtime, `neon-env run`), fall back to the explicit
  // DATABASE_URL_PRODUCTION / DATABASE_URL_UNPOOLED_PRODUCTION values from
  // .env for manual opt-in via DATABASE_TARGET=production.
  const url =
    process.env[`DATABASE_URL${suffix}`] ??
    process.env[`DATABASE_URL${suffix}_PRODUCTION`];

  if (!url) {
    throw new Error(
      `Neither DATABASE_URL${suffix} nor DATABASE_URL${suffix}_PRODUCTION is set, but the database target is "production".`,
    );
  }

  return url;
}
