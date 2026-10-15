import { reactive } from 'vue'

// All copy for the site lives here. Edit text without touching layout.
//
// Biographical claims carry source ids that resolve to `sources` below, so
// every fact on the page can link out to the public record it came from.

const siteSource = {
  name: 'Landon Mascareñaz',
  honorific: 'Dr. Landon Mascareñaz',
  roles: [
    'Founding CEO, Courageous Colorado',
    'Co-author, The Open System (Harvard Education Press)',
    'Fmr. Chair, Colorado State Board for Community Colleges and Occupational Education',
  ],
  travelsFrom: 'Denver, Colorado',
  email: 'bookings@openfuturesagency.com',
  emailLabel: 'bookings@openfuturesagency.com',
  agency: 'Open Futures',
  agencyUrl: 'https://openfuturesagency.com',
  substack: {
    label: 'Open Hearts & Open Democracy',
    url: 'https://openheartsopendemocracy.substack.com',
  },
  portrait: '/img/portrait-c.jpg',
  portraitAlt: 'Portrait of Dr. Landon Mascareñaz.',
}

const heroSource = {
  lines: ['Institutions', 'must stay', 'open', 'to the people', 'they serve.'],
  sub: 'Most of them do not. Twenty years inside the ones that tried: a first-grade classroom on the Navajo Nation, a state community college board, sixty rural districts, and a book about why organizations stop listening.',
}

// ---------- sources ----------

export interface Source {
  id: string
  title: string
  outlet: string
  when: string
  url: string
  // A page capture under /img, set once scripts/press-shots.mjs has run.
  image?: string
}

const sourcesSource: Source[] = [
  {
    id: 'cccs-bio',
    title: 'Dr. Landon Mascareñaz, State Board profile',
    outlet: 'Colorado Community College System',
    when: '',
    url: 'https://cccs.edu/about/governance/dr-landon-mascarenaz/',
  },
  {
    id: 'cccs-chair',
    title: 'State Board welcomes Dr. Landon Mascareñaz as new chair',
    outlet: 'Colorado Community College System',
    when: 'Aug 2023',
    url: 'https://cccs.edu/cccs-news/state-board-welcomes-dr-landon-mascarenaz-as-new-chair/',
    image: 'press/cccs-chair',
  },
  {
    id: 'cc-staff',
    title: 'Staff: Landon Mascareñaz, Founding Chief Executive Officer',
    outlet: 'Courageous Colorado',
    when: '',
    url: 'https://www.courageouscolorado.org/staff',
  },
  {
    id: 'copolitics',
    title: 'Q&A with Courageous Colorado’s Landon Mascareñaz: nonprofit aims to bring bravery back to politics',
    outlet: 'Colorado Politics, Ernest Luning',
    when: 'Oct 2025',
    url: 'https://www.coloradopolitics.com/2025/10/17/qa-with-courageous-colorados-landon-mascare%C3%B1az-nonprofit-aims-to-bring-bravery-back-to-politics/',
  },
  {
    id: 'unite',
    title: 'Opening Colorado’s primaries: how Landon Mascareñaz is building a Colorado-first coalition for reform',
    outlet: 'Unite America',
    when: 'Jan 2026',
    url: 'https://www.uniteamerica.org/articles/opening-colorados-primaries-how-landon-mascarenaz-is-building-a-colorado-first-coalition-for-reform',
    image: 'press/unite',
  },
  {
    id: 'hep',
    title: 'The Open System: Redesigning Education and Reigniting Democracy',
    outlet: 'Harvard Education Press',
    when: '2023',
    url: 'https://hep.gse.harvard.edu/9781682538135/the-open-system/',
  },
  {
    id: 'osi',
    title: 'Mascareñaz bio and archive',
    outlet: 'The Open System Institute',
    when: '',
    url: 'https://www.theopensystem.org/mascarenaz-bio-archive',
  },
  {
    id: 'pahara',
    title: 'Fellow profile: Landon Mascareñaz',
    outlet: 'Pahara Institute',
    when: '',
    url: 'https://www.pahara.org/fellow/landon-mascare%C3%B1az',
  },
  {
    id: 'cei',
    title: 'Mascareñaz to join the Colorado Education Initiative team',
    outlet: 'Colorado Education Initiative',
    when: 'Jun 2019',
    url: 'https://www.coloradoedinitiative.org/mascarenaz-to-join-the-colorado-education-initiative-team/',
    image: 'press/cei',
  },
  {
    id: 'hti',
    title: 'Homegrown Talent Initiative',
    outlet: 'Colorado Succeeds',
    when: '',
    url: 'https://coloradosucceeds.org/resource/homegrown-talent-initiative/',
  },
  {
    id: 'the74',
    title: 'First person: how Colorado’s Homegrown Talent Initiative is boosting the “educonomy” in 8 rural communities',
    outlet: 'The 74',
    when: '',
    url: 'https://www.the74million.org/article/first-person-how-colorados-homegrown-talent-initiative-is-boosting-the-educonomy-in-8-rural-communities-to-help-students-succeed/',
    image: 'press/the74',
  },
  {
    id: 'emergent',
    title: 'About Emergent Campus Trinidad',
    outlet: 'Emergent Campus',
    when: '',
    url: 'https://emergentcampus.org/trinidad-campus/',
  },
  {
    id: 'ctn',
    title: 'Landon Mascareñaz, Convener and Chair',
    outlet: 'Colorado Trustee Network',
    when: '',
    url: 'https://colorado-trustee-network.squarespace.com/convening-committee-members/landon-mascarenaz',
  },
  {
    id: 'wpr',
    title: 'Contributor page: Landon Mascareñaz',
    outlet: 'Wisconsin Public Radio',
    when: '',
    url: 'https://www.wpr.org/person/landon-mascarenaz',
  },
  {
    id: 'linkedin',
    title: 'Landon Mascareñaz',
    outlet: 'LinkedIn',
    when: '',
    url: 'https://www.linkedin.com/in/landonmascarenaz',
  },
  {
    id: 'obama',
    title: 'USA Leaders 2026–2027: Landon Mascareñaz',
    outlet: 'Obama Foundation',
    when: '2026',
    url: 'https://www.obama.org/programs/leaders/usa/2026-2027/landon-mascarenaz/',
    image: 'press/obama',
  },
  {
    id: 'cllaro',
    title: 'Roger Cisneros Public Policy Award, 31st Bernie Valdez Awards',
    outlet: 'Open Hearts & Open Democracy',
    when: 'Sep 2026',
    url: 'https://openheartsopendemocracy.substack.com/p/wednesday-september-16',
    image: 'press/cllaro',
  },
  {
    id: 'lion',
    title: 'Executive Leadership Academy, faculty',
    outlet: 'Leadership Institute of Nevada',
    when: '',
    url: 'https://www.lionv.org/executive-leadership-academy',
  },
  {
    id: 'amacad',
    title: 'Our Common Purpose',
    outlet: 'American Academy of Arts & Sciences',
    when: '',
    url: 'https://www.amacad.org/ourcommonpurpose',
  },
  {
    id: 'substack',
    title: 'Open Hearts & Open Democracy, newsletter',
    outlet: 'Substack',
    when: '',
    url: 'https://openheartsopendemocracy.substack.com',
  },
]

// ---------- values ----------
// Six words, in Landon's own wording. The three he and Joze both landed on
// (truth, stewardship, abundance) carry `shared`, and each pair lives
// behind one of the three doors.

export type DoorId = 'mobility' | 'democracy' | 'leadership'

export interface Value {
  word: string
  body: string
  shared: boolean
  door: DoorId
}

const valuesSource: Value[] = [
  { word: 'Openness', body: 'Keep your heart, mind, and path open. Seek perspectives that challenge you. Hold strong convictions while remaining open to new possibilities.', shared: false, door: 'democracy' },
  { word: 'Truth', body: 'Begin with shared reality. Face what is true, test assumptions, and pursue clarity, even when it complicates the story you want to tell.', shared: true, door: 'democracy' },
  { word: 'Agency', body: 'Shape what comes next. Give people the freedom and responsibility to choose, create, contribute, and build, not simply participate in someone else’s vision.', shared: false, door: 'leadership' },
  { word: 'Courage', body: 'Move toward the breakthrough. Question inherited assumptions, cross boundaries, enter difficult conversations, and create what does not yet exist.', shared: false, door: 'leadership' },
  { word: 'Abundance', body: 'Believe more is possible together. Share ideas, relationships, platforms, and opportunities. Build partnerships that make everyone more capable.', shared: true, door: 'mobility' },
  { word: 'Stewardship', body: 'Leave things more open than you found them. Use influence responsibly, lift up others, strengthen communities, and create opportunity for what comes next.', shared: true, door: 'mobility' },
]

export const valuesFor = (door: DoorId) => values.filter((v) => v.door === door)

// DRAFT for Landon and Joze to sign off. Built from the three shared values.
const valuesStatementSource =
  'Begin with what is true. Leave things more open than you found them. Believe more is possible together than alone. Truth, stewardship and abundance hold the rest of the work in place: they are what a listening tour, a rebuilt strategic plan and a cross-partisan coalition have in common.'

// Honors and appointments, each with its record.
const honorsSource: [string, string, string][] = [
  ['Obama Foundation', 'USA Leader, 2026 to 2027 cohort', 'obama'],
  ['CLLARO', 'Roger Cisneros Public Policy Award, 2026', 'cllaro'],
  ['American Academy of Arts & Sciences', 'Our Common Purpose council', 'amacad'],
  ['Leadership Institute of Nevada', 'Executive Leadership Academy faculty', 'lion'],
]

export const sourceById = (id: string) => sources.find((s) => s.id === id)

// Articles about him. A talk names the one that covers its ground through
// `press`, and the talk page shows that article's capture.
export const sourceIndex = (id: string) => sources.findIndex((s) => s.id === id) + 1

const clientsSource = [
  'Colorado Mountain College',
  'Colorado Community College System',
  'ECMC Foundation',
  'City of Raton',
  'ALAS',
  'Public Charter Schools of New Mexico',
  'Harvard Graduate School of Education',
  'Yale School of Management',
]

export interface Door {
  id: DoorId
  n: string
  title: string
  short: string
  body: string
  audiences: string[]
  image: string
  imageAlt: string
}

// Order matters: it is the order of the doors on the home spread and the
// work page. `n` is derived from position; everything else references `id`.
const doorList: Omit<Door, 'n'>[] = [
  {
    id: 'democracy',
    title: 'Democracy & Civic Renewal',
    short: 'Democracy',
    body: 'Trust is not won at the ballot box. It is decided by whether the schools, colleges and city halls people actually deal with turn out to be responsive.',
    audiences: ['Foundations', 'Civic organizations', 'Public affairs forums'],
    image: '/img/room-c.jpg',
    imageAlt: 'A community meeting seen from the back of the room, a slide about political crisis on the screen.',
  },
  {
    id: 'mobility',
    title: 'Economic Mobility & Regional Prosperity',
    short: 'Mobility',
    body: 'Community colleges as engines of mobility, regional talent ecosystems, and what it takes to align education, employers and communities around one goal.',
    audiences: ['Higher education', 'Workforce boards', 'Economic development'],
    image: '/img/rural-c.jpg',
    imageAlt: 'A rural Colorado classroom, students laughing as a teacher reads to them.',
  },
  {
    id: 'leadership',
    title: 'Leadership & Latino America',
    short: 'Leadership',
    body: 'Representation, belonging, and what a leader actually does with a seat once they have one. From a Mexican-American leader whose family roots run through Colorado and New Mexico for generations.',
    audiences: ['Latino organizations', 'Universities & HSIs', 'Fellowship cohorts'],
    image: '/img/cafe-c.jpg',
    imageAlt: 'Landon Mascareñaz at a café table by a winter window, looking out at the street.',
  },
]

const doorsSource: Door[] = doorList.map((d, i) => ({ ...d, n: String(i + 1).padStart(2, '0') }))

export const doorById = (id: DoorId) => doors.find((d) => d.id === id) ?? doors[0]!

export interface Format {
  duration: string
  title: string
  body: string
}

const formatsSource: Format[] = [
  { duration: '45 to 60 min', title: 'Keynote', body: 'Main stage, plenary or opening session, tailored to your theme with a pre-call to align on the audience.' },
  { duration: '60 to 75 min', title: 'Breakout session', body: 'Same material in a smaller room, with more discussion and more room for the audience’s own situations.' },
  { duration: '90 min', title: 'Interactive workshop', body: 'A working session, not a talk. Participants leave having applied something to their own organization.' },
  { duration: 'Half day', title: 'Board or leadership retreat', body: 'Facilitated session designed around your live decision, with a document review beforehand and written output after.' },
  { duration: '45 to 60 min', title: 'Fireside or panel moderation', body: 'Interviewed, or running the panel. Program chairs are always short of moderators who have done the work themselves.' },
  { duration: 'Scoped', title: 'Strategic engagement', body: 'Multi-session advisory work: a listening tour designed and run, a governance redesign, a planning cycle advised end to end.' },
]

export interface Talk {
  slug: string
  n: string
  title: string
  subtitle: string
  body: string
  audience: string
  level: string
  formats: string
  door: DoorId
  image: string
  // Source id of the article shown on the talk page, if it has a capture.
  press?: string
  outcomes: string[]
}

const talksSource: Talk[] = [
  {
    slug: 'board-leadership-that-moves',
    n: '01',
    title: 'Board Leadership That Moves',
    subtitle: 'A Governance Playbook for System Transformation',
    body: 'What a board actually did: a statewide listening tour, a strategic plan rebuilt around economic mobility, an innovation fund, a new chancellor. Deliberately unglamorous, including where it stalled.',
    audience: 'Trustees & boards',
    level: 'Intermediate to advanced',
    formats: 'Keynote · Retreat',
    door: 'mobility',
    image: '/img/panel-c.jpg',
    press: 'cccs-chair',
    outcomes: [
      'Sequence a board-led transformation from listening through strategic plan to executive hire.',
      'Distinguish decisions that belong to a governing board from those that belong to administration.',
      'Design a listening process whose output survives contact with a planning committee.',
      'Identify where board-led change most commonly stalls, and a countermeasure for each.',
    ],
  },
  {
    slug: 'homegrown-talent',
    n: '02',
    title: 'Homegrown Talent',
    subtitle: 'How Sixty Rural Districts Built Their Own Pipeline',
    body: 'Rural communities are told to attract talent. This started from the opposite premise. What it took to get K-12, colleges, employers and economic development into one plan rather than parallel programs.',
    audience: 'Workforce & economic development',
    level: 'Intro to intermediate',
    formats: 'Keynote · Workshop',
    door: 'mobility',
    image: '/img/rural-c.jpg',
    press: 'the74',
    outcomes: [
      'Map the education, employer and workforce actors in their region and find the missing relationships.',
      'Explain why regional collaboratives fail at convening more often than at funding.',
      'Apply a shared-pathway model to one occupation or sector in their region.',
      'Convene a credible first meeting of cross-sector partners.',
    ],
  },
  {
    slug: 'open-democracy',
    n: '03',
    title: 'Open Democracy',
    subtitle: 'Building Institutions People Believe In',
    body: 'Democratic trust is decided by whether the institutions people actually deal with turn out to be responsive. A hopeful session with specifics in it, not a diagnosis of polarization.',
    audience: 'Democracy & civic',
    level: 'All levels',
    formats: 'Keynote · Fireside',
    door: 'democracy',
    image: '/img/room-c.jpg',
    press: 'obama',
    outcomes: [
      'Explain the relationship between institutional responsiveness and civic trust.',
      'Identify why many participation efforts increase cynicism, and what distinguishes the ones that do not.',
      'Design one participation process with a real decision attached to it.',
      'Name actions available to local leaders who cannot change national conditions.',
    ],
  },
  {
    slug: 'making-mobility-the-purpose',
    n: '04',
    title: 'Making Mobility the Purpose',
    subtitle: 'Community Colleges and the Economic Mobility Mandate',
    body: 'What got funded, what got cut, and what the strategic plan had to stop saying when a system made mobility its organizing purpose rather than one goal among twelve.',
    audience: 'Community colleges',
    level: 'Intermediate',
    formats: 'Keynote · Cabinet retreat',
    door: 'mobility',
    image: '/img/trinidad-c.jpg',
    press: 'cei',
    outcomes: [
      'Compare their institution’s stated priorities against its budget and calendar.',
      'Identify what an institution has to stop doing to make mobility a real organizing purpose.',
      'Structure philanthropic investment to underwrite change rather than fund isolated programs.',
      'Select mobility measures a board and a community will both accept.',
    ],
  },
  {
    slug: 'coalitions-across-difference',
    n: '05',
    title: 'Coalitions Across Difference',
    subtitle: 'Getting Red, Blue and Rural in One Room',
    body: 'Getting people who disagree into a room is the easy part. Getting them to decide something together is the work. Draws on efforts that worked and at least one that did not.',
    audience: 'Civic & leadership',
    level: 'All levels',
    formats: 'Keynote · Workshop · Moderation',
    door: 'democracy',
    image: '/img/sign-c.jpg',
    press: 'unite',
    outcomes: [
      'Assemble a coalition around a shared concrete problem rather than shared values.',
      'Identify what must be true before a first convening for the second one to happen.',
      'Facilitate a decision among people who disagree without collapsing into agreement on nothing.',
      'Recognize the conditions under which a coalition fractures, and intervene first.',
    ],
  },
  {
    slug: 'the-open-system',
    n: '06',
    title: 'The Open System',
    subtitle: 'Why Institutions Stop Listening',
    body: 'The framework moved out of education and into whatever institution is in the room. Participants leave with a diagnostic they can run on their own organization within a week.',
    audience: 'Executive & leadership',
    level: 'All levels',
    formats: 'Keynote · Fireside · Workshop',
    door: 'leadership',
    image: '/img/keynote-c.jpg',
    press: 'cllaro',
    outcomes: [
      'Diagnose whether their organization is currently open or closed to the people it serves.',
      'Distinguish consultation that gathers input from participation that changes decisions.',
      'Recognize the conditions under which institutions close, including the ones that feel like good management.',
      'Identify two design changes that would measurably increase responsiveness.',
    ],
  },
]

const openSystemSource = {
  title: 'The Open System',
  authors: 'Mascareñaz & Tran',
  press: 'Harvard Education Press',
  cover: '/open-system-cover.jpg',
  year: '2023',
  pages: '280',
  isbn: '978-1-68253-813-5',
  source: 'hep',
  moves: 'Drawing on the Kentucky Coalition for Advancing Education and Colorado’s Homegrown Talent Initiative, the book sets out six moves that bring an institution back into contact with the people it serves, and a diagnostic a leader can run on their own organization within a week.',
  statement: 'Closing usually looks like competence from the inside.',
  body: [
    'Organizations rarely decide to stop listening. They tighten process, protect staff time, standardize decisions. Each of these looks like good management on the day it happens. Years later the institution cannot say what the people it serves actually want.',
    'The Open System, written with Dr. Doannie Tran and published by Harvard Education Press in 2023, is a working framework for diagnosing that drift and reversing it. It draws on the Kentucky Coalition for Advancing Education and Colorado’s Homegrown Talent Initiative, and it runs underneath all three doors rather than sitting beside them as a fourth.',
  ],
  pull: 'He does not present it as theory. He chaired the board that ran the process the book describes.',
  taughtAt: [
    ['Harvard Graduate School of Education', ''],
    ['Columbia Law School', 'Center for Public Research & Leadership'],
    ['Yale School of Management', 'The Broad Center'],
    ['Brown University', ''],
    ['University of Kentucky', ''],
    ['University of Colorado Denver', 'School of Public Affairs'],
  ] as [string, string][],
}

// A single thing he has said, on the record, with the record attached.
const saidSource = {
  quote: 'People don’t fear change. They actually fear loss.',
  context: 'On why reform has to be built locally, with the people it affects',
  source: 'unite',
}

// ---------- media ----------
// Keynotes and podcasts. Nothing loads until it is asked for: video opens a
// youtube-nocookie player, podcasts an Apple Podcasts episode player, and
// `audio` rows play a plain file. `link` rows only point out.

export type MediaPlatform = 'youtube' | 'apple' | 'audio' | 'link'

export interface Media {
  kind: 'video' | 'podcast'
  label: string
  host: string
  when?: string
  duration?: string
  platform: MediaPlatform
  // youtube: the video id. apple: "id<show>?i=<episode>". audio: the file url.
  id?: string
  url: string
  // Under /img, without the "-c" suffix: a 16:9 poster or square show art.
  poster?: string
}

const mediaSource: Media[] = [
  { kind: 'video', label: 'Keynote opening', host: 'Association of Latino Administrators and Superintendents', when: '2020', platform: 'youtube', id: 'Bb-JZpJJRbE', url: 'https://www.youtube.com/watch?v=Bb-JZpJJRbE', poster: 'keynote' },
  { kind: 'video', label: 'Leaders who listen: creating openness in education systems', host: 'Possip Partner Retreat, keynote', when: '2023', platform: 'youtube', id: 'WoVP7SJjh0s', url: 'https://www.youtube.com/watch?v=WoVP7SJjh0s', poster: 'media/WoVP7SJjh0s' },
  { kind: 'video', label: 'Co-creation and the open leader', host: 'Seek Common Ground, Learning Community Talks', when: 'Dec 2021', platform: 'youtube', id: 'kqkHOnPG2Rg', url: 'https://www.youtube.com/watch?v=kqkHOnPG2Rg', poster: 'media/kqkHOnPG2Rg' },
  { kind: 'video', label: 'Three lessons from education reform', host: 'Education Elements', platform: 'youtube', id: 'iVM2od6qwgc', url: 'https://www.youtube.com/watch?v=iVM2od6qwgc', poster: 'media/iVM2od6qwgc' },
  { kind: 'video', label: 'EduDemocracy and the Cornerstone Project', host: 'Rank the Vote', when: 'Aug 2024', duration: '56 min', platform: 'youtube', id: 'ACgnUZAJH5w', url: 'https://www.youtube.com/watch?v=ACgnUZAJH5w', poster: 'media/ACgnUZAJH5w' },
  { kind: 'video', label: 'On The Open System', host: 'Harvard Education Press, author clip', when: 'Aug 2023', duration: '2 min', platform: 'youtube', id: 'bm8oyesojG0', url: 'https://www.youtube.com/watch?v=bm8oyesojG0', poster: 'media/bm8oyesojG0' },

  { kind: 'podcast', label: 'Open System for Democracy', host: 'Future Hindsight, with Mila Atmos', when: 'Jul 2023', duration: '45 min', platform: 'apple', id: 'id1334328470?i=1000622516733', url: 'https://www.futurehindsight.com/episodes/open-system-for-democracy-landon-mascareaz-doannie-tran', poster: 'media/future-hindsight' },
  { kind: 'podcast', label: 'The Open System: Redesigning Education and Reigniting Democracy', host: 'The Harvard Education Press Podcast', when: 'Aug 2023', platform: 'apple', id: 'id1890291908?i=1000758915853', url: 'https://podcasts.apple.com/us/podcast/the-harvard-education-press-podcast/id1890291908?i=1000758915853', poster: 'media/hep' },
  { kind: 'podcast', label: 'The Open System', host: 'New Books in Education, with Deidre Tyler', when: 'Aug 2023', platform: 'apple', id: 'id426205817?i=1000623568963', url: 'https://newbooksnetwork.com/the-open-system', poster: 'media/nbn' },
  { kind: 'podcast', label: 'Opening up: recreating schools as a community', host: 'Ethical Schools', when: 'Jul 2023', duration: '40 min', platform: 'apple', id: 'id1459925807?i=1000621204874', url: 'https://ethical-schools.castos.com/episodes/opening-up-recreating-schools-as-a-community', poster: 'media/ethical-schools' },
  { kind: 'podcast', label: 'Opening up schools for civic democracy', host: 'Wisconsin Public Radio, Central Time', when: 'Jun 2023', platform: 'audio', id: 'https://mp3.wpr.org/download.php?f=ctm230622l1.mp3', url: 'https://www.wpr.org/opening-schools-civic-democracy' },
  { kind: 'podcast', label: 'Landon Mascareñaz and Doannie Tran on The Open System', host: 'Getting Smart, with Rebecca Midles', when: 'Jun 2023', platform: 'apple', id: 'id1017984086?i=1000617235670', url: 'https://www.gettingsmart.com/podcast/landon-mascarenaz-and-doannie-tran-on-the-open-system/', poster: 'media/getting-smart' },
  { kind: 'podcast', label: 'The Open System, episode 60', host: 'The Authority Podcast', when: 'Sep 2023', duration: '48 min', platform: 'apple', id: 'id1636774651?i=1000628238282', url: 'https://authoritypodcast.net/episodes/the-open-system-redesigning-education-and-reigniting-democracy-with-landon-mascarenaz-and-doannie-tran-the-authority-podcast-60', poster: 'media/authority' },
  { kind: 'podcast', label: 'Episode 11, with Dr. Doannie Tran', host: 'Education Perspectives, with Liza Holland', when: 'Jun 2023', duration: '45 min', platform: 'apple', id: 'id1667400301?i=1000616281534', url: 'https://podcasts.apple.com/us/podcast/ep-11-dr-landon-mascare%C3%B1az-dr-doannie-tran/id1667400301?i=1000616281534', poster: 'media/education-perspectives' },
  { kind: 'podcast', label: 'The Open System, his own show with Doannie Tran and Stephen Hurley', host: 'Apple Podcasts, ten episodes', when: '2023 to 2024', platform: 'link', url: 'https://podcasts.apple.com/us/podcast/the-open-system/id1717448660', poster: 'media/open-system' },
]


const testimonialsSource = [
  { quote: 'Testimonial. Three to five of these, each with a full name, a title and an organization.', name: 'Full name', title: 'Title, Organization' },
  { quote: 'Attribution to a named person reads stronger than to an organization alone.', name: 'Full name', title: 'Title, Organization' },
  { quote: 'This is the section that convinces a committee member who has never seen him speak.', name: 'Full name', title: 'Title, Organization' },
]

export interface Paragraph {
  text: string
  cites: string[]
}

const personSource = {
  title: 'Not a commentator. A builder who kept the receipts.',
  body: [
    {
      text: 'Born in California and raised in Littleton, Colorado, Landon studied international relations at Lewis & Clark College in Portland, then began his career as a first-grade teacher on the Navajo Nation with Teach For America. He went on to lead Teach For America New Mexico for five years and earned a doctorate in education leadership from the Harvard Graduate School of Education in 2015.',
      cites: ['cccs-chair', 'osi'],
    },
    {
      text: 'Governor Jared Polis appointed him to Colorado’s State Board for Community Colleges and Occupational Education in 2019. He served as vice chair and in August 2023 was elected chair, succeeding former state senator Rollie Heath, on a bipartisan board that oversees thirteen colleges. During his tenure the board ran a statewide listening tour, rebuilt the strategic plan around economic mobility, secured philanthropic investment for a statewide innovation fund, adopted new governance policies, and hired a new chancellor. He convened and chairs the Colorado Trustee Network.',
      cites: ['cccs-chair', 'cccs-bio', 'ctn'],
    },
    {
      text: 'At the Colorado Education Initiative he directed the Homegrown Talent Initiative, which grew from eight pilot communities in 2019 to more than sixty rural districts across eight regions of the state. He is helping bring the Emergent Campus model to Trinidad, in southern Colorado, where he keeps an office at the A.R. Mitchell Museum of Western Art, and he sits on the boards of Latinos for Education and Caring for Colorado.',
      cites: ['hti', 'emergent', 'cc-staff'],
    },
    {
      text: 'In the summer of 2025, after a listening tour through roughly twenty Colorado communities, he founded Courageous Colorado, a nonpartisan effort to open the state’s primaries and rebuild civic trust. Its coalition now numbers close to thirty organizations from the left, right and center.',
      cites: ['copolitics', 'unite'],
    },
    {
      text: 'In 2026 he was named an Obama Foundation USA Leader and received CLLARO’s Roger Cisneros Public Policy Award at the 31st Bernie Valdez Awards. He serves on the Our Common Purpose council at the American Academy of Arts and Sciences and teaches on the faculty of the Executive Leadership Academy at the Leadership Institute of Nevada.',
      cites: ['obama', 'cllaro', 'amacad', 'lion'],
    },
  ] as Paragraph[],
}

// Dated, sourced. Rendered on the About page.
export interface Milestone {
  year: string
  text: string
  source: string
}

const timelineSource: Milestone[] = [
  { year: '2005', text: 'First-grade teacher on the Navajo Nation, Teach For America.', source: 'osi' },
  { year: '2007', text: 'Executive Director, Teach For America New Mexico, through 2012.', source: 'osi' },
  { year: '2012', text: 'Enters the doctoral program in education leadership at the Harvard Graduate School of Education. Completes it in 2015.', source: 'linkedin' },
  { year: '2013', text: 'Co-designs the launch of the NACA Inspired Schools Network, serving Indigenous communities.', source: 'osi' },
  { year: '2014', text: 'Leads the Family and Community Engagement office at Denver Public Schools, through 2017.', source: 'osi' },
  { year: '2017', text: 'Vice President of Advocacy and Partnerships, A+ Colorado.', source: 'ctn' },
  { year: '2019', text: 'Appointed to the State Board for Community Colleges and Occupational Education by Governor Jared Polis. Joins the Colorado Education Initiative as Vice President of Community Partnership. The Homegrown Talent Initiative launches in eight rural communities.', source: 'cei' },
  { year: '2020', text: 'Deploys the Denver Metro Emergency Food Network during the pandemic, distributing more than 320,000 free meals. Keynotes the Association of Latino Administrators and Superintendents.', source: 'osi' },
  { year: '2022', text: 'Homegrown Talent expands to more than sixty districts. Chairs the Reisher Scholars committee.', source: 'hti' },
  { year: '2023', text: 'The Open System is published by Harvard Education Press. Elected chair of the State Board, succeeding Rollie Heath.', source: 'cccs-chair' },
  { year: '2025', text: 'Founds Courageous Colorado after a spring listening tour of roughly twenty communities. Launches a statewide activation tour in October.', source: 'copolitics' },
  { year: '2026', text: 'The coalition to open Colorado’s primaries reaches close to thirty organizations across the political spectrum.', source: 'unite' },
  { year: '2026', text: 'Named an Obama Foundation USA Leader, 2026 to 2027 cohort, for the statewide engagement work behind Courageous Colorado.', source: 'obama' },
  { year: '2026', text: 'Receives CLLARO’s Roger Cisneros Public Policy Award at the 31st Annual Bernie Valdez Awards in September.', source: 'cllaro' },
]

const recordSource: [string, string, string][] = [
  ['2026', 'Obama Foundation USA Leader, 2026 to 2027 cohort', 'obama'],
  ['2026', 'Roger Cisneros Public Policy Award, CLLARO Bernie Valdez Awards', 'cllaro'],
  ['2026', 'Unite America: building a Colorado-first coalition for reform', 'unite'],
  ['2025', 'Q&A, Colorado Politics: bringing bravery back to politics', 'copolitics'],
  ['2025', 'Colorado Mountain College Hispanic Serving Institution Summit, opening panel', ''],
  ['2025', 'Colorado Community College System Adult Leadership Summit', ''],
  ['2024', 'City of Raton Economic Development Conference', ''],
  ['2023', 'ECMC Foundation', ''],
  ['2023', 'Public Charter Schools of New Mexico', ''],
  ['2020', 'Association of Latino Administrators and Superintendents, keynote', 'osi'],
  ['TV', 'Next with Kyle Clark · Real Talk with Micah Smith · 9News', ''],
  ['Podcast', 'Future Hindsight · New Books Network · Ethical Schools · Wisconsin Public Radio', 'wpr'],
  ['Newsletter', 'Open Hearts & Open Democracy, on Substack', 'substack'],
  ['Fellow', 'Pahara Institute · Flamboyan Family Engagement Fellowship', 'pahara'],
  ['Council', 'Our Common Purpose, American Academy of Arts & Sciences', 'amacad'],
  ['Faculty', 'Executive Leadership Academy, Leadership Institute of Nevada', 'lion'],
]

const statsSource: [string, string, string][] = [
  ['60', 'Rural districts in the Homegrown Talent Initiative, across eight regions of Colorado', 'hti'],
  ['13', 'Colleges in the system whose bipartisan state board he chaired', 'cccs-chair'],
  ['30', 'Organizations, left, right and center, in the Courageous Colorado coalition', 'unite'],
  ['2005', 'First classroom. First grade, on the Navajo Nation', 'osi'],
]

const plannersSource: [string, string][] = [
  ['Fees', 'Scaled by format and organization type. Association and nonprofit rates available.'],
  ['Travel', 'From Denver, Colorado.'],
  ['Virtual', 'Available. 30 to 45 minutes preferred.'],
  ['Recording', 'Permission granted to record, distribute and post on demand.'],
  ['AV needs', 'Lav or handheld mic, projector, screen, HDMI. Brings own laptop.'],
  ['Also available for', 'Meet and greets, sponsor sessions, book signings, pre-event promotion.'],
  ['Continuing education', 'Sessions can be mapped to CEU or CPE frameworks on request.'],
  ['Press kit', 'Bios at three lengths, high-resolution headshot, talk descriptions and learning outcomes.'],
]


// ---------- chrome and page copy ----------
// Every label, button, heading and sentence that is not already part of a
// record above. One key per distinct string: the editor binds a string to
// the first path that holds it, so a label reused across pages lives here
// once and is rendered from the same key everywhere.
const uiSource = {
  nav: { work: 'Work', talks: 'Talks', book: 'The Book', about: 'About' },
  labels: {
    request: 'Request availability',
    seeTalks: 'See the talks',
    exploreWork: 'Explore the work',
    aboutBook: 'About the book',
    fullRecord: 'The full record',
    viewSession: 'View session',
    browseTalks: 'Browse the talks',
    aboutLandon: 'About Landon',
    bookSession: 'Book this session',
    seeSession: 'See the session',
    episodePage: 'Episode page',
    listenSource: 'Listen at the source',
    openApple: 'Open on Apple Podcasts',
    publisherPage: 'Publisher page',
    committee: 'Everything a committee will ask',
    scroll: 'Scroll',
    previous: 'Previous',
    next: 'Next',
    heldBy: 'Held by',
    source: 'Source',
    isbn: 'ISBN',
    doors: 'doors',
    for: 'for',
    sessions: 'sessions',
  },
  sections: {
    spokenFor: 'Has spoken for',
    selected: 'Selected',
    work: 'The work',
    book: 'The book',
    record: 'The record',
    argument: 'The argument',
    details: 'The details',
    sessions: 'Sessions',
    onRecord: 'On the record',
    person: 'The person',
    travelsFrom: 'Travels from',
    virtual: 'Virtual',
    recording: 'Recording',
    newsletter: 'Newsletter',
    representedBy: 'Represented by',
    bookings: 'Bookings',
    watch: 'Watch',
    listen: 'Listen',
    inPress: 'In the press',
    seeHimWork: 'See him work',
    audience: 'Audience',
    level: 'Level',
    formats: 'Formats',
    door: 'Door',
    biography: 'Biography',
    values: 'Values',
    honors: 'Honors',
    timeline: 'Timeline',
    selectedRecord: 'Selected record',
    sources: 'Sources',
    planners: 'For planners',
    pressKit: 'Press kit',
    whatToBook: 'What you can book',
    taughtAt: 'Taught at',
    bookSession: 'Book the session',
    audio: 'Audio',
  },
  home: {
    bookLead: 'Closing looks like',
    bookAccent: 'competence',
    detailsLead: 'Six moves to an',
    detailsAccent: 'open',
    detailsTail: 'system.',
    recordLead: 'A builder who',
    recordAccent: 'kept the receipts',
    recordLede: 'Twenty years inside the institutions most speakers only analyze.',
    railLead: 'Six sessions, outcomes',
    railAccent: 'written',
    railEndLead: 'All six, with',
    railEndAccent: 'outcomes',
    personStatement: 'A first-grade teacher on the Navajo Nation who went on to chair the board of a thirteen-college system, direct a sixty-district rural talent initiative, and found a statewide civic coalition.',
    contactLede: 'Tell us the audience, the date and the format. We answer the same day.',
    virtual: 'Available, 30 to 45 minutes',
    recording: 'Permitted, on demand',
  },
  work: {
    title1: 'One body',
    title2: 'of work',
    lede: 'Three doors into it. Different audiences meet this work from different directions, and the same underlying question waits behind each one: does the institution still listen to the people it serves?',
    pinCopy: 'Different audiences meet this work from different directions. A workforce board and a democracy foundation are asking the same question from opposite ends of it.',
    formatsHeading: 'Six formats, one conversation.',
  },
  talks: {
    title1: 'Six sessions',
    title2: 'outcomes written.',
    lede: 'Every proposal form asks for learning outcomes. They are published here so a program committee can lift them straight into the agenda.',
    proofLead: 'On stage, on a panel, in an',
    proofAccent: 'interview',
    watchNote: 'keynotes and talks',
    listenNote: 'podcasts and radio',
    outcomes: 'Participants leave able to',
  },
  book: {
    title1: 'The Open',
    title2: 'System',
    lede: 'Redesigning Education and Reigniting Democracy. Written with Dr. Doannie Tran. A working framework for diagnosing why institutions stop listening, and reversing it.',
  },
  about: {
    title1: 'Not a',
    title2: 'commentator',
    lede: 'A builder who kept the receipts. Twenty years across education, workforce, rural and civic institutions, most of it from inside the room where the decision was made.',
    valuesNote: 'Six words, in his own wording',
    timelineNote: 'Each entry links to the record it comes from',
    timelineHeading: 'Twenty years, dated and sourced.',
    now: 'Now',
    nowText: 'Founding CEO, Courageous Colorado. Keynotes, workshops and facilitation across the three doors.',
    sourcesNote: 'The public record this page draws on',
    kit: [
      { title: 'Bios at three lengths', note: '50 · 150 · 400 words' },
      { title: 'High-resolution headshot', note: 'Print and screen' },
      { title: 'Talk descriptions', note: 'With learning outcomes' },
      { title: 'Introduction script', note: 'For the host' },
    ],
  },
}

/* -------------------------------------------------------------------------
 * The editable content root.
 *
 * The Apotome in-situ editor walks one object and writes into it, and the
 * published overlay from the studio is merged onto that same object at boot.
 * Both need a single reactive tree, which is why the data above is assembled
 * here rather than exported as separate constants.
 *
 * The named exports below are views onto that tree, not copies: `reactive()`
 * hands back a proxy, so `site` and `content.site` are the same object and an
 * edit made anywhere re-renders everywhere. Every existing import keeps
 * working untouched.
 * ---------------------------------------------------------------------- */
export const content = reactive({
  site: siteSource,
  hero: heroSource,
  sources: sourcesSource,
  values: valuesSource,
  valuesStatement: valuesStatementSource,
  honors: honorsSource,
  clients: clientsSource,
  doors: doorsSource,
  formats: formatsSource,
  talks: talksSource,
  openSystem: openSystemSource,
  said: saidSource,
  media: mediaSource,
  testimonials: testimonialsSource,
  person: personSource,
  timeline: timelineSource,
  record: recordSource,
  stats: statsSource,
  planners: plannersSource,
  ui: uiSource,
})

export const site = content.site
export const hero = content.hero
export const sources = content.sources
export const values = content.values
export const valuesStatement = content.valuesStatement
export const honors = content.honors
export const clients = content.clients
export const doors = content.doors
export const formats = content.formats
export const talks = content.talks
export const openSystem = content.openSystem
export const said = content.said
export const media = content.media
export const testimonials = content.testimonials
export const person = content.person
export const timeline = content.timeline
export const record = content.record
export const stats = content.stats
export const planners = content.planners
export const ui = content.ui

// Every photograph in the tree is a path to its JPEG, which is what the
// editor binds and replaces. The AVIF beside a local JPEG is derived here,
// so a replaced image (a studio URL or a data URL) simply has no AVIF.
export const avif = (src: string) => (/^\/[\w./-]+\.jpg$/.test(src) ? src.replace(/\.jpg$/, '.avif') : undefined)

// Views onto the media list. The items are the same reactive objects, so an
// edit to a video's label shows here too; only the split is fixed.
export const watch = content.media.filter((m) => m.kind === 'video')
export const listen = content.media.filter((m) => m.kind === 'podcast')
