import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../site/index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../site/assets/css/site.css', import.meta.url), 'utf8');

test('homepage exposes the confirmed research and project sections', () => {
  for (const text of ['材料如何成为解释？', '从数字存史到数智释史', '跨国抗战档案平台', '革命历史文件语料']) {
    assert.match(html, new RegExp(text));
  }
  assert.match(html, /lang="zh-CN"/);
  assert.match(html, /meta name="description"/);
});

test('homepage has accessible navigation and responsive styling', () => {
  assert.match(html, /<nav[^>]*aria-label="主导航"/);
  assert.match(html, /<button[^>]*aria-expanded="false"/);
  assert.match(css, /@media \(max-width: 720px\)/);
});
