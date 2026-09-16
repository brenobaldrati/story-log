"use client";

import { useState } from "react";
import Image from "next/image";
import storiesData from "@/data/stories.json";
import type { StoryData, Story } from "@/types";

const data: StoryData = storiesData as StoryData;

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [lightboxStory, setLightboxStory] = useState<Story | null>(null);

  const filteredStories = selectedSubject
    ? data.stories.filter((story) => story.subjects.includes(selectedSubject))
    : data.stories;

  const formatDate = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return `${date.toLocaleDateString("en-US", options)} · ${timeStr}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Story Log</h1>
          <p className="text-gray-400 mt-1">{data.account}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Chips */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSubject(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSubject === null
                  ? "bg-white text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All ({data.stories.length})
            </button>
            {Object.entries(data.subjectLabels).map(([key, label]) => {
              const count = data.stories.filter((s) =>
                s.subjects.includes(key)
              ).length;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSubject(key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSubject === key
                      ? "bg-white text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setLightboxStory(story)}
              className="group cursor-pointer bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all hover:shadow-xl"
            >
              <div className="aspect-[5/6] relative bg-gray-800">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-white transition-colors">
                  {story.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  {formatDate(story.date, story.time)}
                </p>
                <div className="flex flex-wrap gap-1">
                  {story.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded"
                    >
                      {data.subjectLabels[subject]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No stories found for this filter.
          </div>
        )}
      </main>

      {/* Lightbox */}
      {lightboxStory && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxStory(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-light leading-none"
            onClick={() => setLightboxStory(null)}
          >
            ×
          </button>
          <div
            className="max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[5/6] mb-4 max-w-lg mx-auto">
              <Image
                src={lightboxStory.image}
                alt={lightboxStory.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 512px"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">
                {lightboxStory.title}
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                {formatDate(lightboxStory.date, lightboxStory.time)}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {lightboxStory.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                  >
                    {data.subjectLabels[subject]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
