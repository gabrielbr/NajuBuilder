"use client";
import "@/lib/blocks";
import { ChaiWebsiteBuilder } from "@chaibuilder/core";

export default function EditorClient({ token }: { token: string }) {
  return (
    <ChaiWebsiteBuilder
      apiUrl="/api/chai"
      currentUser={{ id: "naju", name: "Naju", email: "", avatar: "" } as any}
      getAccessToken={async () => token}
      getPreviewUrl={(slug) => `/api/preview?slug=${encodeURIComponent(slug)}`}
      getLiveUrl={(slug) => slug}
      onLogout={() => (window.location.href = "/api/logout")}
      locale="pt"
    />
  );
}
