/**
 * Parallax sutil do fundo do hero: a imagem se move mais devagar que o
 * scroll da página. Respeita prefers-reduced-motion.
 */
(function () {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const FACTOR = 0.4;
  let ticking = false;

  function apply() {
    heroBg.style.transform = `translateY(${window.scrollY * FACTOR}px)`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(apply);
      ticking = true;
    }
  }, { passive: true });
})();
