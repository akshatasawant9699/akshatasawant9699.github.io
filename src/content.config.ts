import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// Writing. Local posts get a page at /writing/<file-name>/.
// Posts with `externalUrl` (e.g. Salesforce Developers Blog) are listed and link out.
const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    externalUrl: z.url().optional(),
    publication: z.string().optional(),
    placeholder: z.boolean().default(false),
  }),
});

// Videos. source "own" = embeddable from my channel (click-to-load);
// "external" = official copy elsewhere, so we link out instead of embedding.
const videos = defineCollection({
  loader: file('./src/data/videos.yaml'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/),
    source: z.enum(['own', 'external']),
    channel: z.string(),
    series: z.string().optional(),
    description: z.string().optional(),
    placeholder: z.boolean().default(false),
  }),
});

const talks = defineCollection({
  loader: file('./src/data/talks.yaml'),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    recording: z.url().optional(),
    slides: z.url().optional(),
    description: z.string().optional(),
    placeholder: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: file('./src/data/projects.yaml'),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.url(),
    repo: z.url().optional(),
    stack: z.array(z.string()).default([]),
    status: z.enum(['building', 'active', 'archived']).default('active'),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { posts, videos, talks, projects };
