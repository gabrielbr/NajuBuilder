# Naju's academic website

A Next.js site built on ChaiBuilder (`@chaibuilder/core` from npm). The library source lives in the
repo root and stays untouched, so this fork can keep pulling upstream updates.

- **Public site** — `/`, `/pesquisa`, `/publicacoes`, `/fotografia`, `/cv` (all editable, more can be added).
- **Editor** — `/editor`, behind a password at `/login`.

## How Naju edits the site

1. Go to `/login` and enter the password.
2. Pick a page in **Pages**. Double-click any text to change it; click an image and paste a new
   image link in the panel on the right.
3. The header and footer are **Global Blocks** (shared by every page) — edit them once.
4. Click the **save** icon, then **Publish**. Until you publish, visitors keep seeing the old version.
   The ▶ icon previews unpublished changes.

Image uploads are not available in the open-source edition: put photos somewhere public
(e.g. a Google Drive/Photos share link that serves the image, or any image host) and paste the link.

## Run locally

```bash
cd site
pnpm install
cp .env.example .env.local   # then set EDITOR_PASSWORD and SESSION_SECRET
pnpm db:push                 # create the database tables
pnpm dev
```

Open http://localhost:3000/login. The first visit to the editor creates the starter pages.

## Deploy

Any Node host works. The database is libSQL: a local file in development, a hosted
[Turso](https://turso.tech) database in production (`DATABASE_URL=libsql://…`, `DATABASE_AUTH_TOKEN=…`).
Run `pnpm db:push` once against the production database, set the same env vars on the host,
and on Vercel set the project's root directory to `site`.

## Notes on the integration

- `app/(builder)/editor.css` compiles the editor's styles with Tailwind: the published package
  ships its editor as Tailwind class names but no compiled stylesheet (its build copies
  `index.css` from a wrong path). `editor-base.css` is that file converted to Tailwind v4 syntax.
- `app/(public)/public.css` also scans the library's renderer, which wraps images in its own classes.
- Auth is a single password (`lib/auth.ts`): a signed, httpOnly cookie for pages and a Bearer token
  for the editor's API calls. Signed in = full permissions; everyone else is read-only.
