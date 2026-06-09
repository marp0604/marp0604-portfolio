// =============================================================
// main.js — marp0604 portfolio
// Script externo para eliminar unsafe-inline de la CSP
// =============================================================

// ── EMAIL OBFUSCATION ─────────────────────────────────────────
// Las partes del email se ensamblan en runtime para que los bots
// que parsean HTML estático no encuentren la dirección completa.
(function () {
  const u = 'contacto';
  const d = 'marp0604' + '.' + 'com';
  const email = u + '@' + d;

  const display = document.getElementById('email-display');
  if (display) display.textContent = email;

  const btn = document.getElementById('contact-btn');
  const btnText = document.getElementById('contact-btn-text');
  if (btn && btnText) {
    btnText.textContent = email;
    btn.addEventListener('click', () => {
      window.location.href = 'mailto:' + email;
    });
  }
})();

// ── CURSOR ────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.10;
  ry += (my - ry) * 0.10;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

// ── HERO ANIMATIONS ───────────────────────────────────────────
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.getElementById('he').classList.add('show');
    setTimeout(() => document.getElementById('ht').classList.add('show'), 150);
    setTimeout(() => document.getElementById('hb').classList.add('show'), 300);
  });
});

// ── MARQUEE SPEED ─────────────────────────────────────────────
(function setMarqueeSpeed() {
  const PX_PER_SEC = 80;
  const track = document.getElementById('marquee-track');
  if (!track) return;
  requestAnimationFrame(() => {
    const halfWidth = track.scrollWidth / 2;
    const duration  = halfWidth / PX_PER_SEC;
    track.style.animationDuration = duration.toFixed(2) + 's';
  });
})();

// ── CANVAS ────────────────────────────────────────────────────
const canvas = document.getElementById('hero-canvas');
const ctx    = canvas.getContext('2d');
let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
});
const N = 65;
const pts = Array.from({ length: N }, () => ({
  x: Math.random()*W, y: Math.random()*H,
  vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.25,
  r: Math.random()*1.1+0.3, a: Math.random()*0.45+0.15,
}));
function draw() {
  ctx.clearRect(0,0,W,H);
  for (const p of pts) {
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>W) p.vx*=-1;
    if(p.y<0||p.y>H) p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(200,240,96,${p.a*0.5})`;
    ctx.fill();
  }
  for(let i=0;i<N;i++){
    for(let j=i+1;j<N;j++){
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<100){
        ctx.beginPath();
        ctx.moveTo(pts[i].x,pts[i].y);
        ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle=`rgba(200,240,96,${(1-d/100)*0.09})`;
        ctx.lineWidth=0.5; ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();

// ── SCROLL REVEAL ─────────────────────────────────────────────
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if(e.isIntersecting){
      e.target.classList.add('visible');
      const fill = e.target.querySelector('.stack-bar-fill');
      if(fill) setTimeout(()=>fill.classList.add('visible'),80);
    }
  });
},{ threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el)=>obs.observe(el));
