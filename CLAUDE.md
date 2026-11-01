# CLAUDE.md — marp0604-portfolio

Portfolio personal de **Miguel Ángel Ramírez Pérez (marp0604)**, desarrollador
multiplataforma. Web de una sola página (one-page) en **Astro**, desplegada en
**Vercel** en `https://marp0604.com`.

## Puesta en marcha (equipo nuevo / casa)
```bash
npm install      # las dependencias NO están versionadas; instálalas siempre
npm run dev      # servidor de desarrollo (http://localhost:4321)
npm run build    # build de producción a dist/ (verifica que compila)
npm run preview  # sirve el build de dist/
```
Requiere Node.js. No hay tests ni linter configurados; la verificación es
`npm run build` + revisión en el navegador.

## Stack
- **Astro 5** (`output: static`), sin framework de UI ni Tailwind.
- **CSS artesanal** en `src/styles/global.css` (un único archivo, con tokens en
  `:root`). Nada de librerías de componentes.
- **Fuentes auto-alojadas** vía Fontsource (paquetes npm, se empaquetan en el
  build; **cero llamadas externas**). Solo las dos del kit de marca:
  - `Inter Variable` → titulares (ExtraBold 800), logo (Black 900) y cuerpo
  - `JetBrains Mono Variable` → etiquetas `// tema`, metadatos, chevrón del logo
- `@astrojs/sitemap` para el sitemap.

## Estructura
- `src/pages/index.astro` — **toda la página**. El contenido (experiencia,
  formación, proyectos, stack) vive en **arrays en el frontmatter**; edítalos ahí.
  Incluye `<head>` (SEO/OG/Twitter), JSON-LD `Person`, e importa las fuentes.
- `src/styles/global.css` — todo el estilo y los tokens de diseño.
- `src/scripts/main.js` — JS del cliente: desofuscación del email, nav con
  blur al hacer scroll, reveals al scroll (IntersectionObserver) y menú móvil
  (con focus-trap y bloqueo de scroll).
- `src/components/Icon*.astro` — iconos SVG inline (GitHub, LinkedIn, CV).
- `src/components/LogoMark.astro` — logo `>MA_` como texto (escala con `font-size`).
- `public/` — `perfil.jpg` (foto real con fondo de marca), `og-image.jpg`
  (1200×630), CV en PDF, `robots.txt`, favicons (`favicon.ico`, `favicon-32.png`,
  `apple-touch-icon.png`, `icon-192/512.png` + `site.webmanifest`) y
  `brand/` con los logos PNG del kit.

## Diseño (mantener coherencia) — kit de marca personal
La web sigue el **kit de marca personal** (logo `>MA_`, guía con colores y
textos). Reglas clave:
- Base **grafito** `#16181D` (nunca negro puro), superficie `#22252C`, líneas
  `#2E323B`, texto `#F4F5F7`, secundario `#9AA0AA`.
- Acento **azul `#3B82F6`** (claro `#93C5FD`). **Un solo acento por pieza**: va en
  la etiqueta `// tema`, en el cursor y en una o dos palabras clave.
- **Prohibido el verde/lima**: es la identidad de VexelPlayPro, no la personal.
- Logo `>MA_`: chevrón en JetBrains Mono azul, «MA» en Inter Black, cursor como
  barra azul. Los titulares terminan con ese cursor (`.cursor`).
- Contraste: los botones rellenos usan `--accent-fill` (`#2563EB`) con texto
  blanco (5,2:1); blanco sobre `#3B82F6` no pasa AA. Texto pequeño en píldoras,
  `--accent-light`.
- Nada de fotos generadas con IA.

Todos los colores/efectos son variables CSS en `:root` (`--bg`, `--accent`,
`--accent-fill`, `--glow`, `--gradient-hero`, etc.) — reutilízalas en vez de
hardcodear. Microanimaciones sutiles (reveals, cursor parpadeante del titular,
cursor del logo al pasar el ratón, empujoncito de la flecha de scroll); con
`prefers-reduced-motion` los cursores se quedan fijos.

La `og-image.jpg` es estática: se generó renderizando un HTML de 1200×630 con
las fuentes del proyecto (estilo de los banners del kit). Si cambia el lema,
hay que regenerarla.

## Convenciones y avisos importantes
- **NO añadir `Co-Authored-By: Claude ...` en los commits de este repo.** El
  historial se limpió y el usuario no quiere a "claude" en el panel de
  Contributors de GitHub.
- **CSP estricta** en `vercel.json`: `script-src 'self'`, `style-src 'self'`,
  `font-src 'self'`. **No añadas recursos externos** (CDNs, Google Fonts, scripts
  de terceros) sin actualizar la CSP — se bloquearán. Por eso Astro emite el
  script como archivo externo (`assetsInlineLimit: 0` en `astro.config.mjs`) y las
  fuentes van auto-alojadas. Tampoco uses atributos `style=""` inline (los bloquea
  `style-src 'self'`): todo el estilo, en clases de `global.css`.
- **El contenido siempre visible sin JS**: los `.reveal` parten visibles; el JS
  añade `.js-ready` al `<body>` para activar la animación. No romper ese patrón.
- **Email ofuscado**: se compone en `main.js`; hay un `<noscript>` con el `mailto`
  de respaldo. Email real: `contacto@marp0604.com`.
- Textos en **español**.

## Deploy
Push a **`master`** → Vercel despliega producción automáticamente en
`marp0604.com`. Trabaja en rama y haz merge cuando esté revisado (o commitea
directo a master para cambios triviales que quieras publicar ya).

## SEO
`site` configurado en `astro.config.mjs`, sitemap en `/sitemap-index.xml`,
`robots.txt` permitiendo indexación, canonical, OG/Twitter y JSON-LD `Person`
(con `alternateName: "marp0604"`). La marca **marp0604** está en el `<title>` y
la meta description. El sitio ya sale el primero en Google al buscar "marp0604".
Para reindexar tras cambios grandes: Google Search Console → enviar sitemap /
solicitar indexación.
