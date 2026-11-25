# akshatasawant9699.github.io

Personal site of Akshata Sawant: developer advocate, author, and builder of eval-tested AI agents.

Static [Astro](https://astro.build) site. No UI framework, no tracking. The only JavaScript is a tiny script that loads a YouTube embed when you click a video. Deployed to GitHub Pages by GitHub Actions.

## Run it locally

Requires Node 22.12+ (CI uses Node 24).

```sh
npm start          # installs dependencies and starts http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (drafts are visible here, marked "Draft") |
| `npm run build` | Build the site into `dist/` (drafts excluded) |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check:links` | Check every link in `dist/` (needs [lychee](https://lychee.cli.rs): `brew install lychee`) |

## Where things live

```
src/
  site.config.ts        name, positioning, social links, timeline, newsletter form, nav
  now.md                the "Now" section on the home page
  content/posts/        blog posts (.md or .mdx)
  data/videos.yaml      videos
  data/talks.yaml       talks
  data/projects.yaml    projects (featured: true puts one on the home page)
  content.config.ts     schemas for all of the above (the build fails if content is invalid)
  assets/headshot.jpg   profile photo (optimised automatically)
  pages/                one file per page
public/
  og-default.png        default social share image (1200x630)
  resume.pdf            PLACEHOLDER: replace with your résumé (no phone or email)
```

## Adding content

### A blog post

Create `src/content/posts/my-post.md` (or `.mdx` to use components). The file name becomes the URL: `/writing/my-post/`.

```md
---
title: "My post title"
date: 2026-12-01
description: "One or two sentences. Used for SEO, social cards and RSS."
tags: [MCP, AI agents]
draft: false          # true = hidden from the build, RSS and sitemap
---

Your post in Markdown.
```

**A post published elsewhere** (e.g. the Salesforce Developers Blog): add `externalUrl:` and `publication:` and leave the body empty. It's listed in Writing and RSS and links out. See the `sf-*.md` files.

### A video

Add an entry to `src/data/videos.yaml`:

```yaml
- id: my-video                 # unique
  title: My video
  date: 2026-12-01
  youtubeId: abcdefghijk       # the 11-character ID from the URL
  source: own                  # own = embed on click; external = link to the official copy
  channel: Akshata Sawant
  description: Optional one-liner.
```

Use `source: external` for videos made for Salesforce, so they link to the official copy.

**Automatic:** at build time the site also reads the RSS feeds of the public playlists listed in `YOUTUBE.playlists` (`src/site.config.ts`) and adds any video uploaded by your channel that isn't already in `videos.yaml`, grouped by playlist. The workflow rebuilds daily at 06:17 UTC, so new uploads show up within a day. To add a playlist, paste its ID (the `list=` part of the URL). To hide or rename an auto-added video, add it to `videos.yaml` (curated entries win). If YouTube is unreachable, the build continues with `videos.yaml` only.

### A talk or project

Add an entry to `src/data/talks.yaml` or `src/data/projects.yaml`, following the existing entries. Schemas are in `src/content.config.ts`.

### Placeholder content

Items marked **PLACEHOLDER** (or `placeholder: true`) are seed content to replace or delete:

- `src/content/posts/why-eval-tested-agents.md`
- `src/content/posts/notes-on-mcp-tool-design.mdx`
- `src/content/posts/draft-example.md` (a draft, to show that drafts are excluded)
- `public/resume.pdf`
- the newsletter form (see below)

Everything else (blog links, videos, talks, projects, timeline) is real. Talk dates are approximate (month of the recording), so check them.

## Newsletter / book sign-up form

The form posts to the URL in `NEWSLETTER.action` in `src/site.config.ts`. While that's empty, the form is disabled and shows a "Sign-up opens soon" note.

To turn it on, sign up with a provider that accepts a plain HTML form post and paste its endpoint:

```ts
export const NEWSLETTER = {
  action: 'https://buttondown.com/api/emails/embed-subscribe/YOUR_USERNAME', // example
  method: 'post',
  emailField: 'email',   // the field name your provider expects
};
```

Buttondown, Kit (ConvertKit), Mailchimp (use the form's `action` URL; the field is usually `EMAIL`) and EmailOctopus all work this way.

## Deploying

Every push to `main` (and a daily schedule) runs `.github/workflows/deploy.yml`:

1. `npm ci` and `npm run build`
2. **Link check** with lychee (fails on broken links; LinkedIn and Amazon are excluded because they block bots)
3. Deploy `dist/` to GitHub Pages

Pull requests run steps 1 and 2 only.

One-time setup: **Settings → Pages → Build and deployment → Source → GitHub Actions**.

## Using a custom domain later

1. Buy the domain (e.g. `example.dev`).
2. At your DNS provider, add:
   - **Apex** (`example.dev`): four `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (optionally `AAAA`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`).
   - **www**: a `CNAME` record pointing to `akshatasawant9699.github.io`.
3. Create `public/CNAME` containing just the domain, e.g. `example.dev`.
4. In `astro.config.mjs`, set `site: 'https://example.dev'` (this updates canonical URLs, the sitemap and RSS).
5. Push. Then in **Settings → Pages**, enter the custom domain and tick **Enforce HTTPS** once the certificate is issued.
6. Recommended: verify the domain under your GitHub account's **Settings → Pages** to prevent takeovers.

## Quality

Lighthouse (mobile, local production build) scores 100 for Performance, Accessibility, Best Practices and SEO on every main page. To re-run:

```sh
npm run build && npm run preview -- --port 4400
npx lighthouse http://localhost:4400/ --form-factor=mobile --view
```

Accessibility: semantic landmarks, a skip link, visible focus outlines, alt text, labelled form fields and icon links, AA contrast in light and dark themes (dark follows the system setting), and reduced-motion support.

## Privacy

No analytics or cookies. Videos use `youtube-nocookie.com` and load only when clicked. Contact is through LinkedIn; no email address or phone number is published.
