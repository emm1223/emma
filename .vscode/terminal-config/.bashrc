#!/bin/bash
# ~/.bashrc - Configuración profesional y minimalista
# Emmanuel Munayar - 2026

# ============================================================================
# VARIABLES BASE
# ============================================================================

export TERM=xterm-256color
export HISTSIZE=10000
export HISTFILESIZE=20000
export HISTCONTROL=ignoredups:ignorespace

# ============================================================================
# COLORES
# ============================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[0;37m'
BOLD='\033[1m'
RESET='\033[0m'

# ============================================================================
# FUNCIÓN PARA RAMA GIT
# ============================================================================

parse_git_branch() {
    git branch 2>/dev/null | grep "^\*" | sed "s/^\*[[:space:]]*//g"
}

# ============================================================================
# PROMPT PROFESIONAL
# ============================================================================

PS1="\n${CYAN}❯${RESET} ${GREEN}\u${RESET} ${CYAN}in${RESET} ${MAGENTA}\w${RESET}"
PS1="${PS1}\$(if git rev-parse --git-dir > /dev/null 2>&1; then echo \" ${BLUE}($(parse_git_branch))\"; fi)\n${CYAN}❯${RESET} "

# ============================================================================
# ALIAS - GIT
# ============================================================================

alias g='git'
alias gs='git status'
alias ga='git add'
alias gaa='git add .'
alias gc='git commit -m'
alias gca='git commit --amend'
alias gp='git push'
alias gpl='git pull'
alias glog='git log --oneline -15'
alias gb='git branch'
alias gba='git branch -a'
alias gco='git checkout'
alias gcob='git checkout -b'
alias gd='git diff'
alias gds='git diff --staged'

# ============================================================================
# ALIAS - NAVEGACIÓN
# ============================================================================

alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias l='ls -lhA --color=auto'
alias la='ls -lah --color=auto'
alias ll='ls -lh --color=auto'

# ============================================================================
# ALIAS - PROYECTOS RÁPIDOS
# ============================================================================

alias carro='cd /c/Proyectos/emma/PROYECTOCARRO'
alias yellow='cd /c/Proyectos/emma/yellow'
alias emma='cd /c/Proyectos/emma'

# ============================================================================
# ALIAS - DESARROLLO
# ============================================================================

alias dev='npm run dev'
alias build='npm run build'
alias lint='npm run lint'
alias test='npm test'
alias serve='python -m http.server 8000'

# ============================================================================
# ALIAS - SISTEMA
# ============================================================================

alias cls='clear'
alias h='history | tail -20'
alias path='echo $PATH | tr ":" "\n"'

# ============================================================================
# FUNCIONES ÚTILES
# ============================================================================

mkcd() {
    mkdir -p "$1" && cd "$1"
}

findf() {
    find . -type f -name "*$1*" 2>/dev/null
}

sizedirs() {
    du -h -d 1 | sort -hr
}

# ============================================================================
# OPCIONES DE SHELL
# ============================================================================

shopt -s histappend
shopt -s checkwinsize
shopt -s extglob

# ============================================================================
# FIN
# ============================================================================
