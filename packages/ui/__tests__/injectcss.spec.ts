import { readFileSync } from 'node:fs'
import { mkdtemp, rm, writeFile, mkdir, readFile, symlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { build } from 'vite'
import {
  INJECT_MARKER,
  replaceInjectMarker,
} from '../injectcss.js'

const pkg = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')) as {
  sideEffects: string[];
}

async function buildConsumerBundle(options: {
  packageName: string;
  sideEffects: string[];
}) {
  const root = await mkdtemp(join(tmpdir(), 'indielayer-sideeffects-'))

  try {
    const pkgDir = join(root, 'pkg')
    const appDir = join(root, 'app')
    const libDir = join(pkgDir, 'lib')

    await mkdir(libDir, { recursive: true })
    await mkdir(join(appDir, 'node_modules'), { recursive: true })

    await writeFile(join(pkgDir, 'package.json'), JSON.stringify({
      name: options.packageName,
      type: 'module',
      main: 'lib/index.js',
      module: 'lib/index.js',
      exports: {
        '.': {
          import: './lib/index.js',
        },
      },
      sideEffects: options.sideEffects,
    }, null, 2))

    await writeFile(join(libDir, 'button.js'), `
export function Button() {
  return 'button'
}
`)

    await writeFile(
      join(libDir, 'index.js'),
      replaceInjectMarker(
        `export { Button } from './button.js'\n${INJECT_MARKER}\n`,
        ['._button_test{color:var(--x-button-bg)}'],
      )!,
    )

    await symlink(pkgDir, join(appDir, 'node_modules', options.packageName))

    await writeFile(join(appDir, 'main.js'), `
import { Button } from '${options.packageName}'
console.log(Button())
`)

    const outDir = join(appDir, 'dist')

    await build({
      root: appDir,
      logLevel: 'error',
      build: {
        outDir,
        write: true,
        minify: true,
        rollupOptions: {
          input: join(appDir, 'main.js'),
          output: {
            format: 'es',
            entryFileNames: 'bundle.js',
          },
        },
      },
    })

    return await readFile(join(outDir, 'bundle.js'), 'utf8')
  } finally {
    await rm(root, { recursive: true, force: true })
  }
}

describe('lib CSS inject / Vite 8 sideEffects', () => {
  it('marks JS CSS injection entries as side effects', () => {
    expect(pkg.sideEffects).toEqual(expect.arrayContaining([
      '*.css',
      './exports/tailwind.css',
      './lib/index.js',
      './lib/index.umd.js',
    ]))
  })

  it.each([
    ['double quotes', 'console.warn("__INJECT__")'],
    ['single quotes', 'console.warn(\'__INJECT__\')'],
    ['template literal', 'console.warn(`__INJECT__`)'],
  ])('replaces inject marker with %s', (_label, marker) => {
    const code = `export const x = 1;\n${marker}\n`
    const next = replaceInjectMarker(code, ['.btn{color:red}'])

    expect(next).toContain('styleInject')
    expect(next).toContain('.btn{color:red}')
    expect(next).not.toContain('__INJECT__')
  })

  it('returns null when the marker is absent', () => {
    expect(replaceInjectMarker('export const x = 1', ['.a{}'])).toBeNull()
  })

  it('throws when __INJECT__ is present but the marker shape is unknown', () => {
    expect(() => replaceInjectMarker('void "__INJECT__"', ['.a{}'])).toThrow(
      /failed to replace __INJECT__ marker/,
    )
  })

  it('keeps styleInject CSS under Vite 8 when package sideEffects include the entry', async () => {
    const bundle = await buildConsumerBundle({
      packageName: 'fake-ui',
      sideEffects: pkg.sideEffects,
    })

    expect(bundle).toContain('--x-button-bg')
    expect(bundle).toMatch(/createElement\(["'`]style["'`]\)/)
  }, 30_000)

  it('drops styleInject CSS under Vite 8 when only CSS is marked as a side effect', async () => {
    const bundle = await buildConsumerBundle({
      packageName: 'fake-ui-broken',
      // Historical broken contract that Vite 8 / Rolldown tree-shakes away.
      sideEffects: ['./exports/tailwind.css'],
    })

    expect(bundle).not.toContain('--x-button-bg')
  }, 30_000)
})
