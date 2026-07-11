// Activar animaciones reveal solo si JS carga correctamente
document.body.classList.add('js-ready');

// Email obfuscation
(function () {
  const email = 'contacto' + '@' + 'marp0604' + '.' + 'com';
  const display = document.getElementById('email-display');
  if (display) {
    const link = document.createElement('a');
    link.href = 'mailto:' + email;
    link.textContent = email;
    display.appendChild(link);
  }
  const contactBtn = document.getElementById('contact-btn');
  const btnText = document.getElementById('contact-btn-text');
  if (contactBtn && btnText) {
    btnText.textContent = email;
    contactBtn.addEventListener('click', () => { window.location.href = 'mailto:' + email; });
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

  // Cerrar al pasar a escritorio (la hamburguesa desaparece a >820px)
  const desktop = window.matchMedia('(min-width: 821px)');
  desktop.addEventListener('change', (e) => { if (e.matches && isOpen()) closeMenu(); });
}
