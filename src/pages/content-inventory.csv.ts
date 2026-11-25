// Every resource shown on the site, as CSV (generated at build time, so it includes
// videos added automatically from YouTube). Import into Google Sheets with:
//   =IMPORTDATA("https://akshatasawant.dev/content-inventory.csv")
import { getPosts, postHref, getVideos, getTalks, getProjects, isoDate, isSpeakingVideo } from '../lib/content';
import { BOOK, RECOGNITION, CERTIFICATIONS, LINKEDIN_VIDEOS } from '../site.config';

const HEADER = ['Type', 'Title', 'Date', 'Publication / channel / event', 'URL', 'Shown on', 'Source file', 'Notes'];

function csv(rows: string[][]) {
  const cell = (v: string) => (/[",\n]/.test(v) ? `"${v.replaceAll('"', '""')}"` : v);
  return rows.map((r) => r.map((v) => cell(v ?? '')).join(',')).join('\n') + '\n';
}

export async function GET() {
  const site = import.meta.env.SITE.replace(/\/$/, '');
  const rows: string[][] = [];

  for (const p of await getPosts()) {
    const href = postHref(p);
    rows.push([
      'Blog post',
      p.data.title,
      isoDate(p.data.date),
      p.data.publication ?? 'This site',
      href.startsWith('http') ? href : site + href,
      '/writing/',
      p.filePath ?? `src/content/posts/${p.id}`,
      [p.data.tags.join(', '), p.data.placeholder ? 'PLACEHOLDER' : ''].filter(Boolean).join(' · '),
    ]);
  }

  for (const v of await getVideos()) {
    const auto = v.id.startsWith('yt-');
    rows.push([
      v.data.source === 'own' ? 'Video (my channel)' : 'Video / livestream (official copy)',
      v.data.title,
      isoDate(v.data.date),
      v.data.channel,
      `https://www.youtube.com/watch?v=${v.data.youtubeId}`,
      isSpeakingVideo(v) ? '/talks/ (Meetups and community sessions)' : `/videos/ (${v.data.series ?? 'More videos'})`,
      auto ? 'Auto-added from YouTube playlist' : 'src/data/videos.yaml',
      '',
    ]);
  }

  for (const v of LINKEDIN_VIDEOS) {
    rows.push(['Video (LinkedIn)', v.title, v.date, 'LinkedIn', v.url, '/videos/ (On LinkedIn)', 'src/site.config.ts (LINKEDIN_VIDEOS)', '']);
  }

  for (const t of await getTalks()) {
    rows.push([
      `Talk (${t.data.kind})`,
      t.data.title,
      isoDate(t.data.date),
      t.data.event,
      t.data.recording ?? t.data.register ?? t.data.slides ?? '',
      '/talks/',
      'src/data/talks.yaml',
      [t.data.location, t.data.register && !t.data.recording ? 'Registration link' : ''].filter(Boolean).join(' · '),
    ]);
  }

  for (const p of await getProjects()) {
    rows.push(['Project', p.data.name, '', 'GitHub', p.data.url, '/projects/', 'src/data/projects.yaml', p.data.status]);
  }

  for (const e of BOOK.editions) {
    rows.push(['Book', `${BOOK.title} (${e.label})`, '', 'Amazon', e.url, '/book/', 'src/site.config.ts (BOOK)', '']);
  }

  for (const r of RECOGNITION) {
    rows.push(['Award / recognition', r.title, r.when, r.org, r.url ?? '', '/about/', 'src/site.config.ts (RECOGNITION)', r.note ?? '']);
  }

  for (const c of CERTIFICATIONS) {
    rows.push(['Certification', c, '', '', '', '/about/', 'src/site.config.ts (CERTIFICATIONS)', '']);
  }

  return new Response(csv([HEADER, ...rows]), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
}
