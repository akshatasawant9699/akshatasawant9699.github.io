// schema.org structured data, so search engines connect the site, profiles and book to one person.
import { SITE, LINKS, BOOK, TIMELINE, CERTIFICATIONS } from '../site.config';

export function personJsonLd(site: URL) {
  const id = new URL('/#person', site).href;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': id,
        name: SITE.name,
        url: new URL('/', site).href,
        image: new URL('/press/akshata-sawant-headshot.jpg', site).href,
        jobTitle: TIMELINE[0].role,
        worksFor: { '@type': 'Organization', name: TIMELINE[0].org },
        address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
        description: SITE.description,
        knowsAbout: ['AI agents', 'Model Context Protocol', 'Agentforce', 'Salesforce Data Cloud', 'MuleSoft', 'API security'],
        sameAs: [LINKS.linkedin, LINKS.github, LINKS.youtube],
        hasCredential: CERTIFICATIONS.filter((c) => c.url).map((c) => ({
          '@type': 'EducationalOccupationalCredential',
          name: c.name,
          credentialCategory: 'certification',
          url: c.url,
          ...(c.issuer && { recognizedBy: { '@type': 'Organization', name: c.issuer } }),
        })),
      },
      {
        '@type': 'Book',
        name: BOOK.title,
        author: { '@id': id },
        url: BOOK.editions[0].url,
      },
      {
        '@type': 'WebSite',
        name: SITE.name,
        url: new URL('/', site).href,
        author: { '@id': id },
      },
    ],
  };
  return JSON.stringify(data);
}
