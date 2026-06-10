# marp0604.com — Portfolio personal

![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat-square&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/Licencia-MIT-22c55e?style=flat-square)

Portfolio de **[Miguel Ángel Ramírez Pérez](https://marp0604.com)** — Desarrollador Multiplataforma.

Construido con Astro, CSS propio y Canvas API. Sin librerías de componentes, sin atajos.

🌐 **[marp0604.com](https://marp0604.com)**

---

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | [Astro](https://astro.build) — static output |
| Estilos | CSS vanilla — sin frameworks |
| Animaciones | Canvas API + CSS custom |
| Lenguaje | TypeScript |
| Deploy | Vercel |
| Fuentes | [Fontshare](https://www.fontshare.com) (Cabinet Grotesk + Satoshi) |

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [localhost:4321](http://localhost:4321) en el navegador.

## Comandos

| Comando | Acción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Previsualizar el build antes de desplegar |

## Estructura

```
/
├── public/          # Assets estáticos (imágenes, favicon, robots.txt)
├── src/
│   └── pages/       # index.astro — página principal
├── astro.config.mjs
├── vercel.json      # Headers de seguridad + configuración de deploy
└── tsconfig.json
```

## Licencia

MIT — Código fuente disponible públicamente. Si lo usas como referencia o inspiración, menciona la fuente.
