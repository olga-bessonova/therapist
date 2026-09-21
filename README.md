# Chynara — Hypnosis & Reiki

**Live site: [chynarawellness.com](https://chynarawellness.com)**

A bilingual (EN/RU) marketing site for a certified hypnotist and Reiki practitioner: services and pricing, a pre-session prep guide with a downloadable PDF, video client reviews, and an FAQ page — with a Calendly link for booking.

## Tech

Front end only — no backend, no database. Everything is static, built with [Vite](https://vite.dev) and deployed to GitHub Pages via GitHub Actions.

- **[React](https://react.dev) 19** + **[React Router](https://reactrouter.com) 7** for client-side routing
- **[Tailwind CSS](https://tailwindcss.com) v4**
- **[lucide-react](https://lucide.dev)** for icons
- **[Playwright](https://playwright.dev)** (dev-only) to render the downloadable prep-guide PDFs — see `scripts/generate-pdfs.mjs`

**4 pages**, one route pair per language:

| | English | Russian |
|---|---|---|
| Home (hero, services, pricing, prep guide, reviews, contact) | `/en` | `/ru` |
| FAQ | `/en/faq` | `/ru/faq` |

## A few things worth pointing out

- **Fully bilingual, no i18n library** — all copy lives in plain content objects (`src/i18n/content.en.js` / `content.ru.js`), swapped via a small language context. Every section, including the generated PDFs, pulls from the same source of truth.
- **Downloadable PDF prep guide, generated from the site itself** — `scripts/generate-pdfs.mjs` renders the "Before Our Session" content through headless Chromium into styled, bilingual PDFs (`public/before-session-en.pdf` / `-ru.pdf`). Re-run it whenever the content changes.
- **Video reviews carousel** with a lightweight lightbox — thumbnails only load the YouTube embed on click.
- **A floating "Book a consultation" button** that reveals its label on hover and stays out of the way until you've scrolled.
- **SPA deep-linking on GitHub Pages** — GitHub Pages has no server-side routing, so `public/404.html` + a small inline redirect script in `index.html` let direct links like `/en/faq` or `/en#prep` work even though it's a static host.

## Development

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```
