import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getChaiBuilder } from "@/chaibuilder.server";
import { ChaiPageCSS, ChaiPageJSONLD, RenderChaiBlocks } from "@chaibuilder/core/nextjs/render";

type Props = { params: Promise<{ slug?: string[] }> };

const toSlug = (parts?: string[]) => "/" + (parts ?? []).map(decodeURIComponent).join("/");

export default async function Page(props: Props) {
  const slug = toSlug((await props.params).slug);
  const cb = await getChaiBuilder(props);
  const payload = await cb.getPagePayload(slug);
  if (!payload) notFound();
  const { page, pageData, settings } = payload as any;
  const { isEnabled: draft } = await draftMode();

  return (
    <>
      <ChaiPageCSS page={page} />
      <ChaiPageJSONLD page={page} pageData={pageData} />
      {draft && (
        <a href="/api/logout" style={{ position: "fixed", bottom: 12, right: 12, zIndex: 50, background: "#fde68a", padding: "6px 12px", borderRadius: 999, fontSize: 13, fontFamily: "system-ui" }}>
          Pré-visualização (não publicado)
        </a>
      )}
      <RenderChaiBlocks page={page} pageData={pageData} settings={settings} pageProps={{ slug }} draft={draft} />
    </>
  );
}

export async function generateMetadata(props: Props) {
  const slug = toSlug((await props.params).slug);
  const cb = await getChaiBuilder(props);
  const payload = await cb.getPagePayload(slug);
  if (!payload) return {};
  return cb.generateMetaData({ page: payload.page as any, pageData: payload.pageData, settings: payload.settings as any, slug });
}
