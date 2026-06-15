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

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ---------- MENU MOBILE ---------- */
function toggleMenu() {
  const list   = document.querySelector('nav .nav-list');
  const toggle = document.querySelector('.menu-toggle');
  const isOpen = list.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('nav .nav-list').classList.remove('open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

/* ---------- PARTÍCULAS NO HERO ---------- */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 20;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100 + 20}%;
      animation-duration: ${Math.random() * 6 + 5}s;
      animation-delay: ${Math.random() * 6}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ---------- CONTADORES ANIMADOS ---------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current);
  }, 16);
}

const counters = document.querySelectorAll('.stat-n[data-target]');
let countersStarted = false;

const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(animateCounter);
    }
  });
}, { threshold: .3 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);

/* ---------- FADE-IN AO ROLAR ---------- */
const fadeEls = document.querySelectorAll(
  '.benefit-card, .prof-card, .plan-card, .info-item'
);


const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

fadeEls.forEach(el => fadeObserver.observe(el));

/* ---------- FORMULÁRIO DE CONTATO ---------- */
function updateFormTheme(value) {
  const wrap = document.querySelector('.contato__form-wrap');
  if (!wrap) return;
  wrap.className = 'contato__form-wrap';
  if (value) wrap.classList.add(`theme-${value}`);
}

function enviarWhats(event) {
  event.preventDefault();

  const nome     = document.getElementById('nome')?.value.trim();
  const area     = document.getElementById('area')?.value;
  const mensagem = document.getElementById('mensagem')?.value.trim();
  const btn      = document.getElementById('btn-enviar');

  if (!nome || !area || !mensagem) {
    btn.textContent = 'Preencha todos os campos!';
    setTimeout(() => { btn.textContent = 'Iniciar Consultoria via WhatsApp'; }, 2000);
    return;
  }

  const areaTexto = {
    saude:       '🩺 Saúde — Geovanna Sousa',
    performance: '⚡ Performance — Fernando Albert',
    nutricao:    '🥗 Nutrição — Fernanda',
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
  if (msg) {
    msg.placeholder = `Olá! Tenho interesse no atendimento com ${nome} (${preco}). Gostaria de mais informações.`;
  }

  const contato = document.getElementById('contato');
  if (contato) contato.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---------- PLANO → WhatsApp direto ---------- */
function enviarWhatsPlano(plano, preco) {
  let detalhe = '';
  if (plano === 'VIP') {
    detalhe = 'com Personal Trainer, Nutricionista e Médica';
  } else {
    detalhe = 'do Fernando Albert';
  }
  const msg = `*High-Performance Team — Plano ${plano}*

Olá! Tenho interesse no *Plano ${plano}* ${detalhe} (${preco}/mês). Poderia me enviar mais informações?`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}
