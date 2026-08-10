/**
 * Writes public/block-manifest.json from the block registry.
 *
 * The portal editor needs to know which blocks exist and what fields they
 * take, but it cannot import this repo's React components. Publishing the
 * schema as a static file keeps the two in step without a shared package:
 * the editor only ever offers blocks the deployed site can actually render.
 *
 * Run as part of build, so the manifest can never describe a build that is not
 * the one being deployed.
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(here, '..')

// The registry imports React components, which cannot run in plain node. The
// schema is parsed out of the source instead of importing it - slower to write
// but it keeps the registry as the single source of truth rather than making
// someone maintain a duplicate list here.
const registryPath = path.join(repoRoot, 'src/blocks/registry.js')

async function main() {
  const { getBlockManifest } = await import(
    `data:text/javascript,${encodeURIComponent(await buildSchemaModule(registryPath))}`
  )

  const manifest = {
    generatedAt: new Date().toISOString(),
    blocks: getBlockManifest(),
  }

  // The built-in page documents travel with the manifest. The portal imports
  // these to seed a page's first draft, so the editor opens on the real page
  // instead of an empty canvas - and it stays correct as these pages change,
  // because the export is generated from the same source the site renders.
  manifest.documents = await collectDocuments()

  const outDir = path.join(repoRoot, 'public')
  mkdirSync(outDir, { recursive: true })
  writeFileSync(
    path.join(outDir, 'block-manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
  )
  console.log(`Generated public/block-manifest.json (${manifest.blocks.length} blocks)`)
}

/**
 * Strip the component imports and references so the schema can be evaluated on
 * its own, without React or JSX.
 */
async function buildSchemaModule(sourcePath) {
  const { readFileSync } = await import('node:fs')
  const source = readFileSync(sourcePath, 'utf8')

  return source
    // drop the import statements for components
    .replace(/^import[\s\S]*?from\s+'[^']+'\n/gm, '')
    // drop `component: X,` lines - the values no longer exist
    .replace(/^\s*component:\s*\w+,\s*$/gm, '')
}

async function collectDocuments() {
  const { readdirSync, readFileSync } = await import('node:fs')
  const dir = path.join(repoRoot, 'src/blocks/documents')

  let files = []
  try {
    files = readdirSync(dir).filter((name) => name.endsWith('.js'))
  } catch {
    return {}
  }

  const documents = {}
  for (const file of files) {
    const source = readFileSync(path.join(dir, file), 'utf8')
    const module = await import(
      `data:text/javascript,${encodeURIComponent(source)}`
    )
    const doc = module.default
      || Object.values(module).find((value) => value && Array.isArray(value.blocks))
    if (doc) documents[path.basename(file, '.js')] = doc
  }
  return documents
}

main().catch((error) => {
  console.error('Could not generate the block manifest:', error)
  process.exit(1)
})
