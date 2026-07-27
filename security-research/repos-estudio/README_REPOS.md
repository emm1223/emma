# 🔬 Repositorios de Estudio - Seguridad

Estructura organizada para clonar repositorios famosos de seguridad.

---

## 📁 Estructura

```
repos-estudio/
├── malware-analysis/           # Análisis de malware
├── reverse-engineering/        # Ingeniería inversa
├── yara-rules/                 # Reglas de detección YARA
├── papers-research/            # Papers y artículos de investigación
└── README_REPOS.md             # Este archivo
```

---

## 🔗 Repositorios Populares

### 1️⃣ theZoo - Colección de Malware
- **Descripción:** Malware coleccionado para análisis educativo
- **Ubicación:** carpeta `malware-analysis/`
- **Clona con:**
```bash
cd c:\Proyectos\emma\security-research\repos-estudio\malware-analysis
git clone https://github.com/thezoo/theZoo.git
# o busca en GitHub: "theZoo malware"
```

### 2️⃣ VXUG Papers - Investigación Virus/Seguridad
- **Descripción:** Papers sobre virus y seguridad (VXUG = Virus eXchange User Group)
- **Ubicación:** carpeta `papers-research/`
- **Clona con:**
```bash
cd c:\Proyectos\emma\security-research\repos-estudio\papers-research
git clone https://github.com/VXUG/VXUG-Papers.git
# o busca: "VXUG papers security"
```

### 3️⃣ YARA Rules - Reglas de Detección
- **Descripción:** Colección de reglas YARA para detectar malware
- **Ubicación:** carpeta `yara-rules/`
- **Clona con:**
```bash
cd c:\Proyectos\emma\security-research\repos-estudio\yara-rules
git clone https://github.com/Yara-Rules/YARA_Rules.git
# o busca: "YARA rules malware detection"
```

### 4️⃣ Curse-Rat - Herramienta RAT/Malware
- **Descripción:** Remote Access Trojan (herramienta de control remoto)
- **Ubicación:** carpeta `reverse-engineering/`
- **Clona con:**
```bash
cd c:\Proyectos\emma\security-research\repos-estudio\reverse-engineering
git clone https://github.com/curse-rat/Curse-Rat.git
# o busca: "curse rat github"
```

---

## 🔍 Si no encuentras los repos exactos:

1. **Busca en GitHub:** https://github.com/search
2. **Filtra por tipo:** Repositories
3. **Busca:** "theZoo malware" o el nombre que recuerdes
4. **Copia la URL HTTPS** del repo
5. **Clona:** `git clone [URL]`

---

## 📋 Alternativas Conocidas

Si los repos originales no existen, busca estos famosos:

- **theZoo:** `github.com/thezoo/theZoo` o variantes
- **YARA Rules:** `github.com/VirusTotal/yara` o `github.com/Yara-Rules/yara`
- **Malware Analysis:** `github.com/maliceio/malice` o `github.com/MISP/MISP`
- **Reverse Engineering:** `github.com/radareorg/radare2` o `github.com/angr/angr`

---

## 🎯 Pasos para Clonar Manualmente

### Opción 1: Por Terminal

```bash
# Abre terminal en cada carpeta
cd 'c:\Proyectos\emma\security-research\repos-estudio\malware-analysis'

# Clona el repo (reemplaza URL)
git clone https://github.com/usuario/repositorio.git

# Verifica
ls
```

### Opción 2: Script Automatizado

Crea `clonar_repos.sh` (en `repos-estudio/`):

```bash
#!/bin/bash

# theZoo
echo "Clonando theZoo..."
cd malware-analysis && git clone https://github.com/thezoo/theZoo.git && cd ..

# VXUG Papers
echo "Clonando VXUG Papers..."
cd papers-research && git clone https://github.com/VXUG/VXUG-Papers.git && cd ..

# YARA Rules
echo "Clonando YARA Rules..."
cd yara-rules && git clone https://github.com/Yara-Rules/YARA_Rules.git && cd ..

# Curse Rat
echo "Clonando Curse Rat..."
cd reverse-engineering && git clone https://github.com/curse-rat/Curse-Rat.git && cd ..

echo "Listo!"
```

Luego ejecuta:
```bash
bash clonar_repos.sh
```

---

## ✅ Verificar Clones

```bash
# Ver estructura
tree /F

# Ver tamaño
du -sh *

# Ver qué se clonó
ls -la */
```

---

## 📚 Una vez clonados, puedes:

1. **Estudiar** el código
2. **Analizar** malware (en VM segura)
3. **Entender** técnicas de seguridad
4. **Extraer** reglas YARA
5. **Documentar** hallazgos

---

## ⚠️ IMPORTANTE - SEGURIDAD

⚠️ **NO ejecutes código malicioso en tu máquina principal**
- Usa máquinas virtuales (VirtualBox, VMware)
- Aisla la red si analizas malware real
- Algunos repos contienen muestras peligrosas

---

## 🤝 Contribuye

Si encuentras repos mejores o actualizados:
1. Actualiza este README
2. Agrega links correctos
3. Documenta qué cada repo contiene
4. Commit y push

---

**Última actualización:** 16 de Julio 2026
**Estado:** Estructura lista, repos por confirmar URLs exactas
