#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PATTERN_METADATA } from '../src/symphonia/registry/metadata'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const outPath = resolve(repoRoot, 'src/symphonia/registry/symphonia.manifest.json')

const manifest = {
  version: 1,
  generatedAt: new Date().toISOString(),
  patterns: PATTERN_METADATA.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    goodFor: p.goodFor,
    collections: p.collections,
    styles: p.styles,
    status: p.status,
    component: p.component,
    runtime: p.runtime,
    weight: p.weight,
    accessibility: p.accessibility,
    files: p.files,
    packages: p.packages,
    prompt: p.prompt,
  })),
}

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, JSON.stringify(manifest, null, 2))

const count = manifest.patterns.length
console.log(`symphonia.manifest.json — ${count} patterns → ${outPath}`)
