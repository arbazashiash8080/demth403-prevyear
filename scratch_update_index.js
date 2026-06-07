const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('--glow4:      rgba(52,211,153,0.18);', '--glow4:      rgba(52,211,153,0.18);\n      --accent5:    #38bdf8;   /* sky blue - Cloud Computing */\n      --glow5:      rgba(56,189,248,0.18);');
html = html.replace('.subject-card.bd::before      { background: var(--glow4); }', '.subject-card.bd::before      { background: var(--glow4); }\n    .subject-card.cc::before      { background: var(--glow5); }');
html = html.replace('.subject-card.bd:hover    { box-shadow: 0 24px 60px rgba(52,211,153,0.18); }', '.subject-card.bd:hover    { box-shadow: 0 24px 60px rgba(52,211,153,0.18); }\n    .subject-card.cc:hover    { box-shadow: 0 24px 60px rgba(56,189,248,0.18); }');

const badgeHtml = `.bd .course-badge {
      color: var(--accent4);
      border-color: rgba(52,211,153,0.3);
      background: rgba(52,211,153,0.08);
    }`;
const ccBadgeHtml = `.bd .course-badge {
      color: var(--accent4);
      border-color: rgba(52,211,153,0.3);
      background: rgba(52,211,153,0.08);
    }

    .cc .course-badge {
      color: var(--accent5);
      border-color: rgba(56,189,248,0.3);
      background: rgba(56,189,248,0.08);
    }`;
html = html.replace(badgeHtml, ccBadgeHtml);

html = html.replace('.bd    .stat-val { color: var(--accent4); }', '.bd    .stat-val { color: var(--accent4); }\n    .cc    .stat-val { color: var(--accent5); }');
html = html.replace('.bd    .cta-label { color: var(--accent4); }', '.bd    .cta-label { color: var(--accent4); }\n    .cc    .cta-label { color: var(--accent5); }');
html = html.replace('.bd:hover    .cta-arrow { background: rgba(52,211,153,0.10); }', '.bd:hover    .cta-arrow { background: rgba(52,211,153,0.10); }\n    .cc:hover    .cta-arrow { background: rgba(56,189,248,0.10); }');
html = html.replace('.bd    .card-accent-bar { background: linear-gradient(90deg, var(--accent4), #86efac); }', '.bd    .card-accent-bar { background: linear-gradient(90deg, var(--accent4), #86efac); }\n    .cc    .card-accent-bar { background: linear-gradient(90deg, var(--accent5), #7dd3fc); }');

const ccCardHTML = `
      <!-- Cloud Computing -->
      <a href="./Cloud%20Computing/index.html" class="subject-card cc" id="card-cc">
        <div class="card-accent-bar"></div>

        <div class="card-top">
          <span class="course-badge">DECAP470</span>
          <div class="card-icon">☁️</div>
        </div>

        <div class="card-body">
          <div class="card-title">Cloud Computing</div>
          <div class="card-desc">Cloud storage, Services, Virtualization, Hadoop &amp; more — 14 units from past papers including GDINFOTECH.</div>

          <div class="card-stats">
            <div class="stat">
              <span class="stat-val">14</span>
              <span class="stat-key">Units</span>
            </div>
          </div>
        </div>

        <div class="card-cta">
          <span class="cta-label">Open Question Bank ↗</span>
          <span class="cta-arrow">→</span>
        </div>
      </a>`;

const insertIndex = html.indexOf('<!-- Big Data -->');
if (insertIndex !== -1) {
    const endOfBdCard = html.indexOf('</a>', insertIndex) + 4;
    html = html.slice(0, endOfBdCard) + '\\n' + ccCardHTML + html.slice(endOfBdCard);
}

fs.writeFileSync('index.html', html);
console.log('Updated index.html successfully.');
