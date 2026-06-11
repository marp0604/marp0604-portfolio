// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://marp0604.com',
  output: 'static',
  integrations: [sitemap()],
  // Evita que Astro inyecte el script como inline (lo bloquearía la CSP
  // script-src 'self'). Forzamos su emisión como archivo externo del mismo origen.
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
