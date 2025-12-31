<div align="center">

![EMMA Hero](./assets/hero-personal.svg)

## EMMA — Laboratorio de Código
### Prototipos · Producción ligera · Innovación continua

[![GitHub](https://img.shields.io/badge/GitHub-%23181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/emm1223)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/emm1223)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-%2300C851?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/573174743252)

[![CI](https://img.shields.io/github/actions/workflow/status/emm1223/emma/ci.yml?branch=main&label=ci&style=for-the-badge)](https://github.com/emm1223/emma/actions/workflows/ci.yml)

</div>

---

**Idioma:** [Español](#sobre-m%C3%AD) • [English](#english)

## Contenido

- [Sobre mí](#sobre-m%C3%AD)
- [Qué hago](#qu%C3%A9-hago)
- [Tecnologías & herramientas](#tecnolog%C3%ADas--herramientas)
- [Proyectos destacados](#proyectos-destacados)
- [Desarrollo local (rápido)](#desarrollo-local-r%C3%A1pido)
- [Construcción y despliegue](#construcci%C3%B3n-y-despliegue)
- [Pruebas y ejemplos](#pruebas-y-ejemplos)
- [Contribuciones](#contribuciones)
- [Contacto](#contacto)
- [English](#english)

---
---

Resumen

EMMA es el laboratorio personal de Emmanuel Munayar para prototipos, demos y proyectos ligeros. Aquí documento soluciones rápidas, experimentos front-end y ejemplos útiles para aprendizaje y reutilización.

---

**Contacto**

- **Email:** [emmanuelmunayar@gmail.com](mailto:emmanuelmunayar@gmail.com)
- **WhatsApp:** [+57 317 474 3252](https://wa.me/573174743252)
- **LinkedIn:** https://www.linkedin.com/in/emm1223

<div align="center">

# Emmanuel Munayar — EMMA

Frontend developer & prototipador · Diseño de interfaces y despliegue ligero

[![GitHub](https://img.shields.io/badge/GitHub-%23181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/emm1223) [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/emm1223) [![Mail](https://img.shields.io/badge/Email-%23EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:emmanuelmunayar@gmail.com)

</div>

---

## Sobre mí

Soy Emmanuel Munayar, desarrollador frontend y creador del laboratorio EMMA. Me especializo en prototipado rápido, interfaces accesibles y despliegues ligeros. Trabajo con herramientas modernas (React, Tailwind, PostCSS) y automatizo flujos con Docker y CI cuando es necesario.

**Formación:** Universidad El Bosque — Bogotá, Colombia.

Vivo en Bogotá y me apasiona construir prototipos que se puedan iterar rápido y llevar a producción cuando aportan valor.

---

## Qué hago

- Diseño y desarrollo de interfaces web interactivas (React + Tailwind).
- Prototipado rápido para validar ideas y UX.
- Automatización de despliegues ligeros con Docker y configuración de pipelines simples de CI.

---

## Tecnologías & herramientas

- Lenguajes: JavaScript (ES6+), TypeScript, Python
- Frontend: React, HTML5, CSS3, Tailwind CSS, PostCSS
- Build & Tooling: npm, Create React App, PostCSS
- DevOps / despliegue: Docker, nginx, GitHub Actions
- Testing: Jest, Testing Library

---

## Proyectos destacados

- `basic/margarita.installer/` — plantilla CRA con Tailwind/PostCSS (setup y scripts listos)
- `basic/presentacion/` — ejemplos de páginas estáticas para demos rápidas
- `minoviabella/cartas/carta1` — ejemplo de carta web estática

---

## Desarrollo local (rápido)

Clona y entra al repo:

```bash
git clone https://github.com/emm1223/emma.git
cd emma
```

- Servir la landing estática:

```bash
python3 -m http.server --directory docs 8000
# Abrir http://localhost:8000
```

- Ejecutar la plantilla React (`basic/margarita.installer`):

```bash
cd basic/margarita.installer
npm ci
npm start
# Desarrollo en http://localhost:3000
```

- Despliegue local con Docker:

```bash
./run.sh
# o
docker-compose up --build
# Sitio en http://localhost:8080
```

---

## Construcción y despliegue

- El `Dockerfile` copia `docs/` a un contenedor nginx listo para producción.

```bash
docker build -t emma-site .
docker run -p 8080:80 emma-site
```

---

## Pruebas y ejemplos

- Ejemplo de depuración: `basic/python/test_debug.py`.
- Ejecuta `pytest` para Python; para JS usa `npm test` dentro de los proyectos CRA.

---

## Contribuciones

- Abre una issue para discutir cambios grandes. Para contribuciones: fork → branch → PR. Incluye una descripción técnica y pasos para reproducir.

Checklist rápida para PRs:
- Documenta el comportamiento en `README.md` o nuevo archivo en `docs/`.
- Optimiza imágenes y recursos estáticos.
- Si agregas dependencias, explica la necesidad y actualiza `package.json` o `requirements.txt`.

---

## Contacto

- **Emmanuel Munayar** — [emmanuelmunayar@gmail.com](mailto:emmanuelmunayar@gmail.com) • Bogotá, Colombia
- LinkedIn: https://www.linkedin.com/in/emm1223
- GitHub: https://github.com/emm1223

---

Si quieres, puedo añadir una versión en inglés, un CV técnico o ejemplos ampliados de CI/Workflows.

---

# English

<div align="center">

**English version** — quick reference and developer notes.

</div>

---

## About

EMMA is the personal lab of Emmanuel Munayar for rapid prototypes, demos and lightweight production sites. This repository contains frontend templates, static demos and small utilities focused on speed of iteration and practical learning.

**Education:** Universidad El Bosque — Bogotá, Colombia

---

## What I do

- Design and implement interactive web interfaces (React + Tailwind).
- Rapid prototyping to validate UX and product ideas.
- Automate lightweight deployments with Docker and basic CI.

---

## Tech stack

- Languages: JavaScript (ES6+), TypeScript, Python
- Frontend: React, HTML5, CSS3, Tailwind CSS, PostCSS
- Tooling: npm, Create React App, PostCSS
- DevOps: Docker, nginx, GitHub Actions
- Testing: Jest, Testing Library

---

## Notable projects

- `basic/margarita.installer/` — CRA template with Tailwind/PostCSS
- `basic/presentacion/` — static presentation pages
- `minoviabella/cartas/carta1` — static example card

---

## Local development quickstart

```bash
git clone https://github.com/emm1223/emma.git
cd emma
```

- Serve the static landing:

```bash
python3 -m http.server --directory docs 8000
# open http://localhost:8000
```

- Run the React template (`basic/margarita.installer`):

```bash
cd basic/margarita.installer
npm ci
npm start
# dev server at http://localhost:3000
```

- Run the static site with Docker:

```bash
./run.sh
# or
docker-compose up --build
# site at http://localhost:8080
```

---

## Build & deploy

The `Dockerfile` copies `docs/` into an nginx container for production.

```bash
docker build -t emma-site .
docker run -p 8080:80 emma-site
```

---

## Contributing

- Open an issue to discuss larger changes. For contributions: fork → branch → PR. Provide a technical description and reproduction steps.

Checklist for PRs:
- Document behavior in `README.md` or `docs/`.
- Optimize static assets (SVG/PNG).
- If adding dependencies, justify and update `package.json`.

---

## Contact

- Emmanuel Munayar — [emmanuelmunayar@gmail.com](mailto:emmanuelmunayar@gmail.com)
- LinkedIn: https://www.linkedin.com/in/emm1223
- GitHub: https://github.com/emm1223

