# 📚 Question Bank Site — Complete Developer Reference

> **Purpose:** Explains how the entire site works, exactly how the `.txt` file feeds it, and step-by-step instructions to add a **brand-new subject** with its own question bank.

---

## 📁 Project Structure

```
Demth Site/
├── index.html                  ← The entire page (hard-coded questions + layout)
├── style.css                   ← All visual design tokens and component styles
├── script.js                   ← Filter, search, scroll spy, animations
└── QuestionPaperMaths.txt      ← Source document (NOT auto-loaded — used as a reference)
```

> **Critical Understanding:** The `.txt` file is **NOT parsed or loaded by JavaScript at runtime.** It is a **raw source document** you manually read to extract questions and then write as HTML `<div class="q-card">` blocks inside `index.html`. Think of it as your "copy" document.

---

## 🗂️ How the `.txt` File Is Structured

The file `QuestionPaperMaths.txt` contains **multiple question papers**, stacked one after another, each wrapped with a clear header and footer:

```
Question Paper: <PAPER NAME>
PART A

Q1(a) ...
Q1(b) ...

PART B

Q2 ...
Q3 ...

-- End of Question Paper --


Question Paper: <NEXT PAPER NAME>
...
```

### Paper Name → Tag Mapping (current Maths subject)

| Paper Name in `.txt`                              | HTML tag class | Display label        |
|---------------------------------------------------|----------------|----------------------|
| DEMTH403 MATHEMATICAL FOUNDATION FOR COMPUTER SCIENCE | `tag-p1`   | DEMTH403             |
| DEMTH403 advanced statistical methods in economics    | `tag-p2`   | ADV STATS            |
| DEMTH403 (2)                                          | `tag-p3`   | DEMTH403 (2)         |
| MathFounDEMTH403 (Sept 2025)                          | `tag-p4`   | Sept 2025            |
| DEMTH403 (NEW)                                        | `tag-p5`   | DEMTH403 (NEW)       |
| DEMTH403_1                                            | `tag-p6`   | DEMTH403_1           |

---

## 🎨 UI Design — How It Works

### 1. Page Layout (Three Regions)

```
┌────────────────────────────── HEADER ──────────────────────────────┐
│  Badge · Title · Subtitle · Paper legend (colored tags)            │
└────────────────────────────────────────────────────────────────────┘
┌──── SIDEBAR ────┬───────────────── MAIN CONTENT ───────────────────┐
│ 📚 Units        │  🔍 Search bar                                    │
│  01 Unit 1      │  [Paper filter chips: All | P1 | P2 ...]         │
│  02 Unit 2  ←→  │                                                   │
│  ...            │  ── Unit 1 ──────────────────────────────────     │
│  14 Unit 14     │  ┌──────────────────────────────────────────┐    │
│ ─────────────   │  │ Q1 · [TAG]                               │    │
│ Stats panel     │  │ Question text here...                     │    │
│ Qs | Papers | U │  └──────────────────────────────────────────┘    │
└─────────────────┴────────────────────────────────────────────────── ┘
                              ↑ Back-to-top button (fixed, bottom-right)
```

### 2. Sidebar — Fixed Issues You Should Know

The sidebar is **position: sticky** and **height: 100vh**, meaning it scrolls **independently** of the main content. On desktop it always stays visible. On mobile (`max-width: 900px`) it converts to a **horizontal wrapping nav bar** at the top (no fixed height, border-bottom instead of border-right).

**Known side-menu quirk:** The sidebar does NOT have a mobile toggle button (hamburger). On mobile screens `≤ 900px` it just displays inline above content. If you want a collapsible sidebar on mobile, you'd add a button + toggle class in JS.

**Active nav highlighting** is driven by an `IntersectionObserver` in `script.js` that watches each `<section class="unit-section">`. When a section enters 20% of the viewport, its corresponding `.nav-item` gets the `active` class.

### 3. Question Cards

Each question is one `.q-card` div:

```html
<div class="q-card" data-paper="p1 p3">
  <div class="q-meta">
    <span class="q-num">Q5</span>
    <div class="q-tags">
      <span class="tag tag-p1">DEMTH403</span>
      <span class="tag tag-p3">DEMTH403 (2)</span>
    </div>
  </div>
  <div class="q-body">
    <p>Question text here.</p>
    <ul>
      <li>(a) Sub-part one</li>
      <li>(b) Sub-part two</li>
    </ul>
  </div>
  <!-- OPTIONAL: -->
  <div class="q-repeat-note">⚠ Similar question appears in DEMTH403 (2) Q2</div>
</div>
```

**Key HTML element classes and their purpose:**

| Class             | Purpose                                                             |
|-------------------|---------------------------------------------------------------------|
| `.q-card`         | The card container. `data-paper` controls filter visibility.        |
| `data-paper`      | Space-separated list of paper codes: `"p1 p3 p5"` etc.             |
| `.q-meta`         | Row holding question number + tag pills.                            |
| `.q-num`          | Monospaced badge: `Q1`, `Q12`, etc.                                 |
| `.q-tags`         | Flex container for colored paper-source pills.                      |
| `.tag.tag-pN`     | Colored pill. N = 1 through 6 (each paper has its own color).      |
| `.q-body`         | The actual question text. Supports `<p>`, `<ul>`, `<li>`.          |
| `.q-body .mono`   | Inline `<p class="mono">` for math/code expressions (green text).  |
| `.q-body .note`   | Italic note block (left-bordered, muted), for scan disclaimers.     |
| `.q-repeat-note`  | Amber warning strip: shown when question repeats across papers.     |

### 4. Unit Sections

All questions for one topic live inside:

```html
<section class="unit-section" id="unitN">
  <div class="unit-header">
    <div class="unit-badge">Unit N</div>
    <h2 class="unit-title">Unit Topic Name</h2>
    <span class="unit-count" id="count-unitN"></span>   <!-- auto-filled by JS -->
  </div>
  <div class="questions-grid">
    <!-- .q-card blocks go here -->
  </div>
</section>
```

The `id="unitN"` is critical — it links to sidebar nav (`href="#unitN"`) and the IntersectionObserver.  
The `id="count-unitN"` span is automatically populated by `script.js` with `"N Qs"`.

---

## ⚙️ JavaScript Logic (script.js)

### Filter + Search (`applyFilters()`)

```
activeFilter = 'all' | 'p1' | 'p2' | ... | 'p6'
searchQuery  = string (from #searchInput)

For each .q-card:
  paperMatch  = activeFilter === 'all'
                OR card's data-paper contains activeFilter
  searchMatch = searchQuery is empty
                OR card's full text (lowercased) contains searchQuery

Show card if BOTH match, hide with .hidden class if not.
After all cards processed: hide entire .unit-section if it has 0 visible cards.
Show #noResults div if zero cards are visible.
```

### Scroll Spy

Uses `IntersectionObserver` with `threshold: 0.2` and `rootMargin: '-80px 0px -60% 0px'`.  
When a unit section crosses that threshold, the matching sidebar nav item gets `class="active"`.

### Card Entrance Animation

Every `.q-card` gets a CSS animation `cardIn` (fade + 10px slide-up) injected via JS.  
Cards are staggered by `(index % 10) * 0.04s` delay. The animation is `paused` until the card enters the viewport (via a second `IntersectionObserver`).

### Keyboard Shortcuts

| Key       | Action                          |
|-----------|---------------------------------|
| `/`       | Focus the search input          |
| `Escape`  | Blur / unfocus search input     |

### Back-to-top Button

Becomes `.visible` (opacity 1, pointer-events auto) when `window.scrollY > 400`.

---

## ✅ Step-by-Step: Adding a New Subject

### Step 1 — Create `QuestionPaper[SubjectName].txt`

Follow **exactly** this format:

```
Question Paper: [PAPER 1 FULL NAME]
PART A

Q1(a) [Short question text]

Q1(b) [Short question text]

PART B

Q2 [Full question text]

(a) Sub-part

(b) Sub-part

-- End of Question Paper --


Question Paper: [PAPER 2 FULL NAME]
PART A

Q1(a) ...

-- End of Question Paper --
```

**Rules for the `.txt` file:**
- Every paper starts with `Question Paper: <name>` on its own line.
- Every paper ends with `-- End of Question Paper --`.
- Leave **one blank line** between questions.
- For questions referencing a figure: write `[Figure present on Page N of <paper name>]`.
- For unreadable/blurred content: write `[Expression present in paper; verify from original]`.
- For repeated questions: note it separately — `Note: The paper contains duplicate numbering "Q6". Preserved exactly as printed.`
- This file is your **personal reference** — it is NOT code, it won't run automatically.

---

### Step 2 — Create a new `index.html` (or duplicate and modify)

Copy the existing `index.html` and make the following changes:

#### 2a. Update `<title>` and `<meta description>`

```html
<title>DESUBJECT_CODE – Subject Full Name | Question Bank</title>
<meta name="description" content="Organized question bank for DESUBJECT_CODE Subject Name. All questions sorted by unit from multiple past papers." />
```

#### 2b. Update the Header

```html
<div class="header-badge">SUBJECT_CODE</div>
<h1 class="site-title">Subject Full Name<br><span>for [Branch/Department]</span></h1>
<p class="site-subtitle">Question Bank — Organized by Unit</p>
<div class="paper-legend">
  <span class="legend-label">Papers:</span>
  <span class="tag tag-p1">PAPER 1 SHORT NAME</span>
  <span class="tag tag-p2">PAPER 2 SHORT NAME</span>
  <!-- Add one <span> per paper, using tag-p1 through tag-p6 -->
</div>
```

#### 2c. Update the Sidebar Nav (Units)

Replace all `<a class="nav-item">` entries to match your subject's units:

```html
<a href="#unit1" class="nav-item active" data-unit="1">
  <span class="nav-num">01</span>
  <span class="nav-text">Unit 1 Topic Name</span>
</a>
<a href="#unit2" class="nav-item" data-unit="2">
  <span class="nav-num">02</span>
  <span class="nav-text">Unit 2 Topic Name</span>
</a>
<!-- ... repeat for each unit -->
```

#### 2d. Update Filter Chips

```html
<div class="filter-chips" id="filterChips">
  <button class="chip active" data-filter="all">All Papers</button>
  <button class="chip" data-filter="p1">PAPER 1 SHORT NAME</button>
  <button class="chip" data-filter="p2">PAPER 2 SHORT NAME</button>
  <!-- One chip per paper -->
</div>
```

#### 2e. Update Sidebar Stats

```html
<div class="sidebar-stats">
  <div class="stat-item">
    <span class="stat-num" id="totalQCount">0</span>  <!-- auto-updated by JS -->
    <span class="stat-label">Questions</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">N</span>  <!-- replace N with number of papers -->
    <span class="stat-label">Papers</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">N</span>  <!-- replace N with number of units -->
    <span class="stat-label">Units</span>
  </div>
</div>
```

#### 2f. Update the CSS watermark text (optional)

In `style.css` line ~101, find:
```css
.site-header::after {
  content: 'DEMTH403';
```
Change `'DEMTH403'` to your new subject code.

---

### Step 3 — Assign Paper Codes (p1–p6)

Map each paper in your `.txt` to a code, then update `style.css` with display labels:

| Code | CSS class  | What it means          |
|------|------------|------------------------|
| p1   | `.tag-p1`  | Your 1st paper         |
| p2   | `.tag-p2`  | Your 2nd paper         |
| p3   | `.tag-p3`  | Your 3rd paper         |
| p4   | `.tag-p4`  | Your 4th paper         |
| p5   | `.tag-p5`  | Your 5th paper         |
| p6   | `.tag-p6`  | Your 6th paper         |

> If you have **fewer than 6 papers**, simply don't use the extra codes — no errors occur.  
> If you have **more than 6 papers**, add new CSS variables (see below).

**Adding a 7th paper color** in `style.css`:

```css
/* In :root{} block, add: */
--tag-p7-bg: rgba(251, 113, 133, 0.12);
--tag-p7-c:  #fb7185;

/* Then add the class: */
.tag-p7 { background: var(--tag-p7-bg); color: var(--tag-p7-c); }
```

---

### Step 4 — Write the Question Sections in HTML

For each unit, create a section block:

```html
<!-- ===================== UNIT 1 ===================== -->
<section class="unit-section" id="unit1">
  <div class="unit-header">
    <div class="unit-badge">Unit 1</div>
    <h2 class="unit-title">Unit 1 Topic Name Here</h2>
    <span class="unit-count" id="count-unit1"></span>
  </div>

  <div class="questions-grid">

    <!-- CARD TEMPLATE: Simple single-text question -->
    <div class="q-card" data-paper="p1">
      <div class="q-meta">
        <span class="q-num">Q1</span>
        <div class="q-tags">
          <span class="tag tag-p1">PAPER 1 SHORT NAME</span>
        </div>
      </div>
      <div class="q-body">
        <p>Q1(a) The full question text as copied from your .txt file.</p>
      </div>
    </div>

    <!-- CARD TEMPLATE: Question with sub-parts -->
    <div class="q-card" data-paper="p2">
      <div class="q-meta">
        <span class="q-num">Q2</span>
        <div class="q-tags">
          <span class="tag tag-p2">PAPER 2 SHORT NAME</span>
        </div>
      </div>
      <div class="q-body">
        <p>Q3 Main question text.</p>
        <ul>
          <li>(a) Sub-part one</li>
          <li>(b) Sub-part two</li>
          <li>(c) Sub-part three</li>
        </ul>
      </div>
    </div>

    <!-- CARD TEMPLATE: Question appearing in MULTIPLE papers -->
    <div class="q-card" data-paper="p1 p3">
      <div class="q-meta">
        <span class="q-num">Q3</span>
        <div class="q-tags">
          <span class="tag tag-p1">PAPER 1 SHORT NAME</span>
          <span class="tag tag-p3">PAPER 3 SHORT NAME</span>
        </div>
      </div>
      <div class="q-body">
        <p>Q5 This question appears in both Paper 1 and Paper 3.</p>
      </div>
      <div class="q-repeat-note">⚠ Same question appears in PAPER 3 SHORT NAME Q5</div>
    </div>

    <!-- CARD TEMPLATE: Question with math/code expression -->
    <div class="q-card" data-paper="p4">
      <div class="q-meta">
        <span class="q-num">Q4</span>
        <div class="q-tags">
          <span class="tag tag-p4">PAPER 4 SHORT NAME</span>
        </div>
      </div>
      <div class="q-body">
        <p>Q7 Evaluate the following expression:</p>
        <p class="mono">({1,2,3,4,5}, /) and ({1,2,4,8,16}, /)</p>
      </div>
    </div>

    <!-- CARD TEMPLATE: Question referencing a figure from original paper -->
    <div class="q-card" data-paper="p1">
      <div class="q-meta">
        <span class="q-num">Q5</span>
        <div class="q-tags">
          <span class="tag tag-p1">PAPER 1 SHORT NAME</span>
        </div>
      </div>
      <div class="q-body">
        <p>Q10 Answer these questions for the graph shown.</p>
        <p class="note">[Figure present on Page 2 of PAPER 1 — verify from original]</p>
        <ul>
          <li>(a) Find the chromatic number.</li>
          <li>(b) Is it planar?</li>
        </ul>
      </div>
    </div>

  </div><!-- /questions-grid -->
</section>
```

---

### Step 5 — Numbering Convention

The `<span class="q-num">QN</span>` counter (Q1, Q2, Q3...) is a **sequential counter per unit**, NOT the original question number from the paper. The original paper question number goes inside the `.q-body` text:

```html
<!-- q-num = position in THIS unit's list (Q1, Q2, Q3...) -->
<span class="q-num">Q3</span>

<!-- Original paper question number is inside the text: -->
<p>Q11(b) The actual question from the source paper...</p>
```

---

### Step 6 — Checklist Before You Open the Page

- [ ] Every `<section id="unitN">` has a matching `<a href="#unitN">` in sidebar nav.
- [ ] Every `<span id="count-unitN">` exists (JS fills it automatically).
- [ ] Every paper code used in `data-paper="..."` has a matching `.chip[data-filter="pN"]`.
- [ ] Every `.tag-pN` class has a CSS definition in `style.css`.
- [ ] The `totalQCount` span exists in sidebar stats: `<span id="totalQCount">0</span>`.
- [ ] The `backToTop` button exists: `<button class="back-to-top" id="backToTop">↑</button>`.
- [ ] The `noResults` div exists: `<div id="noResults" class="no-results hidden">`.

---

## 🔧 CSS Design Tokens Reference

All visual values are defined in `:root {}` in `style.css`. Change them to retheme for a new subject:

```css
:root {
  /* Background scale (darkest → lightest surface) */
  --bg:       #0d0f14;   /* Page background */
  --bg2:      #13161e;   /* Sidebar background */
  --bg3:      #1a1e2a;   /* Inner surfaces, note blocks */
  --surface:  #1e2333;   /* Cards, inputs */
  --surface2: #252b3b;   /* Cards on hover */

  /* Border colors */
  --border:       #2a3148;  /* Default borders */
  --border-hover: #3d4d70;  /* Hover borders */

  /* Accent colors (used for active states, badges, gradients) */
  --accent:      #6c8ef5;                    /* Primary blue */
  --accent2:     #8b5cf6;                    /* Secondary purple */
  --accent-glow: rgba(108, 142, 245, 0.15);  /* Glow on focus */

  /* Text hierarchy */
  --text-primary:   #e8ecf4;  /* Main text */
  --text-secondary: #8892a8;  /* Sub-text, list items */
  --text-muted:     #5a6480;  /* Very dim: numbers, labels */

  /* Paper tag colors — one pair per paper */
  --tag-p1-bg: rgba(99, 179, 237, 0.12);  --tag-p1-c: #63b3ed;  /* Blue  */
  --tag-p2-bg: rgba(154, 215, 155, 0.12); --tag-p2-c: #9ad79b;  /* Green */
  --tag-p3-bg: rgba(245, 158, 11, 0.12);  --tag-p3-c: #f59e0b;  /* Amber */
  --tag-p4-bg: rgba(236, 72, 153, 0.12);  --tag-p4-c: #ec4899;  /* Pink  */
  --tag-p5-bg: rgba(139, 92, 246, 0.12);  --tag-p5-c: #a78bfa;  /* Purple*/
  --tag-p6-bg: rgba(52, 211, 153, 0.12);  --tag-p6-c: #34d399;  /* Teal  */

  /* Layout dimensions */
  --sidebar-w: 260px;   /* Sidebar width on desktop */
  --header-h:  200px;   /* Approximate header height for min-height calc */

  /* Fonts */
  --font:      'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## 📋 Quick Reference Card — HTML Blocks You'll Type Repeatedly

### Minimal card (single-line question, one paper)
```html
<div class="q-card" data-paper="p1">
  <div class="q-meta"><span class="q-num">Q1</span><div class="q-tags"><span class="tag tag-p1">LABEL</span></div></div>
  <div class="q-body"><p>Q1(a) Question text here.</p></div>
</div>
```

### Card with sub-parts list
```html
<div class="q-card" data-paper="p2">
  <div class="q-meta"><span class="q-num">Q2</span><div class="q-tags"><span class="tag tag-p2">LABEL</span></div></div>
  <div class="q-body">
    <p>Q4 Main question.</p>
    <ul><li>(a) Part a</li><li>(b) Part b</li></ul>
  </div>
</div>
```

### Card spanning two papers
```html
<div class="q-card" data-paper="p1 p3">
  <div class="q-meta"><span class="q-num">Q3</span>
    <div class="q-tags">
      <span class="tag tag-p1">LABEL1</span>
      <span class="tag tag-p3">LABEL3</span>
    </div>
  </div>
  <div class="q-body"><p>Q6 Question text.</p></div>
  <div class="q-repeat-note">⚠ Same question in LABEL3 Q6</div>
</div>
```

### Card with math expression + scan note
```html
<div class="q-card" data-paper="p4">
  <div class="q-meta"><span class="q-num">Q4</span><div class="q-tags"><span class="tag tag-p4">LABEL</span></div></div>
  <div class="q-body">
    <p>Q7 Evaluate the Boolean expression:</p>
    <p class="mono">F(x,y,z) = ȳ(xz + x̄z̄)</p>
    <p class="note">[Verify overline placement from original scan]</p>
  </div>
</div>
```

---

## ⚠️ Unit Assignment — The #1 Place People Go Wrong

> **This is the most error-prone part of the whole process.**  
> The current Maths project (`index.html`) has several questions placed in the **wrong unit** because the original `.txt` question papers do NOT organize questions by unit — they are simply numbered Q1, Q2, Q3… in whatever order the examiner set them.

### Why this happens

Question papers are written by examiners who mix topics freely. For example:
- A paper's **Q1(d)** might say *"State fundamental principle of counting"* — that belongs in **Unit 5 (Counting)**, but since it says `Q1`, it can easily be dropped into Unit 1 by mistake.
- A paper's **Q10** might say *"Answer questions for the partial order represented by this Hasse diagram"* — clearly **Unit 3 (POSETs)**, regardless of it being question 10.

**The question number in the paper has zero relationship to its unit.** You must read the question content and decide the unit yourself.

---

### Real examples of wrong placements in the current Maths project

| Question text | Was placed in | Should be in |
|---|---|---|
| `Q1(d) State fundamental principal of counting` | Unit 1 (Logic & Proofs) | **Unit 5** (Basic Counting) |
| `Q1(b) Find the no. of permutation of the word "MATHEMATICS"` | Unit 1 (Logic & Proofs) | **Unit 5** (Basic Counting) |
| `Q1(f) How many one-to-one functions are there from a set with 'm' elements…` | Unit 2 (Quantifiers) | Unit 2 ✓ (functions — correct here) |
| Functions like `one-to-one`, `onto`, `bijective` definitions | Unit 2 ✓ | Unit 2 ✓ |

> The lesson: **always check both the topic keywords in the question AND your syllabus unit list before placing any card.**

---

### How to correctly assign a question to a unit — Decision Flowchart

```
Read the question text carefully
        ↓
Identify the KEY TOPIC KEYWORD and match to your unit list.

Example keyword → unit mappings for the Maths subject:
  • "tautology", "contradiction", "logical equivalence",
    "truth table", "negation", "proof by contradiction"    → Unit 1  (Logic & Proofs)
  • "quantifier", "∀", "∃", "predicate",
    "function", "one-to-one", "onto", "bijective"          → Unit 2  (Variables & Quantifiers)
  • "POSET", "Hasse diagram", "partial order", "lattice",
    "reflexive", "transitive", "symmetric", "relation"     → Unit 3  (POSETs)
  • "Boolean", "Boolean algebra", "dual", "minterm"        → Unit 4  (Boolean Algebra)
  • "permutation", "combination", "pigeonhole",
    "counting", "committee", "arrangements"                → Unit 5  (Basic Counting)
  • "vertex", "edge", "degree", "bipartite", "isomorphic"  → Unit 6/7 (Graph Terminology)
  • "connected", "cut vertex", "cut edge"                  → Unit 8  (Connectivity)
  • "Euler circuit/path", "Hamilton circuit/path"          → Unit 9  (Euler & Hamilton)
  • "Dijkstra", "shortest path", "distance"               → Unit 10 (Shortest Path)
  • "chromatic number", "coloring", "four-color theorem"   → Unit 11 (Graph Coloring)
  • "tree", "root", "leaf", "internal vertex",
    "full m-ary tree"                                      → Unit 12 (Trees)
  • "spanning tree", "Kruskal", "Prim", "minimum spanning" → Unit 13 (Spanning Trees)
  • "traversal", "preorder", "inorder", "postorder",
    "prefix expression", "postfix expression"              → Unit 14 (Tree Traversal)
        ↓
If a question covers TWO topics (e.g. Part A is counting, Part B is graphs),
place it under the topic of the MAIN / harder part of the question.
        ↓
If genuinely unsure, place it in the unit that matches
the corresponding textbook chapter for your subject.
```

---

### Adapting this for YOUR new subject — Pre-Planning Step

**Before writing a single `<div class="q-card">`, do this:**

1. **List your units** from your syllabus or textbook table of contents.
2. **Read the entire `.txt` file** and mentally tag each question with a unit number.
3. **Make a quick scratch table** like this:

```
| Paper   | Q#    | Topic keyword found          | → Unit |
|---------|-------|------------------------------|--------|
| Paper 1 | Q1(a) | "negation", "proposition"    |   1    |
| Paper 1 | Q1(b) | "permutation"                |   5    |
| Paper 1 | Q1(c) | "Boolean algebra"            |   4    |
| Paper 2 | Q3    | "POSET", "Hasse diagram"     |   3    |
| Paper 2 | Q5    | "Euler circuit"              |   9    |
```

4. **Only then start writing HTML** — drop each card into the `<section id="unitN">` you already decided.

This pre-planning step prevents the mis-placement errors present in the current Maths project.

---

## 🚨 Common Mistakes to Avoid

1. **Forgot `id="count-unitN"`** → Unit question count badge stays blank (no error, just empty).
2. **`data-paper` uses label instead of code** → Filter won't work. Use `data-paper="p1"` not `data-paper="DEMTH403"`.
3. **Multiple tags in `.q-tags` but `data-paper` only lists one** → Filter shows the card only for the one paper in `data-paper`, even though the tag visually shows two. Keep both in sync.
4. **Sidebar nav `href="#unit7"` but section `id="unit07"`** → Scroll-to-section and IntersectionObserver both break.
5. **Questions from the `.txt` renumbered incorrectly** → The `<span class="q-num">` is your local unit counter; the `Qxx` inside `.q-body` text is the original paper reference. Don't mix them.
6. **Missing `#backToTop` element** → JS throws a TypeError on `null.classList`. Always include the button before `</body>`.
7. **Placing a question in a unit based on its paper question number instead of its topic** → `Q1(b)` being "permutation" does NOT belong in Unit 1. The `Q1` prefix is the paper's numbering — it has nothing to do with the site's Unit 1. Always read content, not question numbers. See the Unit Assignment section above.

---

## 🔁 Workflow Summary for a New Subject

```
1. Create  QuestionPaper[SubjectName].txt  (structured raw source)
         ↓
2. Plan  units (topics) for the subject
         ↓
3. Duplicate  index.html → update header, sidebar nav, filter chips, stats, CSS watermark
         ↓
4. For each unit → add a <section id="unitN"> block with a <div class="questions-grid">
         ↓
5. For each question in .txt → write a <div class="q-card"> inside the right unit section
         ↓
6. Add repeat notes where the same question appears in multiple papers
         ↓
7. Open  index.html in browser → verify sidebar nav, filter chips, search, scroll spy
```

---

*Last updated: June 2026 — Documenting the Demth Site project.*
