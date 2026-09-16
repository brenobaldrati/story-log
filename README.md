# story-log

A small journal web app for logging short stories and daily notes. Built with
Next.js (App Router), React, TypeScript, Tailwind CSS, and a local SQLite
database (via `better-sqlite3`).

## Features

- Create journal entries with a title, body, and mood.
- View all entries, newest first.
- Delete entries.
- Entries persist in a local SQLite database.

## Requirements

- Node.js 22+
- npm 10+

## Getting started

```bash
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server.        |
| `npm run build`   | Create a production build.           |
| `npm run start`   | Start the production server.         |
| `npm run lint`    | Run ESLint.                          |
| `npm run typecheck` | Run the TypeScript type checker.   |

## Data storage

Entries are stored in a SQLite database at `data/story-log.db` by default.
Override the location with the `STORY_LOG_DB_PATH` environment variable. The
`data/` directory is git-ignored.

## API

| Method   | Route               | Description            |
| -------- | ------------------- | ---------------------- |
| `GET`    | `/api/stories`      | List all entries.      |
| `POST`   | `/api/stories`      | Create an entry.       |
| `DELETE` | `/api/stories/:id`  | Delete an entry by id. |
