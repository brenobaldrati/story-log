import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export interface Story {
  id: number;
  title: string;
  body: string;
  mood: string;
  createdAt: string;
}

const DB_PATH = process.env.STORY_LOG_DB_PATH ?? "data/story-log.db";

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (db) return db;

  mkdirSync(dirname(DB_PATH), { recursive: true });

  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS stories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      mood TEXT NOT NULL DEFAULT 'neutral',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  return db;
}

interface StoryRow {
  id: number;
  title: string;
  body: string;
  mood: string;
  created_at: string;
}

function toStory(row: StoryRow): Story {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    mood: row.mood,
    createdAt: row.created_at,
  };
}

export function listStories(): Story[] {
  const rows = getDb()
    .prepare("SELECT * FROM stories ORDER BY id DESC")
    .all() as StoryRow[];
  return rows.map(toStory);
}

export function createStory(input: {
  title: string;
  body: string;
  mood?: string;
}): Story {
  const info = getDb()
    .prepare("INSERT INTO stories (title, body, mood) VALUES (?, ?, ?)")
    .run(input.title, input.body, input.mood ?? "neutral");

  const row = getDb()
    .prepare("SELECT * FROM stories WHERE id = ?")
    .get(info.lastInsertRowid) as StoryRow;

  return toStory(row);
}

export function deleteStory(id: number): boolean {
  const info = getDb().prepare("DELETE FROM stories WHERE id = ?").run(id);
  return info.changes > 0;
}
