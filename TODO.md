# To-do

Things to pick up next. Tick them off (or delete them) as they're done.

## Needs you (a few minutes each)

- [ ] **Turn on the contact form.** At https://web3forms.com, enter your Gmail address and click *Create Access Key*. Send the key to Claude (or paste it into `CONTACT.web3formsKey` in `src/site.config.ts`), deploy, then send yourself a test message from `/contact`.
- [ ] **Bing Webmaster Tools.** At https://www.bing.com/webmasters, choose *Import from Google Search Console* and select `akshatasawant.dev`.
- [ ] **Search Console.** Check that the sitemap status is *Success* (about 11 pages), use *URL inspection* → *Request indexing* for `/`, `/talks/`, `/about/` and `/speaker-kit/`, and remove the old failed `https://akshatasawant9699.github.io` property.
- [ ] **LinkedIn.** Add `https://akshatasawant.dev` under *Contact info* → *Website*.
- [ ] **Check the speaker kit bios** at `/speaker-kit/`. They're written without pronouns; add yours if you want them used.

## Needs information from you

- [ ] **Slides for talks.** Send Speaker Deck, SlideShare or Google Slides links; they go in `slides:` in `src/data/talks.yaml`.
- [ ] **Testimonials.** Collect 2–3 short quotes from event organisers or attendees (with name, role and permission) for the speaker kit or home page.
- [ ] **Packt workshop date.** LinkedIn says 26 Nov, 10 AM EST; Airmeet says 10 Dec, 3 PM GMT. The site uses the Airmeet date.
- [ ] **Digital Revolution Awards 2024.** Confirm whether you won or were a finalist for Rising Star of the Year (the site says "recognised in the category").
- [ ] **Missing talks and videos.** Details of the Bucharest conference talk, and links to older LinkedIn videos.

## Bigger items

- [ ] **Original writing on this site.** Publish some posts here (in `src/content/posts/`), not only on other sites, so search engines credit akshatasawant.dev. Summaries or companion notes for blog posts on other sites work well.
- [ ] **Newsletter.** Create a free Buttondown account and put its form URL in `NEWSLETTER.action` in `src/site.config.ts`.
- [ ] **Visit counts (optional).** Cloudflare Web Analytics is free and uses no cookies. It means changing the footer's "no tracking" note.
- [x] **GitHub profile README.** Add a link to akshatasawant.dev. (Done 26 Nov 2026: website badge at the top, plus the Claude certification.)
