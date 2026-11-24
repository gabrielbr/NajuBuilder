"use client";
import dynamic from "next/dynamic";

// The editor only runs in the browser.
const ChaiEditor = dynamic(() => import("./chai-editor"), { ssr: false });

export default function EditorClient({ token }: { token: string }) {
  return <ChaiEditor token={token} />;
}
