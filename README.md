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

Resumen

EMMA es el laboratorio personal de Emmanuel Munayar para prototipos, demos y proyectos ligeros. Aquí documento soluciones rápidas, experimentos front-end y ejemplos útiles para aprendizaje y reutilización.

---

**Contacto**

- **Email:** [emmanuelmunayar@gmail.com](mailto:emmanuelmunayar@gmail.com)
- **WhatsApp:** [+57 317 474 3252](https://wa.me/573174743252)
- **LinkedIn:** https://www.linkedin.com/in/emm1223
- **GitHub:** https://github.com/emm1223

---

**Educación**

- Universidad El Bosque — Bogotá, Colombia

---

**Proyectos destacados**

- **basic/** — plantillas frontend, utilidades y experimentos.
- **basic/presentacion/** — demos y páginas estáticas (opcion1, opcion2).
- **minoviabella/** — ejemplos de páginas y cartas.

---

<div align="center">

![EMMA Hero](./assets/hero-personal.svg)

# EMMA — Laboratorio de Código

Prototipos, demos y proyectos ligeros — enfoque en entrega rápida y aprendizaje técnico.

[![GitHub](https://img.shields.io/badge/GitHub-%23181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/emm1223)  
[![CI](https://img.shields.io/badge/CI-%23007ACC?style=for-the-badge)](https://github.com/emm1223/emma/actions)

</div>

---

## Descripción técnica

Repositorio de experimentos y plantillas orientadas a desarrollo frontend y despliegue ligero. Contiene ejemplos React (Create React App + Tailwind/PostCSS), páginas estáticas y utilidades para pruebas y debugging.

Uso principal: prototipado rápido, demostraciones y referencia técnica.

---

## Tecnologías clave

- Node.js / npm (Create React App) — `basic/margarita.installer`
- Tailwind CSS + PostCSS (configuración en `basic/margarita.installer`)
- Python 3 — utilidades y ejemplos (`basic/python/`)
- Docker + nginx — despliegue estático (`Dockerfile`, `docker-compose.yml`, `run.sh`)

---

## Estructura del repositorio

- `basic/` — plantillas y demos frontend
  - `margarita.installer/` — proyecto CRA con Tailwind/PostCSS
  - `presentacion/` — páginas estáticas de ejemplo
- `minoviabella/` — ejemplos de páginas estáticas
- `docs/` — landing estática (lista para servir o desplegar)
- `assets/` — logos, hero SVG y recursos gráficos

---

## Desarrollo local

1) Clona el repositorio:

```bash
git clone https://github.com/emm1223/emma.git
cd emma
```

2) Servir la landing estática (rápido):

```bash
python3 -m http.server --directory docs 8000
# Abrir http://localhost:8000
```

3) Correr el proyecto React de ejemplo (`basic/margarita.installer`):

```bash
cd basic/margarita.installer
npm install
npm start
# Desarrollo en http://localhost:3000
```

4) Levantar sitio con Docker (producción local):

```bash
./run.sh
# o
docker-compose up --build
# Sitio en http://localhost:8080
```

---

## Construcción y despliegue

- `Dockerfile` copia `docs/` a un contenedor nginx listo para producción.
- Para construir la imagen manualmente:

```bash
docker build -t emma-site .
docker run -p 8080:80 emma-site
```

---

## Scripts relevantes

- `basic/margarita.installer/package.json` contiene scripts estándar de CRA: `start`, `build`, `test`.
- `run.sh` y `docker-compose.yml` orquestan despliegue local con Docker.

---

## Pruebas y ejemplos

- Hay scripts de ejemplo para depuración en `basic/python/test_debug.py`.
- Ejecuta `pytest` o scripts directos para verificar utilidades Python.

---

## Contribución técnica

- Abre una issue para discutir cambios grandes antes de implementar.
- Para contribuciones: fork → branch → PR. Incluye descripción técnica y pasos para reproducir.

Checklist para PRs:
- comportamiento documentado en `README.md` o en nuevos archivos `docs/`
- archivos estáticos optimizados (SVG/PNG)
- si agregas dependencias, incluye justificación y actualiza `package.json` o `requirements.txt`

---

## Contacto

- Emmanuel Munayar — [emmanuelmunayar@gmail.com](mailto:emmanuelmunayar@gmail.com)

---

Si quieres que amplíe secciones técnicas (CI, política de versiones, ejemplos de despliegue automatizado o plantillas de PR/ISSUE), dímelo y lo añado.
