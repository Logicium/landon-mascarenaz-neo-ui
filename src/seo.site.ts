/**
 * Who this site is, for search engines and assistants.
 *
 * A person site: the home page carries a Person entity and a ProfilePage,
 * every inner page references the Person by id. Facts come from
 * src/data/site.ts (roles, honors, sources) and nowhere else; the module's
 * Person has no field for the honorific, the awards or the authorship link
 * to the book, so those travel in `entity.extra`.
 */
import type { SiteConfig } from '@/seo'
import { hero, honors, site as person, sourceById } from '@/data/site'

export const SITE_URL = 'https://www.landonmascarenaz.com'
export const BOOK_ID = `${SITE_URL}/#book`

const srcUrl = (id: string) => sourceById(id)?.url

export const site: SiteConfig = {
  siteUrl: SITE_URL,
  name: person.name,
  tagline: 'Keynotes on democracy, mobility and leadership',
  description:
    'Speaker and author Landon Mascareñaz: founding CEO of Courageous Colorado, co-author of The Open System, former chair of Colorado’s community college board.',
  lang: 'en',
  locale: 'en_US',
  image: { url: '/og.jpg', width: 1200, height: 630, alt: `${person.honorific}, keynote speaker and author` },
  entity: {
    type: 'Person',
    name: person.name,
    description: hero.sub,
    image: person.portrait,
    email: person.email,
    jobTitle: 'Founding Chief Executive Officer',
    worksFor: { name: 'Courageous Colorado', url: 'https://www.courageouscolorado.org' },
    address: { addressLocality: 'Denver', addressRegion: 'CO', addressCountry: 'US' },
    alumniOf: ['Harvard Graduate School of Education', 'Lewis & Clark College'],
    knowsAbout: ['Democracy and civic renewal', 'Economic mobility', 'Community colleges', 'Rural workforce development', 'Latino leadership', 'Open systems', 'Board governance'],
    sameAs: ['linkedin', 'substack', 'cccs-bio', 'obama', 'pahara', 'osi', 'cc-staff'].map(srcUrl).filter((u): u is string => !!u),
    extra: {
      honorificPrefix: 'Dr.',
      award: honors.map(([org, what]) => `${what} (${org})`),
      author: { '@id': BOOK_ID },
    },
  },
  // a speaker and author: his talks and his book are the value of the site
  crawlers: { training: 'block' },
  // no admin or portal routes; /api is kept out of the SPA fallback
  privatePrefixes: ['/api'],
}
