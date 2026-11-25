// Site-wide settings. Edit this file to change your name, links, timeline or newsletter form.

export const SITE = {
  name: 'Akshata Sawant',
  title: 'Akshata Sawant',
  positioning: 'Developer advocate, author, and builder of eval-tested AI agents.',
  description:
    'Akshata Sawant is a Lead Developer Advocate at Salesforce in London, co-author of MuleSoft for Salesforce Developers, and a builder of eval-tested AI agents.',
  location: 'London, UK',
  locale: 'en_GB',
  // Default social image (1200x630) in /public.
  ogImage: '/og-default.png',
};

export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/akshatasawant02/',
  github: 'https://github.com/akshatasawant9699',
  youtube: 'https://www.youtube.com/@sawantakshata02',
  youtubePlaylists: 'https://www.youtube.com/@sawantakshata02/playlists',
  salesforceDevs: 'https://www.youtube.com/@SalesforceDevs',
  rss: '/rss.xml',
};

// YouTube feeds read at build time (no API key needed). New uploads by `channelName`
// in these public playlists are added to /videos automatically; CI rebuilds daily.
// Videos already listed in src/data/videos.yaml are not duplicated.
export const YOUTUBE = {
  channelName: 'Akshata Sawant',
  playlists: [
    'PLH2RLGuvkSSVzbzI5aqrBq41Qdjj3C8rZ', // Get Started with AI
    'PLH2RLGuvkSSVZCmXF4eDjTYPrscyCuAhJ', // Data Cloud
    'PLH2RLGuvkSSUEl6Q4tAJchoK8JYCm4CkX', // Global Technical Conference playlist
    'PLH2RLGuvkSSVfNA0RITZ7Ge_1W0UvrMxu', // Podcasts, Webinars and Meetups
  ],
};

export const BOOK = {
  title: 'MuleSoft for Salesforce Developers',
  subtitle: 'Co-authored, now in its second edition',
  editions: [
    { label: '2nd edition', url: 'https://www.amazon.co.uk/dp/B0DMFKFC5T' },
    { label: '1st edition', url: 'https://www.amazon.co.uk/dp/B0B1V8VYVJ' },
  ],
};

// Newsletter / book sign-up form.
// PLACEHOLDER: replace `action` with your provider's form endpoint
// (e.g. Buttondown: https://buttondown.com/api/emails/embed-subscribe/<username>).
// While it is empty, the form is shown but disabled with a "coming soon" note.
export const NEWSLETTER = {
  action: '',
  method: 'post',
  emailField: 'email',
};

export const NAV = [
  { href: '/writing/', label: 'Writing' },
  { href: '/videos/', label: 'Videos' },
  { href: '/talks/', label: 'Talks' },
  { href: '/projects/', label: 'Projects' },
  { href: '/book/', label: 'Book' },
  { href: '/about/', label: 'About' },
];

// Career timeline, newest first.
export const TIMELINE = [
  { when: '2023 – now', role: 'Lead Developer Advocate', org: 'Salesforce', place: 'London' },
  { when: '2022', role: 'Developer Advocate', org: 'Salesforce', place: 'London' },
  { when: '2021 – 2022', role: 'Senior Software Engineer', org: 'EPAM Systems', place: 'London' },
  { when: '2019 – 2021', role: 'Associate Solution Architect', org: 'Apisero', place: 'India' },
  { when: '2017 – 2019', role: 'Senior Software Analyst', org: 'Capgemini', place: 'India' },
  { when: '2013 – 2017', role: 'BE, Information Technology', org: 'Xavier Institute of Engineering', place: 'Mumbai' },
];

// Awards and recognition, newest first. Shown on /about.
export const RECOGNITION = [
  {
    when: '2024',
    title: 'Rising Star of the Year',
    org: 'Digital Revolution Awards 2024',
    note: 'with Lewis Baybutt',
    url: 'https://www.youtube.com/watch?v=v2OOHr0qSGs',
  },
  { when: '2022', title: 'MuleSoft Go To Market Champion', org: 'MuleSoft' },
  { when: '2020 – 2022', title: 'MuleSoft Ambassador', org: 'MuleSoft' },
  { when: '2019 – now', title: 'MuleSoft Meetup Leader, Mumbai and London', org: 'MuleSoft Community' },
];

export const CERTIFICATIONS = [
  'Salesforce Certified AI Associate',
  'MuleSoft Certified Integration Architect',
  'MuleSoft Certified Developer, Level 1',
  'MuleSoft Certified Developer, API Design Associate',
  'MuleSoft Certified Developer, Integration and API Associate',
  'Pragmatic Institute PMC Level I',
  'The Oxford AI Summit 2025: Autonomous Agents, University of Oxford',
];
