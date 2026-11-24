import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { getChaiBuilder } from "@/chaibuilder.server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { createSiteRow, siteExists } from "@/lib/site-setup";
import { footerBlocks, headerBlocks, pages } from "@/lib/template";

/**
 * First run only: creates the site and the starter academic pages, then publishes them.
 * The editor redirects here when the site doesn't exist yet.
 */
export async function GET(request: NextRequest) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) redirect("/login");
  if (await siteExists()) redirect("/editor");

  await createSiteRow();
  const headers = new Headers(request.headers);
  headers.set("authorization", `Bearer ${token}`);
  const cb = await getChaiBuilder({ params: Promise.resolve({}) } as any, new Request(request.url, { headers }) as any);

  const run = async (action: string, data: unknown) => {
    const res = (await cb.handleHttpAction({ action, data } as any)) as Response;
    const body: any = await res.json();
    if (!res.ok || body?.ok === false) throw new Error(`${action} failed (${res.status}): ${JSON.stringify(body)}`);
    return body?.data ?? body;
  };
  const idOf = (r: any) => r?.id ?? r?.page?.id;

  const headerId = idOf(await run("CREATE_PAGE", { name: "Cabeçalho", slug: "", pageType: "global", blocks: headerBlocks() }));
  const footerId = idOf(await run("CREATE_PAGE", { name: "Rodapé", slug: "", pageType: "global", blocks: footerBlocks() }));
  const ids: string[] = [headerId, footerId];
  for (const p of pages) {
    const blocks = [
      { _id: `hdr${p.key}`, _type: "PartialBlock", partialBlockId: headerId },
      ...p.blocks(),
      { _id: `ftr${p.key}`, _type: "PartialBlock", partialBlockId: footerId },
    ];
    ids.push(idOf(await run("CREATE_PAGE", { name: p.name, slug: p.slug, pageType: "page", blocks, seo: p.seo })));
  }
  await run("PUBLISH_CHANGES", { ids: [...ids, "THEME"] });
  redirect("/editor");
}
