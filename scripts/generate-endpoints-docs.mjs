#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import { globby } from 'globby';
import path from 'node:path';

const API_ROOT = 'src/app/api';
const OUTPUT_DIR = 'docs/endpoints';

function normalizeRoute(file) {
  // Convert Next.js route file path to URL path
  const rel = file.replace(/^src\/app\/api\//, '');
  const noFile = rel.replace(/\/route\.ts$/, '');
  const url = '/' + noFile
    .replace(/\[\.\.\.([^/]+)\]/g, ':$1*')
    .replace(/\[([^/]+)\]/g, ':$1');
  return url;
}

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

function extractMethods(source) {
  const methods = [];
  const regex = /export\s+async\s+function\s+(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\s*\(/g;
  const regexConst = /export\s+(const|let|var)\s+(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\s*=\s*async\s*\(/g;
  let m;
  while ((m = regex.exec(source))) methods.push(m[1]);
  while ((m = regexConst.exec(source))) methods.push(m[2]);
  return Array.from(new Set(methods));
}

function extractZodSchemas(source) {
  const hasZod = source.includes('zod') || source.includes("from 'zod'");
  if (!hasZod) return null;
  // naive: list identifiers that look like *Schema
  const schemaNames = Array.from(source.matchAll(/\b([A-Za-z0-9_]+Schema)\b/g)).map(m => m[1]);
  return Array.from(new Set(schemaNames));
}

function extractResponseHelpers(source) {
  const helpers = [];
  if (source.includes('createSuccessResponse')) helpers.push('createSuccessResponse');
  if (source.includes('createErrorResponse')) helpers.push('createErrorResponse');
  return helpers;
}

async function main() {
  const files = await globby([`${API_ROOT}/**/route.ts`]);
  await ensureDir(OUTPUT_DIR);

  const indexLines = ['# API Endpoints', ''];

  for (const file of files.sort()) {
    const src = await readFileSafe(file);
    const methods = extractMethods(src);
    const url = normalizeRoute(file);
    const schemas = extractZodSchemas(src);
    const helpers = extractResponseHelpers(src);

    const relDoc = path.join(OUTPUT_DIR, `${url.replace(/\//g, '_').replace(/^_/, '') || 'root'}.md`);
    await ensureDir(path.dirname(relDoc));

    const lines = [];
    lines.push(`# ${url}`);
    lines.push('');
    lines.push(`- **file**: \`${file}\``);
    lines.push(`- **methods**: ${methods.length ? methods.map(m => `\`${m}\``).join(', ') : '_none detected_'}`);
    if (schemas && schemas.length) {
      lines.push(`- **schemas**: ${schemas.map(s => `\`${s}\``).join(', ')}`);
    }
    if (helpers.length) {
      lines.push(`- **response helpers**: ${helpers.map(h => `\`${h}\``).join(', ')}`);
    }
    lines.push('');

    for (const method of methods) {
      lines.push(`## ${method}`);
      lines.push('');
      lines.push('Example request:');
      lines.push('');
      lines.push('```bash');
      lines.push(`curl -X ${method} "$BASE_URL${url}" -H "Content-Type: application/json" -d '{ }'`);
      lines.push('```');
      lines.push('');
    }

    await fs.writeFile(relDoc, lines.join('\n'), 'utf8');
    indexLines.push(`- [${url}](${path.relative('docs', relDoc).replace(/\\/g, '/')})`);
  }

  await fs.writeFile(path.join('docs', 'ENDPOINTS.md'), indexLines.join('\n'), 'utf8');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
