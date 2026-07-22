/**
 * Carrossel de depoimentos — rolagem contínua e infinita.
 * Auto-scroll suave, pausa no hover, arraste com mouse/touch (com inércia)
 * e respeito a prefers-reduced-motion.
 */
function initReviewsCarousel(trackSelector) {
  const track = document.querySelector(trackSelector);
  if (!track) return;

  const wrap = track.parentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SPEED = 32; // px por segundo
  const FRICTION = 0.95; // decaimento da inércia por ~16.6ms

  // Duplica os cards por trás dos panos para o loop parecer infinito.
  Array.from(track.children).forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    track.appendChild(clone);
  });

  let half = 0;
  let offset = 0;
  let paused = false;
  let dragging = false;
  let velocity = 0;
  let startX = 0;
  let startOffset = 0;
  let lastX = 0;
  let lastMoveTime = 0;
  let pointerId = null;
  let lastFrameTime = null;

  function measure() {
    half = track.scrollWidth / 2;
    if (half > 0) offset = ((offset % half) + half) % half;
  }

  function applyTransform() {
    track.style.transform = `translate3d(${-offset}px,0,0)`;
  }

  function frame(timestamp) {
    if (lastFrameTime === null) lastFrameTime = timestamp;
    const dt = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    if (!dragging && half > 0) {
      if (!paused && !prefersReducedMotion) {
        offset += (SPEED * dt) / 1000;
      } else if (Math.abs(velocity) > 0.01) {
        offset += velocity * dt;
        velocity *= Math.pow(FRICTION, dt / 16.6667);
      }
      offset = ((offset % half) + half) % half;
      applyTransform();
    }

    requestAnimationFrame(frame);
  }

  function onPointerDown(e) {
    dragging = true;
    pointerId = e.pointerId;
    startX = e.clientX;
    startOffset = offset;
    lastX = e.clientX;
    lastMoveTime = performance.now();
    velocity = 0;
    wrap.classList.add('is-dragging');
    if (track.setPointerCapture) {
      try { track.setPointerCapture(pointerId); } catch (err) { /* noop */ }
    }
  }

  function onPointerMove(e) {
    if (!dragging) return;
    const dx = e.clientX - startX;
    offset = startOffset - dx;
    if (half > 0) offset = ((offset % half) + half) % half;
    applyTransform();

    const now = performance.now();
    const dt = now - lastMoveTime;
    if (dt > 0) {
      velocity = -(e.clientX - lastX) / dt; // px por ms, usado como inércia
      lastX = e.clientX;
      lastMoveTime = now;
    }
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    wrap.classList.remove('is-dragging');
    if (prefersReducedMotion) velocity = 0;
    if (pointerId !== null && track.releasePointerCapture) {
      try { track.releasePointerCapture(pointerId); } catch (err) { /* noop */ }
    }
    pointerId = null;
  }

  measure();
  window.addEventListener('resize', measure);

  wrap.addEventListener('mouseenter', () => { paused = true; });
  wrap.addEventListener('mouseleave', () => { paused = false; });

  track.addEventListener('pointerdown', onPointerDown);
  track.addEventListener('pointermove', onPointerMove);
  track.addEventListener('pointerup', onPointerUp);
  track.addEventListener('pointercancel', onPointerUp);

  requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', () => {
  initReviewsCarousel('#reviewsTrack');
});
