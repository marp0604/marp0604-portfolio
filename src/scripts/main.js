// Activar animaciones reveal solo si JS carga correctamente
document.body.classList.add('js-ready');

// Email obfuscation
(function () {
  const email = 'contacto' + '@' + 'marp0604' + '.' + 'com';
  const display = document.getElementById('email-display');
  if (display) {
    const link = document.createElement('a');
    link.href = 'mailto:' + email;
    // <wbr> antes de la @: en móvil corta «contacto / @marp0604.com», no a mitad de dominio
    const [user, domain] = email.split('@');
    link.append(user, document.createElement('wbr'), '@' + domain);
    display.appendChild(link);
  }
  const contactBtn = document.getElementById('contact-btn');
  const btnText = document.getElementById('contact-btn-text');
  if (contactBtn && btnText) {
    btnText.textContent = email;
    contactBtn.addEventListener('click', () => { window.location.href = 'mailto:' + email; });
  }

  // Copiar email: se muestra solo si el navegador permite escribir en el portapapeles
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  if (copyBtn && copyText && navigator.clipboard) {
    copyBtn.hidden = false;
    let timer;
    copyBtn.addEventListener('click', async () => {
      let ok = true;
      try { await navigator.clipboard.writeText(email); } catch { ok = false; }
      copyText.textContent = ok ? 'Email copiado' : 'No se pudo copiar';
      copyBtn.classList.toggle('is-copied', ok);
      clearTimeout(timer);
      timer = setTimeout(() => {
        copyText.textContent = 'Copiar email';
        copyBtn.classList.remove('is-copied');
      }, 2500);
    });
  }
})();

// Nav: fondo/blur al hacer scroll
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Nav: marca la sección que se está leyendo (aria-current) con una franja en mitad de
// la pantalla. La portada también se observa para desmarcar todo al volver arriba.
(function () {
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const targets = ['top', ...byId.keys()].map(id => document.getElementById(id)).filter(Boolean);
  if (!targets.length) return;
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.removeAttribute('aria-current'));
      byId.get(e.target.id)?.setAttribute('aria-current', 'location');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  targets.forEach(t => spy.observe(t));
})();

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Hamburger menu
const hamburgerBtn = document.getElementById('nav-hamburger-btn');
const overlay = document.getElementById('nav-mobile-overlay');
if (hamburgerBtn && overlay) {
  const mobileLinks = overlay.querySelectorAll('.nav-mobile-link');
  const isOpen = () => hamburgerBtn.getAttribute('aria-expanded') === 'true';
  // Elementos enfocables del diálogo: botón de cierre (hamburguesa) + enlaces del overlay
  const focusables = () => [hamburgerBtn, ...overlay.querySelectorAll('a[href]')];

  function openMenu() {
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Cerrar menú de navegación');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => mobileLinks[0]?.focus());
  }
  function closeMenu(returnFocus = false) {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Abrir menú de navegación');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (returnFocus) hamburgerBtn.focus();
  }

  hamburgerBtn.addEventListener('click', () => {
    isOpen() ? closeMenu(true) : openMenu();
  });
  mobileLinks.forEach(link => link.addEventListener('click', () => closeMenu()));

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') { closeMenu(true); return; }
    if (e.key !== 'Tab') return;
    // Focus trap: mantiene el tabulador dentro del diálogo
    const els = focusables();
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  // Cerrar al pasar a escritorio (la hamburguesa desaparece a >1080px)
  const desktop = window.matchMedia('(min-width: 1081px)');
  desktop.addEventListener('change', (e) => { if (e.matches && isOpen()) closeMenu(); });
}
