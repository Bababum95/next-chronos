#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';

async function ensureDir(dir) { await fs.mkdir(dir, { recursive: true }); }

async function main() {
  await ensureDir('docs');
  const lines = [
    '# Project Documentation',
    '',
    '- [API Endpoints](ENDPOINTS.md)',
    '- [Components](COMPONENTS.md)',
    '- [Functions](FUNCTIONS.md)',
    '- [API Reference (TypeDoc)](api/index.md)'
  ];
  await fs.writeFile(path.join('docs', 'README.md'), lines.join('\n'), 'utf8');
}

main().catch(err => { console.error(err); process.exit(1); });
