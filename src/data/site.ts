// All copy for the site lives here. Edit text without touching layout.
//
// Biographical claims carry source ids that resolve to `sources` below, so
// every fact on the page can link out to the public record it came from.

export const site = {
  name: 'Landon Mascareñaz',
  honorific: 'Dr. Landon Mascareñaz',
  roles: [
    'Founding CEO, Courageous Colorado',
    'Co-author, The Open System (Harvard Education Press)',
    'Fmr. Chair, Colorado State Board for Community Colleges and Occupational Education',
  ],
  travelsFrom: 'Denver, Colorado',
  email: 'bookings@openfutures.example',
  emailLabel: 'bookings@openfutures',
  agency: 'Open Futures',
  // The agency site. Domain pending; the brief signs as openfutures.co.
  agencyUrl: 'https://openfutures.co',
}

export const hero = {
  lines: ['Institutions', 'must stay', 'open', 'to the people', 'they serve.'],
  sub: 'Most of them do not. Twenty years inside the ones that tried: a first-grade classroom on the Navajo Nation, a state community college board, sixty rural districts, and a book about why organizations stop listening.',
}

// ---------- sources ----------

export interface Source {
  id: string
  title: string
  outlet: string
  date: string
  url: string
}

export const sources: Source[] = [
  {
    id: 'cccs-bio',
    title: 'Dr. Landon Mascareñaz, State Board profile',
    outlet: 'Colorado Community College System',
    date: '',
    url: 'https://cccs.edu/about/governance/dr-landon-mascarenaz/',
  },
  {
    id: 'cccs-chair',
    title: 'State Board welcomes Dr. Landon Mascareñaz as new chair',
    outlet: 'Colorado Community College System',
    date: 'Aug 2023',
    url: 'https://cccs.edu/cccs-news/state-board-welcomes-dr-landon-mascarenaz-as-new-chair/',
  },
  {
    id: 'cc-staff',
    title: 'Staff: Landon Mascareñaz, Founding Chief Executive Officer',
    outlet: 'Courageous Colorado',
    date: '',
    url: 'https://www.courageouscolorado.org/staff',
  },
  {
    id: 'copolitics',
    title: 'Q&A with Courageous Colorado’s Landon Mascareñaz: nonprofit aims to bring bravery back to politics',
    outlet: 'Colorado Politics, Ernest Luning',
    date: 'Oct 2025',
    url: 'https://www.coloradopolitics.com/2025/10/17/qa-with-courageous-colorados-landon-mascare%C3%B1az-nonprofit-aims-to-bring-bravery-back-to-politics/',
  },
  {
    id: 'unite',
    title: 'Opening Colorado’s primaries: how Landon Mascareñaz is building a Colorado-first coalition for reform',
    outlet: 'Unite America',
    date: 'Jan 2026',
    url: 'https://www.uniteamerica.org/articles/opening-colorados-primaries-how-landon-mascarenaz-is-building-a-colorado-first-coalition-for-reform',
  },
  {
    id: 'hep',
    title: 'The Open System: Redesigning Education and Reigniting Democracy',
    outlet: 'Harvard Education Press',
    date: '2023',
    url: 'https://hep.gse.harvard.edu/9781682538135/the-open-system/',
  },
  {
    id: 'osi',
    title: 'Mascareñaz bio and archive',
    outlet: 'The Open System Institute',
    date: '',
    url: 'https://www.theopensystem.org/mascarenaz-bio-archive',
  },
  {
    id: 'pahara',
    title: 'Fellow profile: Landon Mascareñaz',
    outlet: 'Pahara Institute',
    date: '',
    url: 'https://www.pahara.org/fellow/landon-mascare%C3%B1az',
  },
  {
    id: 'cei',
    title: 'Mascareñaz to join the Colorado Education Initiative team',
    outlet: 'Colorado Education Initiative',
    date: 'Jun 2019',
    url: 'https://www.coloradoedinitiative.org/mascarenaz-to-join-the-colorado-education-initiative-team/',
  },
  {
    id: 'hti',
    title: 'Homegrown Talent Initiative',
    outlet: 'Colorado Succeeds',
    date: '',
    url: 'https://coloradosucceeds.org/resource/homegrown-talent-initiative/',
  },
  {
    id: 'the74',
    title: 'First person: how Colorado’s Homegrown Talent Initiative is boosting the “educonomy” in 8 rural communities',
    outlet: 'The 74',
    date: '',
    url: 'https://www.the74million.org/article/first-person-how-colorados-homegrown-talent-initiative-is-boosting-the-educonomy-in-8-rural-communities-to-help-students-succeed/',
  },
  {
    id: 'emergent',
    title: 'About Emergent Campus Trinidad',
    outlet: 'Emergent Campus',
    date: '',
    url: 'https://emergentcampus.org/trinidad-campus/',
  },
  {
    id: 'ctn',
    title: 'Landon Mascareñaz, Convener and Chair',
    outlet: 'Colorado Trustee Network',
    date: '',
    url: 'https://colorado-trustee-network.squarespace.com/convening-committee-members/landon-mascarenaz',
  },
  {
    id: 'wpr',
    title: 'Contributor page: Landon Mascareñaz',
    outlet: 'Wisconsin Public Radio',
    date: '',
    url: 'https://www.wpr.org/person/landon-mascarenaz',
  },
  {
    id: 'linkedin',
    title: 'Landon Mascareñaz',
    outlet: 'LinkedIn',
    date: '',
    url: 'https://www.linkedin.com/in/landonmascarenaz',
  },
  {
    id: 'obama',
    title: 'USA Leaders 2026–2027: Landon Mascareñaz',
    outlet: 'Obama Foundation',
    date: '2026',
    url: 'https://www.obama.org/programs/leaders/usa/2026-2027/landon-mascarenaz/',
  },
  {
    id: 'cllaro',
    title: 'Roger Cisneros Public Policy Award, 31st Bernie Valdez Awards',
    outlet: 'Open Hearts & Open Democracy',
    date: 'Sep 2026',
    url: 'https://openheartsopendemocracy.substack.com/p/wednesday-september-16',
  },
  {
    id: 'lion',
    title: 'Executive Leadership Academy, faculty',
    outlet: 'Leadership Institute of Nevada',
    date: '',
    url: 'https://www.lionv.org/executive-leadership-academy',
  },
  {
    id: 'amacad',
    title: 'Our Common Purpose',
    outlet: 'American Academy of Arts & Sciences',
    date: '',
    url: 'https://www.amacad.org/ourcommonpurpose',
  },
]

// ---------- values ----------
// Six words, in Landon's own wording. The three he and Joze both landed on
// (truth, stewardship, abundance) carry `shared`, and each pair lives
// behind one of the three doors.

export interface Value {
  word: string
  body: string
  shared: boolean
  door: number
}

export const values: Value[] = [
  { word: 'Openness', body: 'Keep your heart, mind, and path open. Seek perspectives that challenge you. Hold strong convictions while remaining open to new possibilities.', shared: false, door: 1 },
  { word: 'Truth', body: 'Begin with shared reality. Face what is true, test assumptions, and pursue clarity, even when it complicates the story you want to tell.', shared: true, door: 1 },
  { word: 'Agency', body: 'Shape what comes next. Give people the freedom and responsibility to choose, create, contribute, and build, not simply participate in someone else’s vision.', shared: false, door: 0 },
  { word: 'Courage', body: 'Move toward the breakthrough. Question inherited assumptions, cross boundaries, enter difficult conversations, and create what does not yet exist.', shared: false, door: 0 },
  { word: 'Abundance', body: 'Believe more is possible together. Share ideas, relationships, platforms, and opportunities. Build partnerships that make everyone more capable.', shared: true, door: 2 },
  { word: 'Stewardship', body: 'Leave things more open than you found them. Use influence responsibly, lift up others, strengthen communities, and create opportunity for what comes next.', shared: true, door: 2 },
]

export const valuesFor = (door: number) => values.filter((v) => v.door === door)

// DRAFT for Landon and Joze to sign off. Built from the three shared values.
export const valuesStatement =
  'Begin with what is true. Leave things more open than you found them. Believe more is possible together than alone. Truth, stewardship and abundance hold the rest of the work in place: they are what a listening tour, a rebuilt strategic plan and a cross-partisan coalition have in common.'

// Honors and appointments, each with its record.
export const honors: [string, string, string][] = [
  ['Obama Foundation', 'USA Leader, 2026 to 2027 cohort', 'obama'],
  ['CLLARO', 'Roger Cisneros Public Policy Award, 2026', 'cllaro'],
  ['American Academy of Arts & Sciences', 'Our Common Purpose council', 'amacad'],
  ['Leadership Institute of Nevada', 'Executive Leadership Academy faculty', 'lion'],
]

export const sourceById = (id: string) => sources.find((s) => s.id === id)
export const sourceIndex = (id: string) => sources.findIndex((s) => s.id === id) + 1

export const clients = [
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
  n: string
  title: string
  short: string
  body: string
  audiences: string[]
  hue: string
  image: string
  imageAlt: string
}

export const doors: Door[] = [
  {
    n: '01',
    title: 'Leadership & Latino America',
    short: 'Leadership',
    body: 'Representation, belonging, and what a leader actually does with a seat once they have one. From a Mexican-American leader whose family roots run through Colorado and New Mexico for generations.',
    audiences: ['Latino organizations', 'Universities & HSIs', 'Fellowship cohorts'],
    hue: 'var(--clay)',
    image: 'cafe',
    imageAlt: 'Landon Mascareñaz at a café table by a winter window, looking out at the street.',
  },
  {
    n: '02',
    title: 'Democracy & Civic Renewal',
    short: 'Democracy',
    body: 'Trust is not won at the ballot box. It is decided by whether the schools, colleges and city halls people actually deal with turn out to be responsive.',
    audiences: ['Foundations', 'Civic organizations', 'Public affairs forums'],
    hue: 'var(--clay)',
    image: 'room',
    imageAlt: 'A community meeting seen from the back of the room, a slide about political crisis on the screen.',
  },
  {
    n: '03',
    title: 'Economic Mobility & Regional Prosperity',
    short: 'Mobility',
    body: 'Community colleges as engines of mobility, regional talent ecosystems, and what it takes to align education, employers and communities around one goal.',
    audiences: ['Higher education', 'Workforce boards', 'Economic development'],
    hue: 'var(--clay)',
    image: 'rural',
    imageAlt: 'A rural Colorado classroom, students laughing as a teacher reads to them.',
  },
]

export interface Format {
  duration: string
  title: string
  body: string
}

export const formats: Format[] = [
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
  door: number
  image: string
  outcomes: string[]
}

export const talks: Talk[] = [
  {
    slug: 'board-leadership-that-moves',
    n: '01',
    title: 'Board Leadership That Moves',
    subtitle: 'A Governance Playbook for System Transformation',
    body: 'What a board actually did: a statewide listening tour, a strategic plan rebuilt around economic mobility, an innovation fund, a new chancellor. Deliberately unglamorous, including where it stalled.',
    audience: 'Trustees & boards',
    level: 'Intermediate to advanced',
    formats: 'Keynote · Retreat',
    door: 2,
    image: 'panel',
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
    door: 2,
    image: 'rural',
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
    door: 1,
    image: 'room',
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
    door: 2,
    image: 'trinidad',
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
    door: 1,
    image: 'sign',
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
    door: 0,
    image: 'keynote',
    outcomes: [
      'Diagnose whether their organization is currently open or closed to the people it serves.',
      'Distinguish consultation that gathers input from participation that changes decisions.',
      'Recognize the conditions under which institutions close, including the ones that feel like good management.',
      'Identify two design changes that would measurably increase responsiveness.',
    ],
  },
]

export const openSystem = {
  title: 'The Open System',
  authors: 'Mascareñaz & Tran',
  press: 'Harvard Education Press',
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
export const said = {
  quote: 'People don’t fear change. They actually fear loss.',
  context: 'On why reform has to be built locally, with the people it affects',
  source: 'unite',
}

export interface Clip {
  label: string
  note: string
  youtube?: string
  poster?: string
}

export const watch: Clip[] = [
  { label: 'Keynote opening', note: 'Association of Latino Administrators and Superintendents', youtube: 'Bb-JZpJJRbE', poster: 'keynote' },
  { label: 'Panel moderation', note: 'Named event' },
  { label: 'Fireside / interview', note: 'Named event' },
]

export const testimonials = [
  { quote: 'Testimonial. Three to five of these, each with a full name, a title and an organization.', name: 'Full name', title: 'Title, Organization' },
  { quote: 'Attribution to a named person reads stronger than to an organization alone.', name: 'Full name', title: 'Title, Organization' },
  { quote: 'This is the section that convinces a committee member who has never seen him speak.', name: 'Full name', title: 'Title, Organization' },
]

export interface Paragraph {
  text: string
  cites: string[]
}

export const person = {
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

export const timeline: Milestone[] = [
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

export const record: [string, string, string][] = [
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
  ['Fellow', 'Pahara Institute · Flamboyan Family Engagement Fellowship', 'pahara'],
  ['Council', 'Our Common Purpose, American Academy of Arts & Sciences', 'amacad'],
  ['Faculty', 'Executive Leadership Academy, Leadership Institute of Nevada', 'lion'],
]

export const stats: [string, string, string][] = [
  ['60', 'Rural districts in the Homegrown Talent Initiative, across eight regions of Colorado', 'hti'],
  ['13', 'Colleges in the system whose bipartisan state board he chaired', 'cccs-chair'],
  ['30', 'Organizations, left, right and center, in the Courageous Colorado coalition', 'unite'],
  ['2005', 'First classroom. First grade, on the Navajo Nation', 'osi'],
]

export const planners: [string, string][] = [
  ['Fees', 'Scaled by format and organization type. Association and nonprofit rates available.'],
  ['Travel', 'From Denver, Colorado.'],
  ['Virtual', 'Available. 30 to 45 minutes preferred.'],
  ['Recording', 'Permission granted to record, distribute and post on demand.'],
  ['AV needs', 'Lav or handheld mic, projector, screen, HDMI. Brings own laptop.'],
  ['Also available for', 'Meet and greets, sponsor sessions, book signings, pre-event promotion.'],
  ['Continuing education', 'Sessions can be mapped to CEU or CPE frameworks on request.'],
  ['Press kit', 'Bios at three lengths, high-resolution headshot, talk descriptions and learning outcomes.'],
]
