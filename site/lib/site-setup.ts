import "server-only";
import { createClient } from "@libsql/client";
import { NEWSREADER_THEME } from "@/lib/template";

export const appId = () => {
  const id = process.env.CHAIBUILDER_APP_KEY;
  if (!id) throw new Error("CHAIBUILDER_APP_KEY is not set");
  return id;
};

const client = () =>
  createClient({ url: process.env.DATABASE_URL ?? "file:site.db", authToken: process.env.DATABASE_AUTH_TOKEN || undefined });

/** True once the site row exists (the starter pages are created right after it). */
export async function siteExists(): Promise<boolean> {
  const r = await client().execute({ sql: "select 1 from apps where id = ?", args: [appId()] });
  return r.rows.length > 0;
}

export async function createSiteRow() {
  const sql = client();
  const now = new Date().toISOString();
  for (const table of ["apps", "apps_online"]) {
    await sql.execute({
      sql: `insert or ignore into ${table} (id, createdAt, name, settings, theme, fallbackLang, languages, designTokens, ai, configData, consentConfig)
            values (?, ?, ?, '{}', ?, 'pt', '[]', '{}', '{}', '{}', '{}')`,
      args: [appId(), now, "Anna Júlia — site acadêmico", JSON.stringify(NEWSREADER_THEME)],
    });
  }
}
