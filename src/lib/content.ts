import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

const byDateDesc = <T extends { data: { date: Date } }>(a: T, b: T) => b.data.date.valueOf() - a.data.date.valueOf();

/** All published posts, newest first. Drafts show in `npm run dev` only, never in a build. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort(byDateDesc);
}

/** Posts that have their own page on this site (not external). */
export async function getLocalPosts(): Promise<Post[]> {
  return (await getPosts()).filter((p) => !p.data.externalUrl);
}

export const postHref = (p: Post) => p.data.externalUrl ?? `/writing/${p.id}/`;

export async function getVideos() {
  return (await getCollection('videos')).sort(byDateDesc);
}
export async function getTalks() {
  return (await getCollection('talks')).sort(byDateDesc);
}
export async function getProjects() {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

export const tagSlug = (tag: string) =>
  tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export async function getAllTags() {
  const counts = new Map<string, number>();
  for (const p of await getPosts()) for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function readingTime(text: string = ''): string {
  const words = text.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

const fmt = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
const fmtMonth = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', timeZone: 'UTC' });
export const formatDate = (d: Date) => fmt.format(d);
export const formatMonth = (d: Date) => fmtMonth.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
