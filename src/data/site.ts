// All copy for the site lives here. Edit text without touching layout.

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
}

export const hero = {
  lines: ['Institutions', 'can stay', 'open', 'to the people', 'they serve.'],
  sub: 'Most of them do not. Twenty years inside the ones that tried: a classroom on the Navajo Nation, a state community college board, sixty rural districts, and a book about why organizations stop listening.',
}

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
}

export const doors: Door[] = [
  {
    n: '01',
    title: 'Leadership & Latino America',
    short: 'Leadership',
    body: 'Representation, belonging, and what a leader actually does with a seat once they have one. From a Mexican-American leader whose work runs through education, democracy and public life.',
    audiences: ['Latino organizations', 'Universities & HSIs', 'Fellowship cohorts'],
  },
  {
    n: '02',
    title: 'Democracy & Civic Renewal',
    short: 'Democracy',
    body: 'Trust is not won at the ballot box. It is decided by whether the schools, colleges and city halls people actually deal with turn out to be responsive.',
    audiences: ['Foundations', 'Civic organizations', 'Public affairs forums'],
  },
  {
    n: '03',
    title: 'Economic Mobility & Regional Prosperity',
    short: 'Mobility',
    body: 'Community colleges as engines of mobility, regional talent ecosystems, and what it takes to align education, employers and communities around one goal.',
    audiences: ['Higher education', 'Workforce boards', 'Economic development'],
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
  statement: 'Closing usually looks like competence from the inside.',
  body: [
    'Organizations rarely decide to stop listening. They tighten process, protect staff time, standardize decisions. Each of these looks like good management on the day it happens. Years later the institution cannot say what the people it serves actually want.',
    'The Open System, written with Dr. Doannie Tran, is a working framework for diagnosing that drift and reversing it. It runs underneath all three doors rather than sitting beside them as a fourth.',
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

export const watch = [
  { label: 'Full keynote', note: '20 to 45 min, named event' },
  { label: 'Panel moderation', note: 'Named event' },
  { label: 'Fireside / interview', note: 'Named event' },
]

export const testimonials = [
  { quote: 'Testimonial. Three to five of these, each with a full name, a title and an organization.', name: 'Full name', title: 'Title, Organization' },
  { quote: 'Attribution to a named person reads stronger than to an organization alone.', name: 'Full name', title: 'Title, Organization' },
  { quote: 'This is the section that convinces a committee member who has never seen him speak.', name: 'Full name', title: 'Title, Organization' },
]

export const person = {
  title: 'Not a commentator. A builder who kept the receipts.',
  body: [
    'Landon began as a first-grade teacher on the Navajo Nation, went on to lead Teach For America New Mexico, and earned a doctorate in education leadership from the Harvard Graduate School of Education.',
    'Governor Jared Polis appointed him to Colorado’s state community college board in 2019. He rose to vice chair and then chair, and during his tenure the board ran a statewide listening tour, rebuilt the strategic plan around economic mobility, secured philanthropic investment for a statewide innovation fund, adopted new governance policies, and hired a new chancellor. He co-founded the Colorado Trustee Network.',
    'He helped launch and lead the Homegrown Talent Initiative across sixty rural Colorado districts, serves as board president of Emergent Campus, and sits on the board of Latinos for Education.',
  ],
}

export const record: [string, string][] = [
  ['2025', 'Colorado Mountain College Hispanic Serving Institution Summit, opening panel'],
  ['2025', 'Colorado Community College System Adult Leadership Summit'],
  ['2024', 'City of Raton Economic Development Conference'],
  ['2023', 'ECMC Foundation'],
  ['2023', 'Public Charter Schools of New Mexico'],
  ['2020', 'Association of Latino Administrators and Superintendents'],
  ['TV', 'Next with Kyle Clark · Real Talk with Micah Smith · 9News'],
  ['Podcast', 'Future Hindsight · New Books Network · Ethical Schools · Wisconsin Public Radio'],
  ['Faculty', 'Leadership Institute of Nevada, Executive Leadership Program'],
]

export const stats: [string, string][] = [
  ['60', 'Rural districts reached through the Homegrown Talent Initiative'],
  ['3', 'Years chairing the board of one of the largest community college systems in the country'],
  ['6', 'Universities teaching The Open System framework'],
  ['20', 'Years across education, workforce, rural and civic institutions'],
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
