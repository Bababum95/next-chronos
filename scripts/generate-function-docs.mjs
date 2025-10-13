#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import { globby } from 'globby';
import path from 'node:path';

const OUTPUT_DIR = 'docs/functions';

async function ensureDir(dir) { await fs.mkdir(dir, { recursive: true }); }
async function readFileSafe(p) { try { return await fs.readFile(p, 'utf8'); } catch { return ''; } }

function extractTopLevelExports(source) {
  const names = new Set();
  // export function foo(
  const reFn = /export\s+function\s+([a-zA-Z_][A-Za-z0-9_]*)\s*\(/g;
  // export const foo = (
  const reConst = /export\s+const\s+([a-zA-Z_][A-Za-z0-9_]*)\s*=\s*(async\s*)?\(/g;
  let m;
  while ((m = reFn.exec(source))) names.add(m[1]);
  while ((m = reConst.exec(source))) names.add(m[1]);
  return Array.from(names);
}

async function main() {
  await ensureDir(OUTPUT_DIR);
  const files = await globby([
    'src/lib/**/*.{ts,tsx}',
    'src/features/**/*.{ts,tsx}',
    'src/entities/**/*.{ts,tsx}',
    '!**/*.test.*', '!**/*.stories.*'
  ]);

  const indexLines = ['# Public Functions & Hooks', ''];

  for (const file of files.sort()) {
    const src = await readFileSafe(file);
    const names = extractTopLevelExports(src);
    if (!names.length) continue;

    const rel = path.relative('src', file);
    const outPath = path.join(OUTPUT_DIR, rel.replace(/\//g, '_').replace(/\.[tj]sx?$/, '') + '.md');
    await ensureDir(path.dirname(outPath));

    const lines = [];
    lines.push(`# ${rel}`);
    lines.push('');
    lines.push(`- **file**: \`${file}\``);
    lines.push(`- **exports**: ${names.map(n => `\`${n}\``).join(', ')}`);
    lines.push('');

    for (const name of names) {
      lines.push(`## ${name}`);
      lines.push('');
      lines.push('Usage:');
      lines.push('');
      lines.push('```ts');
      lines.push(`import { ${name} } from '${relativeImportPath(file)}';`);
      lines.push('');
      lines.push('// Example');
      lines.push(`const result = await ${name}(/* params */);`);
      lines.push('```');
      lines.push('');
    }

    await fs.writeFile(outPath, lines.join('\n'), 'utf8');
    indexLines.push(`- [${rel}](${path.relative('docs', outPath).replace(/\\/g, '/')})`);
  }

  await fs.writeFile(path.join('docs', 'FUNCTIONS.md'), indexLines.join('\n'), 'utf8');
}

function relativeImportPath(absPath) {
  const rel = path.relative('src', absPath).replace(/\.[tj]sx?$/, '');
  return '@/'+ rel.replace(/\\/g, '/');
}

main().catch(err => { console.error(err); process.exit(1); });
