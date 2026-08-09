/* ============================================================
   HIGH-PERFORMANCE TEAM — script.js (v4)
   ============================================================ */

// WhatsApp numbers
const WHATSAPP_NUMBERS = {
  performance: '5561986351036',
  nutricao: '5561991887614',
  saude: '5561991463375',
};

const AREA_GREETINGS = {
  performance: 'Oi, Fernando! 💪',
  nutricao: 'Oi, Fernanda! 🥗',
  saude: 'Oi, Geovanna! 🩺',
};

// FAQ accordion
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.faq-item').forEach(function(item) {
    item.addEventListener('click', function() {
      const wasOpen = this.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(el) { el.classList.remove('open'); });
      if (!wasOpen) this.classList.add('open');
    });
  });

  // Mobile menu
  const menuBtn = document.querySelector('.menu-btn');
  const navMobile = document.querySelector('.nav-mobile');
  if (menuBtn && navMobile) {
    menuBtn.addEventListener('click', function() {
      menuBtn.classList.toggle('active');
      navMobile.classList.toggle('active');
    });
    navMobile.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuBtn.classList.remove('active');
        navMobile.classList.remove('active');
      });
    });
  }

  // Contact form area animation
  const areaSelect = document.getElementById('area');
  const contactForm = document.getElementById('contactForm');
  const decoScene = document.getElementById('decoScene');
  
  if (areaSelect) {
    areaSelect.addEventListener('change', function() {
      const val = this.value;
      contactForm.className = 'contact-form';
      if (val) contactForm.classList.add('theme-' + val);

      // Update decoration scene
      if (decoScene) {
        decoScene.innerHTML = '';
        if (val === 'performance') {
          decoScene.innerHTML = createPerformanceScene();
        } else if (val === 'nutricao') {
          decoScene.innerHTML = createNutricaoScene();
        } else if (val === 'saude') {
          decoScene.innerHTML = createSaudeScene();
        }
      }
    });
  }

  // Custom "área de interesse" dropdown
  const areaTrigger = document.getElementById('areaTrigger');
  const areaTriggerLabel = document.getElementById('areaTriggerLabel');
  const areaOptions = document.getElementById('areaOptions');
  if (areaTrigger && areaOptions && areaSelect) {
    const openList = function() {
      areaOptions.hidden = false;
      areaTrigger.setAttribute('aria-expanded', 'true');
    };
    const closeList = function() {
      areaOptions.hidden = true;
      areaTrigger.setAttribute('aria-expanded', 'false');
    };
    areaTrigger.addEventListener('click', function() {
      if (areaOptions.hidden) openList(); else closeList();
    });
    areaOptions.querySelectorAll('li').forEach(function(li) {
      li.addEventListener('click', function() {
        const val = this.getAttribute('data-value');
        areaSelect.value = val;
        areaTriggerLabel.textContent = this.textContent;
        areaTrigger.classList.add('has-value');
        areaOptions.querySelectorAll('li').forEach(function(el) { el.classList.remove('active'); });
        this.classList.add('active');
        closeList();
        areaSelect.dispatchEvent(new Event('change'));
      });
    });
    document.addEventListener('click', function(e) {
      if (!document.getElementById('areaCustomSelect').contains(e.target)) closeList();
    });
  }

  // WhatsApp form submit
  const btnEnviar = document.getElementById('btn-enviar');
  if (btnEnviar) {
    btnEnviar.addEventListener('click', function(e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const area = document.getElementById('area').value || 'performance';
      const msg = document.getElementById('mensagem').value.trim();
      const numero = WHATSAPP_NUMBERS[area] || WHATSAPP_NUMBERS.performance;
      const greeting = AREA_GREETINGS[area] || AREA_GREETINGS.performance;

      let texto = greeting + ' Me chamo ' + (nome || '(não informado)') + ' e vi o site.';
      if (msg) texto += ' ' + msg;
      else texto += ' Podemos conversar? 🙂';

      window.open('https://wa.me/' + numero + '?text=' + encodeURIComponent(texto), '_blank');
    });
  }
});

// Decoration scenes for contact form
function createPerformanceScene() {
  return `
    <div style="position:absolute;left:-8%;top:15%;animation:floatSpin 2.5s ease-in-out infinite">
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-linecap="round" style="filter:drop-shadow(0 8px 30px rgba(220,38,38,.5))"><path d="M6 4v16M18 4v16M6 12h12M3 4h6M3 20h6M15 4h6M15 20h6"/></svg>
    </div>
    <div style="position:absolute;left:8%;top:65%;animation:floatSpin2 2.8s ease-in-out .3s infinite">
      <svg viewBox="0 0 24 24" width="40" height="40" fill="#f59e0b" stroke="none" style="filter:drop-shadow(0 8px 30px rgba(245,158,11,.5))"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    </div>
    <div style="position:absolute;right:-6%;top:20%;animation:floatSpin2 3s ease-in-out .5s infinite">
      <svg viewBox="0 0 24 24" width="52" height="52" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-linecap="round" style="filter:drop-shadow(0 8px 30px rgba(239,68,68,.5))"><path d="M6 4v16M18 4v16M6 12h12M3 4h6M3 20h6M15 4h6M15 20h6"/></svg>
    </div>
    <div style="position:absolute;right:-2%;top:68%;animation:floatSpin 3.2s ease-in-out .8s infinite">
      <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-linecap="round" style="filter:drop-shadow(0 8px 30px rgba(220,38,38,.5))"><path d="M12 20V10M6 20V4M18 20v-6"/></svg>
    </div>
    <div style="position:absolute;left:0;top:20%;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(220,38,38,.3),transparent 70%);animation:orbFloat 4s ease-in-out infinite;opacity:.4"></div>
    <div style="position:absolute;right:0;top:10%;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,.25),transparent 70%);animation:orbFloat 4s ease-in-out .5s infinite;opacity:.4"></div>
  `;
}

function createNutricaoScene() {
  return `
    <div style="position:absolute;left:-5%;top:18%;animation:floatSpin 2.8s ease-in-out infinite">
      <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="#4ade80" stroke-width="1.8" stroke-linecap="round" style="filter:drop-shadow(0 8px 30px rgba(74,222,128,.5))"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>
    </div>
    <div style="position:absolute;left:6%;top:62%;animation:floatSpin2 3s ease-in-out .4s infinite">
      <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" style="filter:drop-shadow(0 8px 30px rgba(34,197,94,.5))"><path d="M17 8C8 10 5.9 16.17 3.82 21.34M11 15.94c2.86-.88 4.45-2.56 5.85-5.26M21 3s-3-1-6 1-4.5 5.5-4.5 5.5M21 3l-8 8"/></svg>
    </div>
    <div style="position:absolute;right:-4%;top:15%;animation:floatSpin2 2.6s ease-in-out .2s infinite">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="#4ade80" stroke="none" style="filter:drop-shadow(0 8px 30px rgba(74,222,128,.5))"><path d="M12 2a5 5 0 0 0-4.5 2.8A5 5 0 0 0 3 10c0 6 9 12 9 12s9-6 9-12a5 5 0 0 0-4.5-5.2A5 5 0 0 0 12 2z"/></svg>
    </div>
    <div style="position:absolute;right:-2%;top:65%;animation:floatSpin 3s ease-in-out .7s infinite">
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" style="filter:drop-shadow(0 8px 30px rgba(34,197,94,.5))"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>
    </div>
    <div style="position:absolute;left:0;top:15%;width:100px;height:100px;border-radius:50%;background:radial-gradient(circle,rgba(74,222,128,.3),transparent 70%);animation:orbFloat 4s ease-in-out infinite;opacity:.4"></div>
    <div style="position:absolute;right:0;top:25%;width:90px;height:90px;border-radius:50%;background:radial-gradient(circle,rgba(34,197,94,.25),transparent 70%);animation:orbFloat 4s ease-in-out .4s infinite;opacity:.4"></div>
  `;
}

function createSaudeScene() {
  return `
    <div style="position:absolute;left:-5%;top:10%;animation:floatSpin 2.8s ease-in-out infinite">
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" style="filter:drop-shadow(0 8px 30px rgba(56,189,248,.5))"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    </div>
    <div style="position:absolute;left:5%;top:65%;animation:heartbeat 2.5s ease-in-out infinite">
      <svg viewBox="0 0 24 24" width="44" height="44" fill="#f472b6" stroke="none" style="filter:drop-shadow(0 8px 30px rgba(244,114,182,.5))"><path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572z"/></svg>
    </div>
    <div style="position:absolute;right:-4%;top:12%;animation:floatSpin2 3s ease-in-out .4s infinite">
      <svg viewBox="0 0 24 24" width="52" height="52" fill="none" stroke="#06b6d4" stroke-width="1.8" stroke-linecap="round" style="filter:drop-shadow(0 8px 30px rgba(6,182,212,.5))"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    </div>
    <div style="position:absolute;right:-2%;top:68%;animation:heartbeat 2.8s ease-in-out .5s infinite">
      <svg viewBox="0 0 24 24" width="36" height="36" fill="#f472b6" stroke="none" style="filter:drop-shadow(0 8px 30px rgba(244,114,182,.5))"><path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572z"/></svg>
    </div>
    <div style="position:absolute;left:-8%;top:30%">
      <svg viewBox="0 0 200 60" width="160" height="48" style="opacity:.6"><path d="M0 30 L40 30 L50 10 L60 50 L70 20 L80 40 L90 30 L200 30" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:200;animation:ecgDraw 2s linear infinite;filter:drop-shadow(0 0 8px #38bdf8)"/></svg>
    </div>
    <div style="position:absolute;right:-10%;top:55%">
      <svg viewBox="0 0 200 60" width="160" height="48" style="opacity:.6"><path d="M0 30 L40 30 L50 10 L60 50 L70 20 L80 40 L90 30 L200 30" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:200;animation:ecgDraw 2s linear infinite;filter:drop-shadow(0 0 8px #38bdf8)"/></svg>
    </div>
    <div style="position:absolute;left:0;top:10%;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle,rgba(56,189,248,.25),transparent 70%);animation:orbFloat 4s ease-in-out infinite;opacity:.4"></div>
    <div style="position:absolute;right:0;top:15%;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(244,114,182,.2),transparent 70%);animation:orbFloat 4s ease-in-out .3s infinite;opacity:.4"></div>
  `;
}

// Plan WhatsApp links
function enviarWhatsPlano(plano, preco) {
  var texto = encodeURIComponent('Olá! Tenho interesse no Plano ' + plano + ' (' + preco + '/mês).');
  window.open('https://wa.me/5561986351036?text=' + texto, '_blank');
}
