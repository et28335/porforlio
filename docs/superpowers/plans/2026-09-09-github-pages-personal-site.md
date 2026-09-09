# GitHub Pages Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a polished static academic personal site at `https://et28335.github.io/porforlio/`.

**Architecture:** A dependency-free static site keeps editorial markup in `site/index.html`, visual rules in `site/assets/css/site.css`, and a small progressive-enhancement navigation controller in `site/assets/js/site.js`. A GitHub Actions workflow uploads only the site directory to GitHub Pages whenever `main` changes.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node built-in test runner, GitHub Actions, GitHub Pages.

---

## File structure

- Create: `site/index.html` — semantic Chinese-first homepage and metadata.
- Create: `site/assets/css/site.css` — responsive editorial visual system.
- Create: `site/assets/js/site.js` — mobile-menu and year enhancement.
- Create: `site/assets/img/README.md` — reserves image folder without inventing personal imagery.
- Create: `tests/site.test.mjs` — static-content regression checks.
- Create: `.github/workflows/pages.yml` — test and deploy the `site/` directory.
- Modify: `.gitignore` — retain the existing brainstorm exclusion; no build output is created.

### Task 1: Define a failing content contract

**Files:**
- Create: `tests/site.test.mjs`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/site.test.mjs`  
Expected: `ENOENT` because `site/index.html` does not exist.

- [ ] **Step 3: Commit the test**

```powershell
git add tests/site.test.mjs
git commit -m "test: define personal site content contract"
```

### Task 2: Create the semantic homepage and visual system

**Files:**
- Create: `site/index.html`
- Create: `site/assets/css/site.css`
- Create: `site/assets/js/site.js`
- Create: `site/assets/img/README.md`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Implement `site/index.html`**

Create a single semantic page containing: a labelled top navigation; a hero headed `材料如何成为解释？`; `研究` and `项目` anchors; the three approved project cards; an academic profile using confirmed Harvard-Yenching information; a contact link; and a footer. Include `lang="zh-CN"`, UTF-8, viewport, description, canonical URL `https://et28335.github.io/porforlio/`, stylesheet and deferred script links. Use normal text in place of a personal portrait and mark all project links as `href="#"` with `aria-disabled="true"` until real project URLs are supplied.

- [ ] **Step 2: Implement `site/assets/css/site.css`**

Define the approved palette (`#081d2a`, `#f2efe7`, `#72d3cf`), a serif display stack, generous editorial spacing, an asymmetric project grid, and a single responsive breakpoint at 720px that changes the desktop grid to one column and exposes the mobile menu. Include visible `:focus-visible` styles and `prefers-reduced-motion` handling.

- [ ] **Step 3: Implement `site/assets/js/site.js`**

```js
const menuButton = document.querySelector('[data-menu-button]');
const navLinks = document.querySelector('[data-nav-links]');

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navLinks?.classList.toggle('is-open', !expanded);
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
```

- [ ] **Step 4: Add the image-directory note**

Create `site/assets/img/README.md` with: `Place only confirmed, rights-cleared personal or project images in this directory.`

- [ ] **Step 5: Run the test to verify it passes**

Run: `node --test tests/site.test.mjs`  
Expected: 2 passing tests and exit code 0.

- [ ] **Step 6: Open and inspect the page locally**

Run: `python -m http.server 8000 --directory site` and inspect `http://localhost:8000/` at 375px, 768px, and 1440px. Confirm no clipped hero title, unreadable text, hidden navigation, or horizontal scrolling.

- [ ] **Step 7: Commit the site**

```powershell
git add site tests/site.test.mjs
git commit -m "feat: build academic personal homepage"
```

### Task 3: Add Pages automation

**Files:**
- Create: `.github/workflows/pages.yml`
- Test: `.github/workflows/pages.yml`

- [ ] **Step 1: Create the deployment workflow**

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v5
        with:
          node-version: 22
      - run: node --test tests/site.test.mjs
  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v6
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v4
        with:
          path: site
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Validate the workflow structure locally**

Run: `rg -n "upload-pages-artifact|path: site|deploy-pages|node --test" .github/workflows/pages.yml`  
Expected: all four workflow controls appear exactly once.

- [ ] **Step 3: Commit and push the workflow**

```powershell
git add .github/workflows/pages.yml
git commit -m "ci: deploy site to GitHub Pages"
git push
```

### Task 4: Enable and verify GitHub Pages

**Files:**
- Modify: GitHub repository setting for `et28335/porforlio` — Pages source.

- [ ] **Step 1: In GitHub repository settings, open Pages**

Navigate to `https://github.com/et28335/porforlio/settings/pages`.

- [ ] **Step 2: Select GitHub Actions under Build and deployment / Source**

Expected: the selected source reads `GitHub Actions`.

- [ ] **Step 3: Verify the Actions deployment succeeds**

Open `https://github.com/et28335/porforlio/actions` and confirm the `Deploy GitHub Pages` run is green.

- [ ] **Step 4: Verify the public page**

Open `https://et28335.github.io/porforlio/`. Confirm the hero, three project cards, navigation anchors, and mobile layout load. Record the deployed URL in the final delivery.

