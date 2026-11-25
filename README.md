# akshatasawant.dev

Live at **https://akshatasawant.dev** (domain registered with Cloudflare; DNS on Cloudflare; hosted on GitHub Pages from this repo).

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

**A post published elsewhere** (e.g. the Salesforce Developers Blog or MuleSoft Blog): add `externalUrl:` and `publication:` and leave the body empty. It's listed in Writing and RSS and links out. See the `sf-*.md` and `mb-*.md` files.

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

Use `source: external` for videos made for Salesforce or MuleSoft, or guest appearances on other channels, so they link to the official copy. `series` sets the group heading on /videos.

**Automatic:** at build time the site also reads the RSS feeds of the public playlists listed in `YOUTUBE.playlists` (`src/site.config.ts`) and adds any video uploaded by your channel that isn't already in `videos.yaml`, grouped by playlist. The workflow rebuilds daily at 06:17 UTC, so new uploads show up within a day. To add a playlist, paste its ID (the `list=` part of the URL). To hide or rename an auto-added video, add it to `videos.yaml` (curated entries win). If YouTube is unreachable, the build continues with `videos.yaml` only.

### A talk, workshop or project

For an upcoming event, give `date` a full time (e.g. `2026-12-10T15:00:00Z`) and add a `register:` link: it shows under **Upcoming** on the home page and /talks until it has passed, then moves to past talks on the next daily rebuild. Add `recording:` afterwards.

Add an entry to `src/data/talks.yaml` or `src/data/projects.yaml`, following the existing entries. Schemas are in `src/content.config.ts`.

### Awards and certifications

Edit `RECOGNITION` and `CERTIFICATIONS` in `src/site.config.ts`. They're shown on /about.

### Content inventory (for a spreadsheet)

Every build publishes [`/content-inventory.csv`](https://akshatasawant.dev/content-inventory.csv): one row per post, video, talk, project, award and certification on the site, including auto-added YouTube videos. In Google Sheets, `=IMPORTDATA("https://akshatasawant.dev/content-inventory.csv")` gives a tab that stays current.

Posts can still have `tags:` (used in the RSS feed), but tags aren't shown on the site.

## Contact form

`/contact` has a form that emails messages to you through [Web3Forms](https://web3forms.com) (free, 250 messages a month). Your email address is never published: it's linked to an access key on Web3Forms' side.

1. Go to https://web3forms.com, enter your email address and click **Create Access Key**. The key arrives by email.
2. Paste it into `CONTACT.web3formsKey` in `src/site.config.ts` and push. (The key is safe to publish; it can only send messages to your inbox.)

While the key is empty, `/contact` shows a LinkedIn link instead of the form. After sending, visitors land on `/contact/thanks/`. A hidden `botcheck` field filters simple spam bots.

## Newsletter / book sign-up form

The form posts to the URL in `NEWSLETTER.action` in `src/site.config.ts`. While that's empty, no form is shown; visitors see a "Follow me on LinkedIn" prompt instead.

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

## Search engines

1. [Google Search Console](https://search.google.com/search-console): **Add property → URL prefix** → enter the site URL → choose **HTML tag**, and copy the `content="…"` value into `VERIFICATION.google` in `src/site.config.ts`. Push, wait for the deploy, then click **Verify**.
2. In Search Console, **Sitemaps** → submit `sitemap-index.xml`.
3. [Bing Webmaster Tools](https://www.bing.com/webmasters): sign in and choose **Import from Google Search Console** (it imports the site and sitemap). Bing also feeds DuckDuckGo, Yahoo and ChatGPT search.

If you move to a custom domain, add the new domain as a **Domain** property (verified by a DNS TXT record) and use Search Console's **Change of address** tool.

## Custom domain (akshatasawant.dev)

The site uses `akshatasawant.dev` (`public/CNAME` and `site` in `astro.config.mjs`). DNS records in Cloudflare must be **DNS only** (grey cloud), not proxied, so GitHub can issue the HTTPS certificate. The steps below are how it was set up, for reference.

### Setup steps

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
