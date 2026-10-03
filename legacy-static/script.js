(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav ---------- */
  const nav = $('#nav'), burger = $('#burger');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  const setMenu = open => {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  $$('#nav-menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  matchMedia('(min-width: 861px)').addEventListener('change', () => setMenu(false));

  /* ---------- Smooth in-page links (also handles "#" placeholders) ---------- */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') { e.preventDefault(); return; }
    const t = $(id);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    }
  }));

  /* ---------- Reveal on scroll ---------- */
  const targets = $$('.reveal, .mock, .card');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(t => io.observe(t));
  } else targets.forEach(t => t.classList.add('is-in'));

  /* ---------- Count-up stats ---------- */
  const fmt = (n, d) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  const counters = $$('[data-count]');
  const run = el => {
    const end = parseFloat(el.dataset.count), d = +el.dataset.decimals || 0, suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = fmt(end, d) + suf; return; }
    const t0 = performance.now(), dur = 1600;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(end * e, d) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { run(e.target); co.unobserve(e.target); }
    }), { threshold: 0.6 });
    counters.forEach(c => co.observe(c));
  }

  /* ---------- Spotlight hover on cards ---------- */
  $$('.card').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  /* ---------- Typing prompt in AI card ---------- */
  const typing = $('.typing');
  if (typing && !reduce) {
    const full = typing.textContent;
    typing.textContent = '';
    const start = () => {
      let i = 0;
      const step = () => {
        typing.textContent = full.slice(0, ++i);
        if (i < full.length) setTimeout(step, 28);
      };
      step();
    };
    const to = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { start(); to.disconnect(); }
    }), { threshold: 0.5 });
    to.observe(typing);
  }

  /* ---------- Pricing toggle ---------- */
  const sw = $('#billing'), lm = $('#lbl-m'), ly = $('#lbl-y');
  const applyBilling = yearly => {
    sw.setAttribute('aria-checked', yearly);
    lm.classList.toggle('is-on', !yearly);
    ly.classList.toggle('is-on', yearly);
    $$('.amt').forEach(a => {
      a.textContent = yearly ? a.dataset.y : a.dataset.m;
      a.classList.remove('flip'); void a.offsetWidth; a.classList.add('flip');
    });
    $$('.bill').forEach(b => { b.textContent = yearly ? b.dataset.y : b.dataset.m; });
  };
  sw.addEventListener('click', () => applyBilling(sw.getAttribute('aria-checked') !== 'true'));
  lm.addEventListener('click', () => applyBilling(false));
  ly.addEventListener('click', () => applyBilling(true));

  /* ---------- Modal (trial / demo / login / coming soon) ---------- */
  const modal = $('#modal'), form = $('#modal-form'), email = $('#m-email'), err = $('#m-err');
  const passWrap = $('#m-pass-wrap'), pass = $('#m-pass');
  const formWrap = $('#modal-form-wrap'), ok = $('#modal-ok');
  const copy = {
    trial: { t: 'Start your free trial', s: '14 days of Pro. No credit card required.', b: 'Start Free Trial', ot: "You're all set!", os: 'We sent a magic link to {e}. Click it to open your workspace.' },
    demo:  { t: 'Book a demo', s: "Tell us where to reach you and we'll set up a 20-minute walkthrough.", b: 'Request Demo', ot: 'Demo requested', os: 'Thanks! Someone from our team will email {e} within one business day.' },
    login: { t: 'Welcome back', s: 'Log in to your FlowPilot workspace.', b: 'Log In', ot: 'Signed in (demo)', os: 'This is a demo site, so there is no real account behind this form.' },
    soon:  { t: 'Coming soon', s: 'This page is part of the demo and is not live yet. Leave your email and we will let you know.', b: 'Notify Me', ot: "You're on the list", os: "We'll email {e} when it's ready." }
  };
  let mode = 'trial', lastFocus = null;

  const openModal = m => {
    mode = m; const c = copy[m];
    $('#modal-title').textContent = c.t;
    $('#modal-sub').textContent = c.s;
    $('#m-submit').textContent = c.b;
    passWrap.hidden = m !== 'login';
    pass.required = m === 'login';
    formWrap.hidden = false; ok.hidden = true;
    err.hidden = true; email.removeAttribute('aria-invalid');
    form.reset();
    lastFocus = document.activeElement;
    modal.showModal();
    setTimeout(() => email.focus(), 50);
  };
  $$('[data-modal]').forEach(el => el.addEventListener('click', e => {
    e.preventDefault(); setMenu(false); openModal(el.dataset.modal);
  }));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
    const passOk = mode !== 'login' || pass.value.length > 0;
    if (!valid || !passOk) {
      err.textContent = !valid ? 'Please enter a valid email address.' : 'Please enter your password.';
      err.hidden = false;
      (valid ? pass : email).setAttribute('aria-invalid', 'true');
      (valid ? pass : email).focus();
      return;
    }
    const c = copy[mode];
    $('#ok-title').textContent = c.ot;
    $('#ok-sub').textContent = c.os.replace('{e}', email.value.trim());
    formWrap.hidden = true; ok.hidden = false;
    $('#ok-close').focus();
  });
  [email, pass].forEach(i => i.addEventListener('input', () => { err.hidden = true; i.removeAttribute('aria-invalid'); }));
  $('#ok-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', () => lastFocus && lastFocus.focus && lastFocus.focus());

  $('#year').textContent = new Date().getFullYear();
})();
