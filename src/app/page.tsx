import { StoryLog } from "@/components/StoryLog";
import { listStories } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function Home() {
  const initialStories = listStories();

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          Story Log
        </h1>
        <p className="text-slate-400">
          Capture short stories and daily notes. Every entry is saved to a local
          SQLite database.
        </p>
      </header>

      <StoryLog initialStories={initialStories} />
    </main>
  );
}
