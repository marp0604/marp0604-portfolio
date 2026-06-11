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

// Cursor
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
if (cursor && cursorRing) {
  let mx = -100, my = -100, rx = -100, ry = -100;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
}

// Hero canvas — particles
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  const N = 55;
  const particles = Array.from({ length: N }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.4,
  }));
  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,240,96,0.7)';
      ctx.fill();
    });
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(200,240,96,${(1 - d / 130) * 0.18})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// Hero reveal
requestAnimationFrame(() => {
  ['he', 'ht', 'hb'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('show');
  });
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Hamburger menu
const hamburgerBtn = document.getElementById('nav-hamburger-btn');
const overlay = document.getElementById('nav-mobile-overlay');
if (hamburgerBtn && overlay) {
  const mobileLinks = overlay.querySelectorAll('.nav-mobile-link');
  function openMenu() {
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Cerrar menú de navegación');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Abrir menú de navegación');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
}
