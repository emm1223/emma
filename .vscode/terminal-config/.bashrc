# 🚀 BASHRC INTELIGENTE PARA GIT BASH
# Configuración estilo Kali Linux con autocompletado contextual
# Actualizado: 1 de Julio, 2026

# ============================================================================
# 1. COLORES Y VARIABLES
# ============================================================================

export TERM=xterm-256color

# Colores ANSI
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[0;37m'
NC='\033[0m' # No Color

# ============================================================================
# 2. PROMPT INTELIGENTE (Con Git + Contexto)
# ============================================================================

# Función para obtener rama actual de Git
git_branch() {
    if git rev-parse --git-dir > /dev/null 2>&1; then
        echo " $(git branch 2>/dev/null | grep '^*' | colrm 1 2)"
    fi
}

# Función para obtener estado de Git
git_status() {
    if git rev-parse --git-dir > /dev/null 2>&1; then
        if git diff --quiet && git diff --cached --quiet; then
            echo "✓"
        else
            echo "⚠"
        fi
    fi
}

# Prompt personalizado
PS1="\n${CYAN}┌─[${GREEN}\u${CYAN}@${BLUE}\h${CYAN}]─[${YELLOW}\w${CYAN}]${RED}\$(git_branch)${CYAN}\n└─\$ ${NC}"

# ============================================================================
# 3. ALIAS ÚTILES (Como en Kali)
# ============================================================================

# Navegación rápida
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias home='cd ~'
alias desktop='cd ~/Desktop'
alias docs='cd ~/Documents'

# Listados mejorados
alias ls='ls -lhA --color=auto'
alias la='ls -lah'
alias ll='ls -lh'
alias l='ls -CF'
alias ldir='ls -d */'
alias lsort='ls -lhS' # Ordenar por tamaño

# Git aliases
alias git='git'
alias gst='git status'
alias gco='git checkout'
alias gcb='git checkout -b'
alias gadd='git add .'
alias gc='git commit -m'
alias gpush='git push'
alias gpull='git pull'
alias glog='git log --oneline -n 10'
alias gb='git branch -a'
alias gd='git diff'

# Proyectos frecuentes
alias carro='cd /c/Proyectos/emma/PROYECTOCARRO'
alias yellow='cd /c/Proyectos/emma/yellow'
alias emma='cd /c/Proyectos/emma'

# Desarrollo
alias serve='python -m http.server 8000'
alias npmstart='npm run dev'
alias npmtest='npm test'

# Sistema
alias cls='clear'
alias history='history | tail -20'
alias path='echo $PATH | tr ":" "\n"'
alias weather='curl wttr.in'

# ============================================================================
# 4. FUNCIONES INTELIGENTES
# ============================================================================

# Función para crear carpeta y entrar
mkcd() {
    mkdir -p "$1" && cd "$1"
}

# Función para mostrar menú de comandos según carpeta actual
show_menu() {
    echo -e "\n${CYAN}═══════════════════════════════════════${NC}"
    
    # Detectar qué proyecto estamos
    if [[ "$PWD" == *"PROYECTOCARRO"* ]]; then
        echo -e "${GREEN}📦 PROYECTOCARRO - Comandos rápidos:${NC}"
        echo -e "${YELLOW}1)${NC} npm run dev      - Iniciar desarrollo"
        echo -e "${YELLOW}2)${NC} npm run build    - Build producción"
        echo -e "${YELLOW}3)${NC} npm run lint     - Revisar código"
        echo -e "${YELLOW}4)${NC} npm test         - Tests"
        
    elif [[ "$PWD" == *"yellow"* ]]; then
        echo -e "${GREEN}🌟 YELLOW - Comandos rápidos:${NC}"
        echo -e "${YELLOW}1)${NC} serve            - Servidor web"
        echo -e "${YELLOW}2)${NC} git status       - Estado Git"
        
    elif [[ "$PWD" == *"emma"* ]]; then
        echo -e "${GREEN}💻 EMMA - Comandos rápidos:${NC}"
        echo -e "${YELLOW}1)${NC} carro            - Ir a PROYECTOCARRO"
        echo -e "${YELLOW}2)${NC} yellow           - Ir a yellow"
        echo -e "${YELLOW}3)${NC} gst              - Git status"
        
    fi
    
    echo -e "${CYAN}═══════════════════════════════════════${NC}\n"
}

# Mostrar menú al entrar a carpeta (opcional)
# Descomenta si quieres que aparezca automaticamente
# show_menu

# Función para ver archivos recientemente modificados
recent() {
    ls -lht | head -${1:-10}
}

# Función para buscar archivos
findf() {
    find . -type f -name "*$1*"
}

# Función para ver tamaño de carpetas
sizedirs() {
    du -h -d 1 | sort -hr
}

# ============================================================================
# 5. HISTORIAL MEJORADO
# ============================================================================

export HISTSIZE=5000
export HISTFILESIZE=10000
export HISTCONTROL=ignoredups:ignorespace

# ============================================================================
# 6. AUTOCOMPLETADO MEJORADO
# ============================================================================

# Habilitar autocompletado
if [ -f /etc/bash_completion ] && ! shopt -oq posix; then
    . /etc/bash_completion
fi

# Autocompletado para git
if [ -f ~/.bash_completion.d/git-completion.bash ]; then
    . ~/.bash_completion.d/git-completion.bash
fi

# ============================================================================
# 7. CONFIGURACIONES UTILES
# ============================================================================

# No crear archivos de historial duplicados
shopt -s histappend

# Revisar el tamaño de la ventana después de cada comando
shopt -s checkwinsize

# Corregir typos en cd
shopt -s cdspell

# Matching de comodines
shopt -s extglob

# ============================================================================
# 8. BANNER DE BIENVENIDA
# ============================================================================

clear

echo -e "${CYAN}"
echo "╔════════════════════════════════════════════╗"
echo "║                                            ║"
echo "║   🚀 GIT BASH - TERMINAL INTELIGENTE 🚀   ║"
echo "║                                            ║"
echo "║   Usuario: ${GREEN}Emmanuel Munayar${CYAN}               ║"
echo "║   Modo: ${GREEN}Full Stack Developer${CYAN}           ║"
echo "║                                            ║"
echo "╚════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${YELLOW}💡 TIP: Escribe 'menu' para ver comandos rápidos${NC}"
echo -e "${YELLOW}💡 TIP: Usa Tab para autocompletar${NC}\n"

# Mostrar rama git actual si está en un repo
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${BLUE}📁 Repositorio: $(basename $(git rev-parse --show-toplevel))${NC}"
    echo -e "${BLUE}🌿 Rama: $(git branch --show-current)${NC}\n"
fi

# ============================================================================
# 9. FUNCIONES BONUS
# ============================================================================

# Función menu para ver comandos contextuales
menu() {
    show_menu
}

# Ver información del sistema
sysinfo() {
    echo -e "${GREEN}═══ INFORMACIÓN DEL SISTEMA ═══${NC}"
    echo -e "Hostname: $(hostname)"
    echo -e "Kernel: $(uname -r)"
    echo -e "PWD: $PWD"
    echo -e "USER: $USER"
    echo ""
}

# Función para limpiar y mostrar estado
cls() {
    clear
    echo -e "${CYAN}Terminal limpiada ✓${NC}"
}

# ============================================================================
# FIN DE CONFIGURACIÓN
# ============================================================================
