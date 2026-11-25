// Plain-text bios for organisers to paste into event pages.
import { SITE, SPEAKER } from '../../site.config';

export function GET() {
  const text = `${SITE.name}: speaker bios\n\nSHORT BIO\n\n${SPEAKER.shortBio}\n\nLONG BIO\n\n${SPEAKER.longBio.join('\n\n')}\n\nHeadshot: ${new URL('/press/akshata-sawant-headshot.jpg', import.meta.env.SITE)}\n`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
