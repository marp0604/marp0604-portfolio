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
  build; **cero llamadas externas**):
  - `Space Grotesk Variable` → display/titulares
  - `Inter Variable` → cuerpo
  - `JetBrains Mono Variable` → metadatos/etiquetas
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
- `public/` — `perfil.jpg`, `og-image.png`, CV en PDF, `robots.txt`, favicons.

## Diseño (mantener coherencia)
Estética **oscura premium**: base carbón/grafito (nunca negro puro) con acento
**verde lima `#c8f060`** y glow suave. Todos los colores/efectos son variables
CSS en `:root` (`--bg`, `--lime`, `--glow`, `--gradient-hero`, etc.) — reutilízalas
en vez de hardcodear. Microanimaciones sutiles (reveals, pulso del punto del logo,
empujoncito de la flecha de scroll).

## Convenciones y avisos importantes
- **NO añadir `Co-Authored-By: Claude ...` en los commits de este repo.** El
  historial se limpió y el usuario no quiere a "claude" en el panel de
  Contributors de GitHub.
- **CSP estricta** en `vercel.json`: `script-src 'self'`, `style-src 'self'`,
  `font-src 'self'`. **No añadas recursos externos** (CDNs, Google Fonts, scripts
  de terceros) sin actualizar la CSP — se bloquearán. Por eso Astro emite el
  script como archivo externo (`assetsInlineLimit: 0` en `astro.config.mjs`) y las
  fuentes van auto-alojadas.
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
