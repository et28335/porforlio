import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../site/index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../site/assets/css/site.css', import.meta.url), 'utf8');

test('homepage opens with the confirmed HYI profile and then projects', () => {
  for (const text of [
    'HARVARD-YENCHING INSTITUTE',
    '马思宇',
    'Siyu Ma',
    'Visiting Scholar',
    'Nankai University',
    'Aug 2026 – May 2027',
    '从数字存史到数智释史',
    '跨国抗战档案平台',
    '革命历史文件语料',
  ]) {
    assert.match(html, new RegExp(text));
  }

  assert.match(html, /<section class="profile-hero" id="top"/);
  assert.match(html, /<img[^>]*src="https:\/\/www\.harvard-yenching\.org\/wp-content\/uploads\/2026\/07\/MA-Siyu\.jpg"[^>]*alt="马思宇，哈佛燕京学社访问学者"/);
  assert.ok(html.indexOf('class="profile-hero"') < html.indexOf('class="section projects"'));
  assert.ok(html.indexOf('class="section projects"') < html.indexOf('class="section research"'));

  assert.match(html, /lang="zh-CN"/);
  assert.match(html, /meta name="description"/);
});

test('homepage has accessible navigation and responsive styling', () => {
  assert.match(html, /<nav[^>]*aria-label="主导航"/);
  assert.match(html, /<button[^>]*aria-expanded="false"/);
  assert.match(css, /@media \(max-width: 720px\)/);
});
