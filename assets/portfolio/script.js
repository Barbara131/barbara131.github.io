(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Settings you may want to change ----
  var EMAIL = 'essienkosama@gmail.com';
  var TIMEZONE = 'Africa/Lagos';   // used by the local-time tile

  // Theme toggle (persisted)
  document.getElementById('themeToggle').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile menu
  var sidebar = document.getElementById('sidebar');
  var menuBtn = document.getElementById('menuToggle');
  function setMenu(open) {
    sidebar.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () { setMenu(!sidebar.classList.contains('is-open')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', function (e) { if (!sidebar.contains(e.target)) setMenu(false); });

  // Active nav card follows scroll
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-card'));
  navLinks.forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function updateActive() {
    var y = window.innerHeight * 0.35, current = 0;
    sections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= y) current = i; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections.length - 1;
    navLinks.forEach(function (a, i) { a.classList.toggle('is-active', i === current); });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  // Project filters
  var chips = document.querySelectorAll('.chip');
  var projects = document.querySelectorAll('.project');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.dataset.filter;
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', String(on));
      });
      projects.forEach(function (p) {
        p.classList.toggle('is-hidden', f !== 'all' && p.dataset.cat !== f);
      });
    });
  });

  // Local time tile
  var clock = document.getElementById('clock');
  var note = document.getElementById('clockNote');
  function tick() {
    var now = new Date();
    try {
      clock.textContent = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: TIMEZONE });
      var h = Number(now.toLocaleString('en-GB', { hour: '2-digit', hour12: false, timeZone: TIMEZONE }));
      note.textContent = (h >= 9 && h < 18) ? 'In the studio right now' : 'Out of office · replies next working day';
    } catch (e) {
      clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
  tick();
  setInterval(tick, 15000);

  // CTA → opens an email draft with the brief
  var form = document.getElementById('ctaForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('New project') +
      '&body=' + encodeURIComponent(form.brief.value.trim());
  });

  // Copy email
  var copyBtn = document.getElementById('copyEmail');
  copyBtn.addEventListener('click', function () {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(EMAIL).then(function () {
      copyBtn.textContent = 'Copied ✓';
      setTimeout(function () { copyBtn.textContent = 'Copy email'; }, 1800);
    }, function () {});
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Count-up numbers
  function countUp(el) {
    var target = Number(el.dataset.count), suffix = el.dataset.suffix || '', start = null;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('is-in');
      setTimeout(function () { el.style.transitionDelay = ''; }, 1000);
      el.querySelectorAll('[data-count]').forEach(countUp);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  items.forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 60 + 'ms';
    io.observe(el);
  });
})();
