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
// Meetup and community-session recordings live on /talks, not /videos.
export const isSpeakingVideo = (v: CollectionEntry<'videos'>) => /meetup/i.test(v.data.series ?? '');
export const youtubeIdOf = (url?: string) =>
  url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)?.[1];

export async function getTalks() {
  return (await getCollection('talks')).sort(byDateDesc);
}
/** Upcoming talks (soonest first) and past talks (newest first), relative to build time. */
export async function getTalksSplit() {
  const now = Date.now();
  const all = await getTalks();
  return {
    upcoming: all.filter((t) => t.data.date.valueOf() >= now).reverse(),
    past: all.filter((t) => t.data.date.valueOf() < now),
  };
}
export async function getProjects() {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

export function readingTime(text: string = ''): string {
  const words = text.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

const fmt = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
const fmtMonth = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', timeZone: 'UTC' });
export const formatDate = (d: Date) => fmt.format(d);
export const formatMonth = (d: Date) => fmtMonth.format(d);
const fmtFull = new Intl.DateTimeFormat('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
export const formatFullDate = (d: Date) => fmtFull.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
