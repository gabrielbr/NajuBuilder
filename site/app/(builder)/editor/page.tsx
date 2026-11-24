import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { siteExists } from "@/lib/site-setup";
import EditorClient from "./editor-client";

export default async function EditorPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) redirect("/login");
  if (!(await siteExists())) redirect("/api/setup");
  return <EditorClient token={token!} />;
}
