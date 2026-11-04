// The social card: paper, the name in display type, the portrait at the
// right, one clay full stop. Writes public/og.jpg at 1200x630.
//
//   node scripts/og-image.mjs
//
// sharp is borrowed from a sibling project; override with SHARP_ROOT.
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SHARP = process.env.SHARP_ROOT ?? resolve(root, '../margaret-hunt-neo-ui/node_modules/sharp/lib/index.js')
const { default: sharp } = await import(pathToFileURL(SHARP).href)

const W = 1200
const H = 630
const portrait = await sharp(resolve(root, 'public/img/portrait-c.jpg')).resize(420, 630, { fit: 'cover', position: 'top' }).toBuffer()

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#fbf9f5"/>
  <line x1="64" y1="72" x2="716" y2="72" stroke="#e4dfd5" stroke-width="1"/>
  <text x="64" y="58" font-family="Menlo, Consolas, monospace" font-size="15" letter-spacing="1.5" fill="#7a7268">KEYNOTES · WORKSHOPS · FACILITATION</text>
  <text x="60" y="230" font-family="Helvetica Neue, Arial, sans-serif" font-size="88" font-weight="300" letter-spacing="-4" fill="#1a1613">Landon</text>
  <text x="60" y="322" font-family="Helvetica Neue, Arial, sans-serif" font-size="88" font-weight="300" letter-spacing="-4" fill="#1a1613">Mascareñaz<tspan fill="#b4401f">.</tspan></text>
  <text x="64" y="400" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" fill="#3e3733">Democracy, economic mobility and leadership.</text>
  <text x="64" y="540" font-family="Menlo, Consolas, monospace" font-size="14" letter-spacing="1.2" fill="#7a7268">FOUNDING CEO, COURAGEOUS COLORADO</text>
  <text x="64" y="566" font-family="Menlo, Consolas, monospace" font-size="14" letter-spacing="1.2" fill="#7a7268">CO-AUTHOR, THE OPEN SYSTEM (HARVARD EDUCATION PRESS)</text>
  <line x1="64" y1="516" x2="716" y2="516" stroke="#e4dfd5" stroke-width="1"/>
</svg>`

await sharp(Buffer.from(svg))
  .composite([{ input: portrait, left: W - 420, top: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(resolve(root, 'public/og.jpg'))
console.log('wrote public/og.jpg')
