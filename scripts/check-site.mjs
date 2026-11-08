#!/usr/bin/env node
/** Validate the actual build: routes, fragments, assets, language pairs and public catalog contracts. */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const errors = [];
const reviewed = [];
const read = (path) => readFileSync(path, 'utf8');
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]);
}
function decode(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}
function target(pathname) {
  const path = decodeURIComponent(pathname);
  if (path === '/') return join(dist, 'zh/index.html');
  const direct = join(dist, path);
  if (existsSync(direct) && !path.endsWith('/')) {
    // A directory without a trailing slash is resolved below.
    try { readFileSync(direct); return direct; } catch { /* directory */ }
  }
  return join(direct, 'index.html');
}
if (!existsSync(dist)) throw new Error('Run npm run build before checking the site.');
const htmlFiles = files(dist).filter((path) => path.endsWith('.html') && !path.includes('/pagefind/'));
for (const path of htmlFiles) {
  const html = read(path);
  const route = '/' + path.slice(dist.length + 1).replace(/index\.html$/, '');
  if (path.endsWith('/404.html')) continue;
  const h1 = [...html.matchAll(/<h1(?:\s|>)/g)].length;
  if (h1 !== 1 && !(route === '/' && html.includes('http-equiv="refresh"'))) errors.push(`${route}: expected one h1, found ${h1}`);
  if (html.includes('This content is not available in your language yet')) errors.push(`${route}: locale fallback`);
  let links = 0;
  let images = 0;
  for (const match of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const [, attr, raw] = match;
    const value = decode(raw);
    if (!value || /^(data:|mailto:|tel:|javascript:)/.test(value)) continue;
    const url = new URL(value, 'https://octafuse.dev' + route);
    if (url.origin !== 'https://octafuse.dev') continue;
    const destination = target(url.pathname);
    if (!existsSync(destination)) { errors.push(`${route}: missing ${attr} ${value}`); continue; }
    if (attr === 'src') images++; else links++;
    if (url.hash && destination.endsWith('.html')) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (id && ![...read(destination).matchAll(/\sid="([^"]*)"/g)].some((x) => decode(x[1]) === id)) errors.push(`${route}: missing fragment ${value}`);
    }
  }
  reviewed.push({ path: route, h1, links, images });
}
const docs = join(root, 'src/content/docs');
const pairs = files(join(docs, 'zh')).filter((x) => x.endsWith('.mdx')).map((x) => x.slice(join(docs, 'zh').length));
const en = new Set(files(join(docs, 'en')).filter((x) => x.endsWith('.mdx')).map((x) => x.slice(join(docs, 'en').length)));
for (const path of pairs) {
  if (!en.delete(path)) errors.push(`Missing English page: ${path}`);
  if (path.startsWith('/docs/') && path !== '/docs/github-reference.mdx') {
    for (const lang of ['zh', 'en']) {
      const body = read(join(docs, lang, path));
      if (!body.includes('gatewayRef: ' + JSON.parse(read(join(root, 'sync/manifest.json'))).ref)) errors.push(`Review source version missing: ${lang}${path}`);
    }
  }
}
for (const path of en) errors.push(`Missing Chinese page: ${path}`);
const manifest = JSON.parse(read(join(root, 'sync/manifest.json')));
for (const name of ['models', 'providers']) {
  const catalog = JSON.parse(read(join(root, `src/data/catalog/${name}.json`)));
  for (const alias of [`api/catalog/${name}`, `catalog/${name}.json`]) {
    if (!existsSync(join(dist, alias))) { errors.push(`Missing public JSON alias: ${alias}`); continue; }
    const result = JSON.parse(read(join(dist, alias)));
    if (JSON.stringify(result) !== JSON.stringify(catalog)) errors.push(`Catalog differs: ${alias}`);
  }
  if (catalog.source.ref !== manifest.ref || catalog.source.commit !== manifest.commit || catalog.count !== catalog.items.length) errors.push(`Catalog source/count mismatch: ${name}`);
  if (name === 'providers') for (const item of catalog.items) {
    if (Object.keys(item.endpoints).some((protocol) => !item.protocols.includes(protocol))) errors.push(`Omitted provider protocol: ${item.name}`);
  }
}
const report = { pages: reviewed.length, languagePairs: pairs.length, errors, reviewed };
const output = process.argv.indexOf('--report');
if (output >= 0) writeFileSync(resolve(process.argv[output + 1]), JSON.stringify(report, null, 2) + '\n');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Verified ${reviewed.length} HTML pages, ${pairs.length} language pairs, internal links/fragments/assets and 4 catalog JSON aliases.`);
