import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, statSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, isAbsolute, join, relative, resolve, sep, win32 } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const markdownLinks = /\[[^\]]*\]\(([^\s)]+)\)/g;
const entries = readdirSync(root, { recursive: true })
  .filter(name => basename(name) === 'SKILL.md' && !name.split(sep).includes('.git'))
  .map(name => resolve(root, name));

function localReference(document, target, bundle) {
  if (/^(?:https?|mailto):/i.test(target) || target.startsWith('#')) return null;
  const local = decodeURIComponent(target.split(/[?#]/, 1)[0]);
  if (/^[a-z][a-z0-9+.-]*:/i.test(target) || isAbsolute(local)
      || win32.isAbsolute(local) || /^[a-z]:/i.test(local)) {
    throw new Error(`Non-portable filesystem link: ${target}`);
  }
  const candidate = resolve(dirname(document), local);
  if (!existsSync(candidate) || !statSync(candidate).isFile()) {
    throw new Error(`Missing skill resource: ${target}`);
  }
  const resource = realpathSync(candidate);
  const location = relative(realpathSync(bundle), resource);
  if (location === '..' || location.startsWith(`..${sep}`) || isAbsolute(location)) {
    throw new Error(`Missing or escaping skill resource: ${target}`);
  }
  return resource;
}

function withTemporaryBundle(callback) {
  const parent = resolve(tmpdir());
  const bundle = mkdtempSync(join(parent, 'github-first-reuse-'));
  try {
    callback(bundle, join(bundle, 'SKILL.md'));
  } finally {
    assert.equal(dirname(resolve(bundle)), parent, 'Temporary directory escaped its parent');
    assert.ok(basename(bundle).startsWith('github-first-reuse-'));
    rmSync(bundle, { recursive: true });
  }
}

test('one authoritative skill entrypoint', () => {
  assert.equal(entries.length, 1, `Duplicate skill entrypoints: ${entries}`);
});

test('supporting documents are portable and discoverable', () => {
  for (const entry of entries) {
    const bundle = dirname(entry);
    const reached = new Set();
    const pending = [localReference(entry, 'SKILL.md', bundle)];
    while (pending.length) {
      const document = pending.pop();
      if (reached.has(document)) continue;
      reached.add(document);
      for (const [, target] of readFileSync(document, 'utf8').matchAll(markdownLinks)) {
        const resource = localReference(document, target, bundle);
        if (resource?.endsWith('.md')) pending.push(resource);
      }
    }
    const documents = readdirSync(bundle, { recursive: true })
      .filter(name => name.endsWith('.md')).map(name => realpathSync(resolve(bundle, name)));
    assert.deepEqual(documents.filter(document => !reached.has(document)), [], 'Unreachable references');
  }
});

test('local filesystem URLs and absolute paths are rejected', () => {
  withTemporaryBundle((bundle, document) => {
    for (const target of ['file:///C:/outside/missing.md', 'C:/outside/missing.md', 'C%3A/outside/missing.md', '/outside/missing.md']) {
      assert.throws(() => localReference(document, target, bundle), undefined, target);
    }
  });
});

test('relative resources and public sources remain usable', () => {
  withTemporaryBundle((bundle, document) => {
    const reference = join(bundle, 'reference.md');
    writeFileSync(reference, 'Evidence checklist', 'utf8');
    assert.equal(localReference(document, 'reference.md#evidence', bundle), reference);
    assert.equal(localReference(document, 'https://example.org/source', bundle), null);
    for (const target of ['missing.md', '../outside.md']) {
      assert.throws(() => localReference(document, target, bundle), undefined, target);
    }
  });
});

test('junctions and symlinks cannot escape the skill bundle', () => {
  withTemporaryBundle(temporary => {
    const bundle = join(temporary, 'package');
    const outside = join(temporary, 'outside');
    mkdirSync(bundle);
    mkdirSync(outside);
    writeFileSync(join(outside, 'evidence.md'), 'Outside the skill', 'utf8');
    symlinkSync(outside, join(bundle, 'escape'), process.platform === 'win32' ? 'junction' : 'dir');
    assert.throws(() => localReference(join(bundle, 'SKILL.md'), 'escape/evidence.md', bundle));
  });
});
