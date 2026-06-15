/* ============================================================
   HIGH-PERFORMANCE TEAM — script.js
   ============================================================ */

/* --- NÚMERO DO WHATSAPP (altere aqui) --- */
const WHATSAPP_NUMBER = '5561999999999';

/* ---------- HEADER SCROLL ---------- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---------- NAV ACTIVE LINK ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

/* ---------- MENU MOBILE ---------- */
function toggleMenu() {
  const list    = document.querySelector('nav .nav-list');
  const toggle  = document.querySelector('.menu-toggle');
  const isOpen  = list.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('nav .nav-list').classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---------- FORMULÁRIO DE CONTATO ---------- */
function updateFormTheme(value) {
  const wrap = document.querySelector('.contato__form-wrap');
  wrap.className = 'contato__form-wrap';
  if (value) wrap.classList.add(`theme-${value}`);
}

function enviarWhats(event) {
  event.preventDefault();

  const nome     = document.getElementById('nome')?.value.trim();
  const area     = document.getElementById('area')?.value;
  const mensagem = document.getElementById('mensagem')?.value.trim();
  const btn      = document.getElementById('btn-enviar');

  if (!nome || !area || !mensagem) return;

  const areaTexto = {
    saude:        '🩺 Saúde',
    performance:  '⚡ Performance',
    fisioterapia: '🦴 Fisioterapia',
    nutricao:     '🍎 Nutrição',
    premium:      '🏋️ Plano Performance Premium',
  }[area] || area;

  const msg = [
    `*High-Performance Team — Nova Consultoria*`,
    ``,
    `👤 *Nome:* ${nome}`,
    `📌 *Área:* ${areaTexto}`,
    `🎯 *Objetivo:* ${mensagem}`,
  ].join('\n');

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  btn.textContent = 'Redirecionando...';
  btn.disabled = true;

  setTimeout(() => {
    window.open(url, '_blank', 'noopener,noreferrer');
    btn.textContent = 'Iniciar Consultoria via WhatsApp';
    btn.disabled = false;
  }, 600);
}

/* ---------- CARD PROFISSIONAL → formulário ---------- */
function selecionarProfissional(area, nome, preco) {
  const select = document.getElementById('area');
  const msg    = document.getElementById('mensagem');

  if (select) {
    select.value = area;
    updateFormTheme(area);
  }
  if (msg) msg.placeholder = `Olá! Tenho interesse no atendimento com ${nome} (${preco}). Gostaria de mais informações.`;

  const contato = document.getElementById('contato');
  if (contato) contato.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---------- PLANO PREMIUM → WhatsApp direto ---------- */
function enviarWhatsapp() {
  const msg = `*High-Performance Team — Plano Performance Premium*\n\nOlá! Tenho interesse no *Plano Performance Premium* (acompanhamento completo: Saúde, Nutrição, Performance e Fisioterapia). Poderia me enviar mais informações?`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

/* ---------- ANIMATE ON SCROLL ---------- */
const fadeEls = document.querySelectorAll(
  '.service-card, .prof-card, .result-card, .pilar, .selo'
);

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  fadeObserver.observe(el);
});
