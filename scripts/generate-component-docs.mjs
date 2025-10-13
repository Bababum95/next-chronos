#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import { globby } from 'globby';
import path from 'node:path';

const SRC_DIRS = ['src/components', 'src/entities', 'src/features'];
const OUTPUT_DIR = 'docs/components';

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function readFileSafe(p) {
  try {
    return await fs.readFile(p, 'utf8');
  } catch {
    return '';
  }
}

function isComponentExport(source) {
  // naive detection: export function X(...): JSX and export const X = () => (
  return /export\s+(const|function)\s+[A-Z][A-Za-z0-9_]*\s*(=\s*\(|\()/.test(source);
}

function extractComponents(source) {
  const names = new Set();
  const reFn = /export\s+function\s+([A-Z][A-Za-z0-9_]*)\s*\(/g;
  const reConst = /export\s+const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*\(/g;
  let m;
  while ((m = reFn.exec(source))) names.add(m[1]);
  while ((m = reConst.exec(source))) names.add(m[1]);
  return Array.from(names);
}

function extractPropsInterface(source, componentName) {
  // naive find of interface/ type named `${Name}Props`
  const ifaceRe = new RegExp(`(export\\s+)?(interface|type)\\s+${componentName}Props\\b[\
\\s\\S]*?{([\\s\\S]*?)}`);
  const m = ifaceRe.exec(source);
  if (!m) return null;
  const body = m[3] || '';
  const props = body
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(l => l.replace(/;$/,'').replace(/\/\/.*$/,'').trim())
    .filter(l => l.includes(':'))
    .map(l => '- `' + l + '`');
  return props;
}

async function main() {
  await ensureDir(OUTPUT_DIR);
  const files = await globby([
    ...SRC_DIRS.map(d => `${d}/**/*.{ts,tsx}`),
    '!**/*.test.*',
    '!**/*.stories.*'
  ]);

  const indexLines = ['# Components & Hooks', ''];

  for (const file of files.sort()) {
    if (!file.endsWith('.tsx')) continue;
    const src = await readFileSafe(file);
    if (!isComponentExport(src)) continue;
    const names = extractComponents(src);
    if (!names.length) continue;

    const rel = path.relative('src', file);
    const docName = rel.replace(/\//g, '_').replace(/\.[tj]sx?$/, '') + '.md';
    const outPath = path.join(OUTPUT_DIR, docName);
    await ensureDir(path.dirname(outPath));

    const lines = [];
    lines.push(`# ${rel}`);
    lines.push('');
    lines.push(`- **file**: \`${file}\``);
    lines.push(`- **exports**: ${names.map(n => `\`${n}\``).join(', ')}`);
    lines.push('');

    for (const name of names) {
      lines.push(`## ${name}`);
      const propLines = extractPropsInterface(src, name);
      if (propLines && propLines.length) {
        lines.push('');
        lines.push('Props:');
        lines.push('');
        lines.push(...propLines);
        lines.push('');
      }
      lines.push('Usage:');
      lines.push('');
      lines.push('```tsx');
      lines.push(`import { ${name} } from '${relativeImportPath(file)}';`);
      lines.push('');
      lines.push(`export default function Example() {`);
      lines.push(`  return <${name} />;`);
      lines.push('}');
      lines.push('```');
      lines.push('');
    }

    await fs.writeFile(outPath, lines.join('\n'), 'utf8');
    indexLines.push(`- [${rel}](${path.relative('docs', outPath).replace(/\\/g, '/')})`);
  }

  await fs.writeFile(path.join('docs', 'COMPONENTS.md'), indexLines.join('\n'), 'utf8');
}

function relativeImportPath(absPath) {
  const rel = path.relative('src', absPath).replace(/\.[tj]sx?$/, '');
  return '@/'+ rel.replace(/\\/g, '/');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
