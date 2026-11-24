import { cookies, draftMode } from "next/headers";
import { createChaiBuilder } from "@chaibuilder/core/nextjs/server";
import { chaiConfig } from "@/chaibuilder.config";
import { EDITOR_USER_ID, SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const { getChaiBuilder } = createChaiBuilder(chaiConfig, {
  context: async ({ request }) => {
    const { isEnabled } = await draftMode();
    const token = request
      ? (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "")
      : (await cookies()).get(SESSION_COOKIE)?.value;
    const signedIn = verifySessionToken(token);
    return {
      appId: process.env.CHAIBUILDER_APP_KEY ?? "",
      siteUrl: process.env.SITE_URL,
      draft: isEnabled,
      userId: signedIn ? EDITOR_USER_ID : null,
      // Naju is the only editor: signed in = full access, otherwise none.
      ...(signedIn ? { role: "admin", permissions: ["*"] } : {}),
    };
  },
});
