"use client";

import { useState } from "react";
import type { Story } from "@/lib/db";

const MOODS = ["joyful", "calm", "neutral", "reflective", "somber"] as const;

const MOOD_STYLES: Record<string, string> = {
  joyful: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  calm: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  neutral: "bg-slate-500/15 text-slate-300 ring-slate-500/30",
  reflective: "bg-indigo-500/15 text-indigo-300 ring-indigo-500/30",
  somber: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
};

function formatDate(value: string): string {
  const parsed = new Date(value.replace(" ", "T") + "Z");
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString();
}

export function StoryLog({ initialStories }: { initialStories: Story[] }) {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState<string>("neutral");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, mood }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setStories((prev) => [data.story as Story, ...prev]);
      setTitle("");
      setBody("");
      setMood("neutral");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    const previous = stories;
    setStories((prev) => prev.filter((s) => s.id !== id));
    const res = await fetch(`/api/stories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setStories(previous);
      setError("Could not delete the entry.");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium text-slate-300">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="A morning walk"
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="body" className="text-sm font-medium text-slate-300">
            Story
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What happened today?"
            rows={4}
            className="resize-y rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="mood" className="text-sm font-medium text-slate-300">
            Mood
          </label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-fit rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
          >
            {MOODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-300 ring-1 ring-rose-500/30">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-fit rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Add entry"}
        </button>
      </form>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-200">
            Entries
          </h2>
          <span className="text-sm text-slate-500">
            {stories.length} {stories.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {stories.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 px-6 py-10 text-center text-slate-500">
            No entries yet. Write your first story above.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {stories.map((story) => (
              <li
                key={story.id}
                className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-slate-100">
                      {story.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
                          MOOD_STYLES[story.mood] ?? MOOD_STYLES.neutral
                        }`}
                      >
                        {story.mood}
                      </span>
                      <time className="text-xs text-slate-500">
                        {formatDate(story.createdAt)}
                      </time>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(story.id)}
                    aria-label={`Delete ${story.title}`}
                    className="rounded-lg px-2 py-1 text-sm text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300"
                  >
                    Delete
                  </button>
                </div>
                <p className="whitespace-pre-wrap text-slate-300">
                  {story.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
