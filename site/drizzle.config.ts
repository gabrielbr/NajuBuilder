import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./node_modules/@chaibuilder/core/dist/db/schema-sqlite.js",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "file:site.db",
    authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
  },
});
