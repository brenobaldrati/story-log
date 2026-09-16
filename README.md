# Story Log - @pedrosettec

A minimal, clean Instagram Stories log gallery built with Next.js and Tailwind CSS.

## Features

- 📱 Responsive story cards with cropped images
- 🏷️ Filter stories by subject tags
- 🔍 Lightbox view for full-size images
- 🌙 Clean dark theme
- ⚡ Fast static generation

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Adding New Stories

To add new stories to the gallery:

1. **Add images**: Place new story screenshots in `public/stories/` with the naming pattern `YYYY-MM-DD-frameN.jpg`

2. **Update data**: Edit `data/stories.json` and append new story entries:
   ```json
   {
     "id": "2026-09-17-frame1",
     "date": "2026-09-17",
     "time": "14:30 ET",
     "account": "pedrosettec",
     "title": "Your story title",
     "subjects": ["quotes", "books"],
     "image": "/stories/2026-09-17-frame1.jpg",
     "frame": 1
   }
   ```

3. **Add new subjects**: If using new subject tags, add them to the `subjectLabels` object in `stories.json`:
   ```json
   "subjectLabels": {
     "new-subject": "New Subject Label"
   }
   ```

4. Rebuild and deploy:
   ```bash
   npm run build
   ```

## Deployment on Vercel

### Recommended: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with your GitHub account
3. Click "Import" next to the `story-log` repository
4. Vercel will auto-detect Next.js settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
5. Click "Deploy"

The site will be live at `https://story-log-<random>.vercel.app` in ~30 seconds.

### Alternative: Deploy via Vercel CLI

```bash
# Login to Vercel (one-time)
npx vercel login

# Deploy to production
npx vercel --prod
```

No additional configuration needed - Vercel automatically handles Next.js projects.

## Build

To build for production:

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Vercel** (deployment)

## License

MIT
