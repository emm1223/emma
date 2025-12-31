<div align="center">

# Emmanuel Munayar — EMMA

Frontend Developer & Rapid Prototyper · UI Design and Lightweight Deployments

[![GitHub](https://img.shields.io/badge/GitHub-%23181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/emm1223) [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/emm1223) [![Email](https://img.shields.io/badge/Email-%23EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:emmanuelmunayar@gmail.com)

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

---

If you want a translated README integrated at the top of the repo or a bilingual combined file, I can merge both versions into a single multilingual README.
