// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// When a custom domain is added, change `site` (and public/CNAME). See README.
export default defineConfig({
  site: 'https://akshatasawant9699.github.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
