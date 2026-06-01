/* ==============================
   script.js – DEMTH403 Question Bank
   ============================== */

(function () {
  'use strict';

  /* ── DOM refs ── */
  const searchInput  = document.getElementById('searchInput');
  const searchClear  = document.getElementById('searchClear');
  const filterChips  = document.querySelectorAll('.chip');
  const allCards     = document.querySelectorAll('.q-card');
  const allSections  = document.querySelectorAll('.unit-section');
  const noResults    = document.getElementById('noResults');
  const backToTop    = document.getElementById('backToTop');
  const navItems     = document.querySelectorAll('.nav-item');
  const totalQCount  = document.getElementById('totalQCount');

  /* ── State ── */
  let activeFilter = 'all';
  let searchQuery  = '';

  /* ─────────────────────────────────────────
     COUNT & DISPLAY TOTAL
  ───────────────────────────────────────── */
  totalQCount.textContent = allCards.length;

  /* ─────────────────────────────────────────
     UNIT QUESTION COUNTS
  ───────────────────────────────────────── */
  allSections.forEach(section => {
    const id = section.id;                          // e.g. "unit1"
    const countEl = document.getElementById('count-' + id);
    if (!countEl) return;
    const n = section.querySelectorAll('.q-card').length;
    countEl.textContent = n + ' Q' + (n !== 1 ? 's' : '');
  });

  /* ─────────────────────────────────────────
     FILTER + SEARCH LOGIC
  ───────────────────────────────────────── */
  function applyFilters() {
    const q = searchQuery.toLowerCase().trim();
    let anyVisible = false;

    allCards.forEach(card => {
      const paperAttr  = card.dataset.paper || '';   // e.g. "p1 p3"
      const bodyText   = card.textContent.toLowerCase();

      /* paper filter */
      const paperMatch =
        activeFilter === 'all' ||
        paperAttr.split(' ').includes(activeFilter);

      /* search filter */
      const searchMatch = q === '' || bodyText.includes(q);

      if (paperMatch && searchMatch) {
        card.classList.remove('hidden');
        anyVisible = true;
      } else {
        card.classList.add('hidden');
      }
    });

    /* show/hide unit sections based on visible cards */
    allSections.forEach(section => {
      const visibleCards = section.querySelectorAll('.q-card:not(.hidden)');
      if (visibleCards.length === 0) {
        section.classList.add('hidden');
      } else {
        section.classList.remove('hidden');
      }
    });

    noResults.classList.toggle('hidden', anyVisible);
  }

  /* ─────────────────────────────────────────
     SEARCH INPUT
  ───────────────────────────────────────── */
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value;
    searchClear.classList.toggle('visible', searchQuery.length > 0);
    applyFilters();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClear.classList.remove('visible');
    searchInput.focus();
    applyFilters();
  });

  /* ─────────────────────────────────────────
     FILTER CHIPS
  ───────────────────────────────────────── */
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      applyFilters();
    });
  });

  /* ─────────────────────────────────────────
     ACTIVE NAV HIGHLIGHT ON SCROLL
  ───────────────────────────────────────── */
  const sectionIds = Array.from(allSections).map(s => s.id);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach(item => {
            const isMatch = item.getAttribute('href') === '#' + id;
            item.classList.toggle('active', isMatch);
          });
        }
      });
    },
    { threshold: 0.2, rootMargin: '-80px 0px -60% 0px' }
  );

  allSections.forEach(section => observer.observe(section));

  /* ─────────────────────────────────────────
     BACK TO TOP BUTTON
  ───────────────────────────────────────── */
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─────────────────────────────────────────
     SMOOTH CARD ENTRANCE ANIMATION
     (stagger cards within each section)
  ───────────────────────────────────────── */
  const cardObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  allCards.forEach((card, i) => {
    card.style.animationDelay = (i % 10) * 0.04 + 's';
    card.style.animation = 'cardIn 0.35s ease both paused';
    cardObserver.observe(card);
  });

  /* inject card animation keyframes */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cardIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  /* ─────────────────────────────────────────
     KEYBOARD SHORTCUT: "/" → focus search
  ───────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.blur();
    }
  });

  /* ─────────────────────────────────────────
     INITIAL RENDER
  ───────────────────────────────────────── */
  applyFilters();

})();
