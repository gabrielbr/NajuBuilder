import "server-only";
import "@/lib/blocks";
import { buildChaiBuilderConfig } from "@chaibuilder/core/nextjs/server";
import { createLibsqlDB } from "@chaibuilder/core/db/libsql";

export const chaiConfig = buildChaiBuilderConfig({
  db: createLibsqlDB({
    url: process.env.DATABASE_URL ?? "file:site.db",
    authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
  }),
  globalDataProvider: async () => ({ siteName: "Anna Júlia" }),
});
