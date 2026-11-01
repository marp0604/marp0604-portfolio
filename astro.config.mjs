// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://marp0604.com',
  output: 'static',
  // lastmod = fecha del build: indica a los buscadores cuándo cambió la página.
  integrations: [sitemap({ lastmod: new Date() })],
  // Evita que Astro inyecte el script como inline (lo bloquearía la CSP
  // script-src 'self'). Forzamos su emisión como archivo externo del mismo origen.
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
