// Press captures, media posters and local page shots.
//
// No dependencies of its own: Playwright and sharp are borrowed from sibling
// projects in the workspace. Override with PW_ROOT / SHARP_ROOT if they move.
//
//   node scripts/press-shots.mjs --press               capture the press sources
//   node scripts/press-shots.mjs --posters a,b,c       YouTube posters by id
//   node scripts/press-shots.mjs --art name=url,...    square show art by url
//   node scripts/press-shots.mjs --local http://localhost:5214   page shots
//
// Outputs: public/img/press/<id>.{jpg,avif}, public/img/media/<id>-c.{jpg,avif}

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const PW = process.env.PW_ROOT ?? resolve(root, '../pattern-language-ui/node_modules/playwright/index.mjs')
const SHARP = process.env.SHARP_ROOT ?? resolve(root, '../margaret-hunt-neo-ui/node_modules/sharp/lib/index.js')
const SHOTS = process.env.SHOTS_DIR ?? resolve(root, '../.shots')

const { default: sharp } = await import(pathToFileURL(SHARP).href)

// Articles about him, keyed by the source id in src/data/site.ts.
const PRESS = {
  unite: 'https://www.uniteamerica.org/articles/opening-colorados-primaries-how-landon-mascarenaz-is-building-a-colorado-first-coalition-for-reform',
  cllaro: 'https://openheartsopendemocracy.substack.com/p/wednesday-september-16',
  obama: 'https://www.obama.org/programs/leaders/usa/2026-2027/landon-mascarenaz/',
  copolitics: 'https://www.coloradopolitics.com/2025/10/17/qa-with-courageous-colorados-landon-mascare%C3%B1az-nonprofit-aims-to-bring-bravery-back-to-politics/',
  'cccs-chair': 'https://cccs.edu/cccs-news/state-board-welcomes-dr-landon-mascarenaz-as-new-chair/',
  the74: 'https://www.the74million.org/article/first-person-how-colorados-homegrown-talent-initiative-is-boosting-the-educonomy-in-8-rural-communities-to-help-students-succeed/',
  hti: 'https://coloradosucceeds.org/resource/homegrown-talent-initiative/',
  cei: 'https://www.coloradoedinitiative.org/mascarenaz-to-join-the-colorado-education-initiative-team/',
  wpr: 'https://www.wpr.org/opening-schools-civic-democracy',
}

const HIDE = `
  [id*="cookie" i], [class*="cookie" i], [class*="consent" i], [id*="onetrust" i], #onetrust-consent-sdk,
  .fc-consent-root, [class*="gdpr" i], [class*="newsletter" i][class*="modal" i], [class*="newsletter" i][class*="popup" i],
  [class*="paywall" i], [class*="sticky" i][class*="banner" i], [class*="subscribe" i][class*="overlay" i],
  [aria-label*="cookie" i], [role="dialog"][class*="modal" i] { display: none !important; }
  body { overflow: visible !important; }
`

const args = process.argv.slice(2)
const flag = (name) => {
  const i = args.indexOf(name)
  return i >= 0 ? (args[i + 1] ?? true) : null
}

async function browser() {
  const { chromium } = await import(pathToFileURL(PW).href)
  return chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
}

async function settle(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  } catch {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {})
    await page.waitForTimeout(3000)
  }
  await page.addStyleTag({ content: HIDE }).catch(() => {})
  await page.evaluate(() => window.scrollTo(0, 600)).catch(() => {})
  await page.waitForTimeout(600)
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {})
  await page.waitForTimeout(900)
}

async function press() {
  const out = resolve(root, 'public/img/press')
  mkdirSync(out, { recursive: true })
  const b = await browser()
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1.5, locale: 'en-US', reducedMotion: 'reduce' })
  for (const [id, url] of Object.entries(PRESS)) {
    const page = await ctx.newPage()
    try {
      await settle(page, url)
      const png = await page.screenshot({ clip: { x: 0, y: 0, width: 1280, height: 800 } })
      const base = sharp(png).resize(1200, 800, { fit: 'cover', position: 'top' })
      await base.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(resolve(out, `${id}.jpg`))
      await base.clone().avif({ quality: 55 }).toFile(resolve(out, `${id}.avif`))
      console.log('press', id, 'ok')
    } catch (e) {
      console.log('press', id, 'FAILED', e.message)
    }
    await page.close()
  }
  await b.close()
}

async function fetchBytes(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!r.ok) throw new Error(`${r.status} ${url}`)
  return Buffer.from(await r.arrayBuffer())
}

async function posters(ids) {
  const out = resolve(root, 'public/img/media')
  mkdirSync(out, { recursive: true })
  for (const id of ids) {
    let buf
    try {
      buf = await fetchBytes(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`)
      const m = await sharp(buf).metadata()
      if ((m.width ?? 0) < 640) throw new Error('placeholder')
    } catch {
      buf = await fetchBytes(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
    }
    const base = sharp(buf).resize(1280, 720, { fit: 'cover' })
    await base.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(resolve(out, `${id}-c.jpg`))
    await base.clone().avif({ quality: 52 }).toFile(resolve(out, `${id}-c.avif`))
    console.log('poster', id, 'ok')
  }
}

async function art(pairs) {
  const out = resolve(root, 'public/img/media')
  mkdirSync(out, { recursive: true })
  for (const pair of pairs) {
    const [name, url] = pair.split('=')
    const buf = await fetchBytes(url)
    const base = sharp(buf).resize(600, 600, { fit: 'cover' })
    await base.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(resolve(out, `${name}-c.jpg`))
    await base.clone().avif({ quality: 52 }).toFile(resolve(out, `${name}-c.avif`))
    console.log('art', name, 'ok')
  }
}

async function local(base) {
  mkdirSync(SHOTS, { recursive: true })
  const b = await browser()
  const page = await b.newPage({ viewport: { width: 1440, height: 900 } })
  for (const path of ['/', '/work', '/talks', '/book', '/about']) {
    await page.goto(base + path, { waitUntil: 'networkidle' })
    await page.waitForTimeout(3000)
    const name = path === '/' ? 'home' : path.slice(1)
    const png = await page.screenshot({ fullPage: true })
    writeFileSync(resolve(SHOTS, `${name}.png`), png)
    console.log('local', name, 'ok')
  }
  await b.close()
}

if (flag('--press')) await press()
if (flag('--posters')) await posters(String(flag('--posters')).split(','))
if (flag('--art')) await art(String(flag('--art')).split(','))
if (flag('--local')) await local(String(flag('--local')))
if (args.length === 0) console.log('usage: --press | --posters ids | --art name=url,... | --local base')
