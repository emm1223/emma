#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const projectPath = path.resolve(__dirname, '..');
const homeDir = os.homedir();
const platform = process.platform;

console.log('\n🎵 Configurando atajo de teclado para Albani...\n');

// Función para detectar shell
function getShell() {
  const shells = ['.zshrc', '.bashrc', '.bash_profile'];
  for (const shell of shells) {
    if (fs.existsSync(path.join(homeDir, shell))) {
      return shell;
    }
  }
  return '.bashrc';
}

// Función para crear alias permanente
function setupAlias() {
  const shellFile = getShell();
  const shellPath = path.join(homeDir, shellFile);
  const aliasCommand = `alias albani='cd ${projectPath} && npm run albani'`;
  
  if (!fs.existsSync(shellPath)) {
    fs.writeFileSync(shellPath, '');
  }
  
  const content = fs.readFileSync(shellPath, 'utf-8');
  if (!content.includes('alias albani')) {
    fs.appendFileSync(shellPath, `\n# Albani Gallery Alias\n${aliasCommand}\n`);
    console.log(`✅ Alias añadido a ~/${shellFile}`);
    console.log(`   Comando: alias albani='cd ${projectPath} && npm run albani'`);
  } else {
    console.log(`✅ Alias de Albani ya existe en ~/${shellFile}`);
  }
}

// Función para Linux (GNOME)
function setupLinuxShortcut() {
  try {
    const command = `cd ${projectPath} && npm run albani`;
    
    console.log('\n📋 Instrucciones para Linux (GNOME):\n');
    console.log('1. Abre "Configuración" (Settings)');
    console.log('2. Ve a "Teclado" → "Atajos personalizados"');
    console.log('3. Haz clic en "+" para crear un nuevo atajo');
    console.log('4. Nombre: "Abrir Albani"');
    console.log(`5. Comando: ${command}`);
    console.log('6. Presiona el atajo deseado (ej: Ctrl+Alt+A)');
    console.log('\n⚠️  Si usas KDE Plasma o i3, consulta la documentación de tu DE.\n');
    
    // Intenta configurar automáticamente si gsettings está disponible
    try {
      execSync('which gsettings', { stdio: 'ignore' });
      console.log('💡 Intentando configurar automáticamente con gsettings...\n');
      
      const keyName = 'open-albani';
      const schema = 'org.gnome.settings-daemon.plugins.media-keys';
      const customKeysSchema = 'org.gnome.settings-daemon.plugins.media-keys.custom-keybindings';
      
      execSync(`gsettings set ${customKeysSchema} ['/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/open-albani/']`);
      execSync(`gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybindings:/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/open-albani/ name 'Abrir Albani'`);
      execSync(`gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybindings:/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/open-albani/ command 'bash -c "cd ${projectPath} && npm run albani"'`);
      execSync(`gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybindings:/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/open-albani/ binding '<Control><Alt>a'`);
      
      console.log('✅ ¡Atajo de teclado configurado!\n');
      console.log('🎵 Presiona Ctrl+Alt+A para abrir Albani desde cualquier lugar.\n');
    } catch (e) {
      console.log('ℹ️  No se pudo configurar automáticamente. Sigue los pasos manuales arriba.\n');
    }
  } catch (error) {
    console.error('❌ Error en Linux:', error.message);
  }
}

// Función para Windows
function setupWindowsShortcut() {
  const batFile = path.join(homeDir, 'albani.bat');
  const batContent = `@echo off\ncd /d "${projectPath}" && npm run albani`;
  
  fs.writeFileSync(batFile, batContent);
  console.log('\n📋 Instrucciones para Windows:\n');
  console.log(`1. Archivo de acceso rápido creado: ${batFile}`);
  console.log('2. Haz clic derecho en el archivo y selecciona "Crear acceso rápido"');
  console.log('3. Haz clic derecho en el acceso rápido y ve a "Propiedades"');
  console.log('4. En "Acceso rápido de teclado", presiona tu combinación deseada (ej: Ctrl+Alt+A)');
  console.log('5. Presiona "Aplicar" y "Aceptar"');
  console.log('\n✅ Archivo .bat creado exitosamente.\n');
}

// Función para Mac
function setupMacShortcut() {
  console.log('\n📋 Instrucciones para macOS:\n');
  console.log('Opción 1: Usar Automator');
  console.log('1. Abre "Automator" (busca en Spotlight)');
  console.log('2. Crea un nuevo documento de tipo "Quick Action"');
  console.log('3. En el menú, busca "Run Shell Script"');
  console.log('4. Copia este comando:');
  console.log(`   cd ${projectPath} && npm run albani`);
  console.log('5. Guarda como "Abrir Albani"');
  console.log('6. Ve a Preferencias del Sistema → Teclado → Atajos → Servicios');
  console.log('7. Asigna tu combinación de teclas (ej: Ctrl+Alt+A)\n');
  
  console.log('Opción 2: Script en bash (más simple)');
  console.log('1. Abre Terminal');
  console.log('2. Ejecuta:');
  console.log(`   echo "#!/bin/bash\\ncd ${projectPath} && npm run albani" > /usr/local/bin/albani && chmod +x /usr/local/bin/albani`);
  console.log('3. Luego crea un atajo en Preferencias del Sistema → Teclado\n');
}

// Main
function main() {
  // Configurar alias primero
  setupAlias();
  
  // Configuración específica por SO
  if (platform === 'linux') {
    setupLinuxShortcut();
  } else if (platform === 'win32') {
    setupWindowsShortcut();
  } else if (platform === 'darwin') {
    setupMacShortcut();
  } else {
    console.log('⚠️  Sistema operativo no reconocido.');
  }
  
  console.log('─'.repeat(60));
  console.log('\n📝 PRÓXIMOS PASOS:\n');
  console.log('1. Cierra y reabre tu terminal para que se active el alias');
  console.log('2. Prueba escribiendo: albani');
  console.log('3. Sigue las instrucciones arriba para configurar el atajo de teclado');
  console.log('\n¡Listo! 🎉\n');
}

main();
