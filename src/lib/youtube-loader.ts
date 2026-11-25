import type { Loader } from 'astro/loaders';
import { file } from 'astro/loaders';

interface Options {
  /** YAML/JSON file with hand-curated videos (always wins over feed data). */
  path: string;
  playlists: string[];
  /** Only feed items uploaded by this channel are added. */
  channelName: string;
}

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const pick = (xml: string, re: RegExp) => decode(xml.match(re)?.[1]?.trim() ?? '');

function shortDescription(text: string): string | undefined {
  const first = text.split(/\n+/).find((l) => l.trim())?.trim();
  if (!first) return undefined;
  if (first.length <= 160) return first;
  const cut = first.slice(0, 160);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

/**
 * Loads videos from a curated file, then adds new uploads found in public
 * YouTube playlist RSS feeds. If YouTube can't be reached, the build continues
 * with the curated list only.
 */
export function youtubeVideosLoader(opts: Options): Loader {
  const base = file(opts.path);
  return {
    name: 'youtube-videos',
    async load(ctx) {
      await base.load(ctx);
      const known = new Set(ctx.store.values().map((e) => String(e.data.youtubeId)));
      let added = 0;
      for (const id of opts.playlists) {
        try {
          const res = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`, {
            signal: AbortSignal.timeout(10_000),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const xml = await res.text();
          const series = pick(xml, /<title>([^<]*)<\/title>/);
          for (const entry of xml.split('<entry>').slice(1)) {
            const youtubeId = pick(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/);
            const author = pick(entry, /<author>\s*<name>([^<]+)<\/name>/);
            if (!youtubeId || known.has(youtubeId) || author !== opts.channelName) continue;
            const raw = {
              title: pick(entry, /<title>([^<]*)<\/title>/),
              date: pick(entry, /<published>([^<]+)<\/published>/),
              youtubeId,
              source: 'own',
              channel: author,
              series,
              description: shortDescription(pick(entry, /<media:description>([\s\S]*?)<\/media:description>/)),
            };
            const entryId = `yt-${youtubeId}`;
            const data = await ctx.parseData({ id: entryId, data: raw });
            ctx.store.set({ id: entryId, data });
            known.add(youtubeId);
            added++;
          }
        } catch (err) {
          ctx.logger.warn(`YouTube playlist ${id} skipped: ${(err as Error).message}`);
        }
      }
      ctx.logger.info(`Added ${added} video(s) from YouTube feeds`);
    },
  };
}
