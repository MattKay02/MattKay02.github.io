// One-off image optimizer for the portfolio.
//
// Re-encodes every raster image under src/assets to WebP, downscaling anything
// wider than it ever renders, then removes the original. The committed .webp
// files are what ship — this script is a LOCAL dev tool and is NOT part of the
// build or CI (GitHub Actions just runs `vite build` over the .webp output).
//
// `sharp` is intentionally NOT a dependency of this repo. It's loaded from a
// sibling project that already has it installed, so we add no native build dep
// to the deploy pipeline:
//
//   node scripts/optimize-images.mjs            # convert + delete originals
//   node scripts/optimize-images.mjs --dry-run  # report only, touch nothing
//
// Re-run it whenever new screenshots are added to src/assets.

import { readdirSync, statSync, unlinkSync, existsSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'
import { join, extname, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

// Pull sharp from the sibling project that has it installed.
const require = createRequire(import.meta.url)
const SHARP_PATH = 'C:/Projects/frunt-web/node_modules/sharp'
let sharp
try {
  sharp = require(SHARP_PATH)
} catch {
  console.error(`Could not load sharp from ${SHARP_PATH}.`)
  console.error('Point SHARP_PATH at any project that has sharp installed.')
  process.exit(1)
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ASSETS = join(ROOT, 'src', 'assets')
const DRY = process.argv.includes('--dry-run')

const RASTER = new Set(['.png', '.jpg', '.jpeg'])
const QUALITY = 80

// Max rendered width per image class — never upscale (withoutEnlargement).
// Phone screenshots render small; the hero is a fixed ~340px box; long
// screenshots and dashboards are the only things that need real width.
function maxWidthFor(relPath) {
  const p = relPath.replace(/\\/g, '/')
  if (p.includes('/hero/')) return 760            // headshot, ~340px box @2x
  if (p.includes('/passions/')) return 900        // about-me deck cards
  if (p.includes('/Frunt/mobile/')) return 560    // portrait phone showcase
  if (p.includes('/Liftio/')) return 560          // portrait phone showcase
  if (p.includes('/FootyScores/')) return 700     // portrait phone, side-by-side
  return 1280                                      // dashboards + long screenshots
}

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else if (RASTER.has(extname(name).toLowerCase())) out.push(full)
  }
  return out
}

const files = walk(ASSETS)
let beforeTotal = 0
let afterTotal = 0
const rows = []
const failedDeletes = []

for (const file of files) {
  const rel = file.slice(ASSETS.length + 1)
  const cap = maxWidthFor(rel)
  const beforeBytes = statSync(file).size
  beforeTotal += beforeBytes

  const img = sharp(file)
  const meta = await img.metadata()
  const resize = meta.width > cap ? { width: cap, withoutEnlargement: true } : null

  const outPath = join(dirname(file), basename(file, extname(file)) + '.webp')

  let pipeline = sharp(file)
  if (resize) pipeline = pipeline.resize(resize)
  const buf = await pipeline.webp({ quality: QUALITY, effort: 5 }).toBuffer()
  afterTotal += buf.length

  rows.push({
    file: rel,
    from: `${(beforeBytes / 1024).toFixed(0)}KB`,
    to: `${(buf.length / 1024).toFixed(0)}KB`,
    dims: `${meta.width}px${resize ? ` → ${cap}px` : ''}`,
  })

  if (!DRY) {
    await pipeline.webp({ quality: QUALITY, effort: 5 }).toFile(outPath)
    // Windows can briefly lock a freshly written file (AV/indexer) — retry the
    // delete of the original a few times before giving up.
    if (existsSync(outPath) && outPath !== file) {
      let deleted = false
      for (let attempt = 0; attempt < 6; attempt++) {
        try { unlinkSync(file); deleted = true; break }
        catch { await sleep(300) }
      }
      if (!deleted) failedDeletes.push(rel)
    }
  }
}

rows.sort((a, b) => parseFloat(b.from) - parseFloat(a.from))
for (const r of rows) {
  console.log(`${r.from.padStart(7)} → ${r.to.padStart(7)}  ${r.dims.padEnd(18)} ${r.file}`)
}
console.log('\n' + '─'.repeat(60))
console.log(`${files.length} images`)
console.log(`before: ${(beforeTotal / 1048576).toFixed(1)} MB`)
console.log(`after:  ${(afterTotal / 1048576).toFixed(1)} MB`)
console.log(`saved:  ${((1 - afterTotal / beforeTotal) * 100).toFixed(1)}%`)
if (DRY) console.log('\n(dry run — no files written)')
if (failedDeletes.length) {
  console.log(`\n⚠ ${failedDeletes.length} original(s) converted but could not be deleted (file locked):`)
  failedDeletes.forEach((f) => console.log(`  - ${f}`))
  console.log('  Their .webp exist; delete the stale originals manually.')
}
