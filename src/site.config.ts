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
  { href: '/contact/', label: 'Contact' },
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

// Certifications, newest first. Shown on /about. Add `url` (e.g. a Credly badge) to link the name;
// linked ones are also listed as credentials in the Person structured data.
export const CERTIFICATIONS: { name: string; issuer?: string; when?: string; url?: string }[] = [
  {
    name: 'Claude Certified Associate – Foundations',
    issuer: 'Anthropic',
    when: '2026',
    url: 'https://www.credly.com/badges/a8c5eb32-151c-4c69-9182-ce10b6c5b3ac/public_url',
  },
  { name: 'Salesforce Certified AI Associate' },
  { name: 'MuleSoft Certified Integration Architect' },
  { name: 'MuleSoft Certified Developer, Level 1' },
  { name: 'MuleSoft Certified Developer, API Design Associate' },
  { name: 'MuleSoft Certified Developer, Integration and API Associate' },
  { name: 'Pragmatic Institute PMC Level I' },
  { name: 'The Oxford AI Summit 2025: Autonomous Agents, University of Oxford' },
];

// Videos published natively on LinkedIn (listed on /videos with a link to the post), newest first.
export const LINKEDIN_VIDEOS = [
  {
    title: 'Headless Experience Layer (HXL) in Slackbot',
    date: '2026-11-17',
    url: 'https://www.linkedin.com/posts/akshatasawant02_hxl-agentforce-slack-activity-7528421469391917058-H3oN',
    description: 'A technical walkthrough: MCP server connections and tool permissions for HXL widgets in Slackbot.',
  },
  {
    title: 'Understand the fundamentals of HXL with the HXL Playground',
    date: '2026-11-11',
    url: 'https://www.linkedin.com/posts/akshatasawant02_hxl-agentforce-salesforce-activity-7526292319546015744-6r32',
    description: 'A tour of the HXL Playground and its components.',
  },
];

// Search engine ownership checks. Paste only the content="..." value of each meta tag.
// Google Search Console: Add property -> URL prefix -> HTML tag. Bing Webmaster Tools: HTML Meta Tag
// (or skip this and use Bing's "Import from Google Search Console").
export const VERIFICATION = {
  google: 'ehqeR1Z60989OZCQcOeyzu8pXROtan8ZMaZgrsfNPv0',
  bing: '',
};

// Contact form (/contact). Messages are delivered by Web3Forms (https://web3forms.com) to the
// inbox linked to this access key; the email address itself never appears on the site or in this repo.
// The key is safe to publish (it can only send messages to that inbox). Empty = show a LinkedIn link instead.
export const CONTACT = {
  web3formsKey: 'caac8723-5f91-4ff8-bf7b-64beb6f91070',
};

// Events shown in the "Spoken at" line (home page and /speaker-kit). Text only, no logos.
export const SPOKEN_AT = [
  'Dreamforce', 'TDX', 'Devoxx UK', 'Apidays', 'GopherCon UK', 'DevOpsDays Geneva',
  "London's Calling", 'Oxford AI Summit', 'Conf42', 'Women Who Code',
];

// Speaker kit (/speaker-kit). Bios are written without pronouns; edit freely.
export const SPEAKER = {
  shortBio:
    'Akshata Sawant is a Lead Developer Advocate at Salesforce in London, helping developers build secure, AI-ready integrations and agents with Agentforce, MCP, Data Cloud and MuleSoft. Akshata co-authored MuleSoft for Salesforce Developers and has led MuleSoft meetups in Mumbai and London for more than seven years.',
  longBio: [
    'Akshata Sawant is a Lead Developer Advocate at Salesforce, based in London, who helps developers and architects build secure, AI-ready integrations and agents. Akshata works across Agentforce, MCP, the Headless Experience Layer, Data Cloud Document AI and MuleSoft, and builds demos for keynotes at Dreamforce and TDX.',
    'Before Salesforce, Akshata spent several years on integration and API projects at EPAM Systems, Apisero and Capgemini. Akshata is the co-author of MuleSoft for Salesforce Developers, now in its second edition, was recognised in the Rising Star of the Year category at the Digital Revolution Awards 2024, was a MuleSoft Ambassador from 2020 to 2022, and has led MuleSoft meetups in Mumbai and London for more than seven years.',
  ],
  topics: [
    { title: 'Building and testing AI agents', detail: 'Agentforce, the Agentforce Python SDK, connected agents and evaluating agents before they ship.' },
    { title: 'MCP and AI-assisted development', detail: 'MCP servers, the Headless Experience Layer and building Salesforce apps with AI coding tools such as Claude Code.' },
    { title: 'Data Cloud and Document AI', detail: 'Data Cloud APIs, and turning unstructured documents into structured data for agents and integrations.' },
    { title: 'API security and integration with MuleSoft', detail: 'Zero Trust security, API policies, governance and reuse, and MuleSoft for Salesforce developers.' },
  ],
  formats: ['Conference talks', 'Hands-on workshops', 'Webinars and livestreams', 'Podcasts and interviews', 'Meetups'],
};
