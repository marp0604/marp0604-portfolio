# marp0604.com — Portfolio personal

Portfolio de Miguel Ángel Ramírez Pérez, Frontend Developer.

**[marp0604.com](https://marp0604.com)**

---

## Stack

- **Framework** — [Astro](https://astro.build) (static output)
- **Estilos** — CSS propio, sin librerías de componentes
- **Animaciones** — Canvas API, CSS custom
- **Lenguaje** — TypeScript
- **Deploy** — Vercel

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [localhost:4321](http://localhost:4321) en el navegador.

## Comandos disponibles

| Comando | Acción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Previsualizar el build antes de desplegar |

## Estructura del proyecto

```
/
├── public/          # Assets estáticos
├── src/
│   ├── components/  # Componentes reutilizables
│   ├── layouts/     # Layouts globales
│   └── pages/       # Páginas (cada archivo = ruta)
└── astro.config.mjs
```

## Licencia

Código fuente disponible públicamente. Si lo usas como referencia, menciona la fuente.
