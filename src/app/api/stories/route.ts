import { NextResponse } from "next/server";
import { createStory, listStories } from "@/lib/db";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ stories: listStories() });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { title, body, mood } = (payload ?? {}) as {
    title?: unknown;
    body?: unknown;
    mood?: unknown;
  };

  if (typeof title !== "string" || title.trim().length === 0) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (typeof body !== "string" || body.trim().length === 0) {
    return NextResponse.json({ error: "Body is required." }, { status: 400 });
  }

  const story = createStory({
    title: title.trim(),
    body: body.trim(),
    mood: typeof mood === "string" && mood.trim().length > 0 ? mood.trim() : "neutral",
  });

  return NextResponse.json({ story }, { status: 201 });
}
