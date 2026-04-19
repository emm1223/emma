from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.platypus import PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors

pdf_path = "/mnt/data/plan_semestre_1_completo_premium.pdf"

styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    'title',
    parent=styles['Title'],
    fontSize=24,
    textColor=colors.HexColor("#0A3D62"),
    leading=28,
)

subtitle_style = ParagraphStyle(
    'subtitle',
    parent=styles['Heading2'],
    fontSize=18,
    textColor=colors.HexColor("#1B9CFC"),
    leading=22,
)

section_style = ParagraphStyle(
    'section',
    parent=styles['Heading3'],
    fontSize=14,
    textColor=colors.HexColor("#3c6382"),
    leading=16,
)

text_style = ParagraphStyle(
    'text',
    parent=styles['BodyText'],
    fontSize=11,
    leading=15,
)

story = []

# ---------- TITLE ----------
story.append(Paragraph("Semestre 1 — Ingeniería de Sistemas<br/>Guía Premium de Estudio", title_style))
story.append(Spacer(1, 0.3*inch))

# ---------- FOR EACH SUBJECT WE ADD EVERY TOPIC ----------
materias = {
    "Matemáticas 1": [
        "Funciones y su análisis",
        "Límites y continuidad",
        "Derivadas y reglas de derivación",
        "Aplicaciones de la derivada (máximos, mínimos, optimización)",
        "Gráficas y comportamiento de funciones",
        "Introducción a integrales"
    ],
    "Fundamentos de Ingeniería": [
        "Qué es la ingeniería",
        "Pensamiento sistémico",
        "Ramas de la ingeniería",
        "Metodología de proyectos",
        "Ética profesional",
        "Ciclo de vida de un producto tecnológico"
    ],
    "Ciencias para la vida": [
        "Método científico",
        "Biología base del funcionamiento humano",
        "Ecología y sostenibilidad",
        "Impacto ambiental de la tecnología",
        "Pensamiento crítico"
    ],
    "Estructuración del Pensamiento 1": [
        "Lógica proposicional",
        "Lógica de predicados",
        "Argumentación y razonamiento",
        "Identificación de falacias",
        "Métodos de solución de problemas",
        "Pensamiento abstracto"
    ],
    "Desarrollo de Sistemas de Información 1": [
        "Qué es un sistema de información",
        "Componentes de un SI (hardware, software, datos, personas, procesos)",
        "Ciclo de vida de sistemas",
        "Modelado básico de datos",
        "Diagramas de flujo",
        "Introducción a bases de datos",
        "Arquitectura cliente-servidor"
    ],
    "Principios de Sistemas de Información": [
        "Conceptos fundamentales de información y datos",
        "Tipos de sistemas (TPS, MIS, DSS, ESS)",
        "Procesamiento de datos",
        "Seguridad básica de la información",
        "Redes y comunicación",
        "Infraestructura tecnológica"
    ]
}

# BUILD SECTIONS
for materia, temas in materias.items():
    story.append(Paragraph(materia, subtitle_style))
    story.append(Spacer(1, 0.15*inch))
    for t in temas:
        story.append(Paragraph(f"• {t}", text_style))
        story.append(Spacer(1, 0.05*inch))
    story.append(Spacer(1, 0.3*inch))

# ---------- EXTRA PREMIUM SECTION ----------
story.append(PageBreak())
story.append(Paragraph("Checklist de Repaso — Nivel Ventaja", subtitle_style))
story.append(Spacer(1, 0.2*inch))

checklist = [
    "Repasar derivadas todos los días hasta que salgan automáticas.",
    "Resolver 20 ejercicios de lógica por semana (tablas de verdad, proposiciones).",
    "Construir al menos 5 diagramas de flujo por tu cuenta.",
    "Aprender los comandos esenciales de Linux (ls, cd, cp, grep, chmod, systemctl…).",
    "Gestionar un mini proyecto personal en GitHub.",
    "Practicar 1 hora semanal en TryHackMe: módulos de redes, Linux y fundamentos de ciberseguridad.",
    "Aprender conceptos de redes: IP, DNS, DHCP, switches, routers, protocolos.",
    "Crear una base de datos pequeña y consultarla con SELECT, INSERT, UPDATE.",
]

for c in checklist:
    story.append(Paragraph(f"✔ {c}", text_style))
    story.append(Spacer(1, 0.1*inch))

# BUILD PDF
doc = SimpleDocTemplate(pdf_path, pagesize=letter)
doc.build(story)

pdf_path
