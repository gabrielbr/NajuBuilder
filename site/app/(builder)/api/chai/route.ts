import { getChaiBuilder } from "@/chaibuilder.server";
import { handleChaiActionRequest } from "@chaibuilder/core/nextjs/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest, props: { params: Promise<Record<string, string>> }) {
  const cb = await getChaiBuilder(props, request);
  return handleChaiActionRequest(request, cb.handleHttpAction);
}
