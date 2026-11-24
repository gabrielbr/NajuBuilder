import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/** Shows unpublished changes. Only for the signed-in editor. */
export async function GET(request: Request) {
  if (!verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)) redirect("/login");
  const slug = new URL(request.url).searchParams.get("slug") || "/";
  (await draftMode()).enable();
  redirect(slug.startsWith("/") ? slug : `/${slug}`);
}
