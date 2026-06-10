<div align="center">

# marp0604.com

**Portfolio personal de Miguel Ángel Ramírez Pérez**

Desarrollador Multiplataforma — Frontend, Astro, TypeScript

[![Live](https://img.shields.io/badge/%F0%9F%8C%90%20Live-marp0604.com-000000?style=for-the-badge)](https://marp0604.com)

[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![CSS](https://img.shields.io/badge/CSS-vanilla-1572B6?style=flat-square&logo=css3&logoColor=white)]()
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![MIT License](https://img.shields.io/badge/Licencia-MIT-22c55e?style=flat-square)](./LICENSE)

</div>

---

## ¿Qué es esto?

Mi portfolio personal, construido desde cero con **Astro** y **CSS vanilla**. Sin librerías de componentes, sin shortcuts. Todo el código es propio: animaciones con Canvas API, estilos sin frameworks, interacciones con TypeScript puro.

El objetivo fue construir algo rápido, limpio y que refleje cómo trabajo: con criterio, sin capas innecesarias.

---

## Stack

| Capa | Tecnología | Por qué |
|---|---|---|
| Framework | [Astro 5](https://astro.build) | Zero JS por defecto, output estático, DX excelente |
| Lenguaje | TypeScript 5 | Tipado estricto desde el inicio |
| Estilos | CSS vanilla | Control total, sin overhead |
| Animaciones | Canvas API + CSS custom | Sin dependencias externas |
| Tipografía | [Fontshare](https://www.fontshare.com) | Cabinet Grotesk + Satoshi |
| Deploy | Vercel | CI/CD automático desde `master` |

---

## Estructura del proyecto

```
/
├── public/
│   ├── perfil.jpg          # Foto de perfil
│   ├── og-image.png        # Imagen para Open Graph / redes sociales
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── pages/
│   │   └── index.astro     # Página principal (todo en una sola página)
│   └── styles/             # CSS global y tokens de diseño
├── astro.config.mjs
├── vercel.json             # Headers de seguridad + config de deploy
└── tsconfig.json
```

---

## Desarrollo local

**Requisitos:** Node.js 18+

```bash
# 1. Clonar el repositorio
git clone https://github.com/marp0604/marp0604-portfolio.git
cd marp0604-portfolio

# 2. Instalar dependencias
npm install

# 3. Arrancar el servidor de desarrollo
npm run dev
```

Abre [localhost:4321](http://localhost:4321) en el navegador.

### Comandos disponibles

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Previsualizar el build local antes de desplegar |

---

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

```bash
cp .env.example .env
```

Consulta `.env.example` para ver qué variables son necesarias. Ningún secreto se versiona en el repositorio.

---

## Licencia

MIT — Código fuente disponible públicamente.

Puedes usarlo como referencia o inspiración. Si lo haces, se agradece mencionar la fuente.

---

<div align="center">

Hecho con criterio por [Miguel Ángel Ramírez](https://marp0604.com)

</div>
