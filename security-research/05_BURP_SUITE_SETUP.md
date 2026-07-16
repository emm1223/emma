# 🔧 Burp Suite Community - Setup Completo

**¿Qué es Burp Suite?**  
Es como "DevTools pero para hackers". Te deja interceptar, modificar y repetir todas las requests HTTP.

---

## 📥 PASO 1: Descargar

**Opción A: Directo (Recomendado)**
1. Ve a: https://portswigger.net/burp/community
2. Click en **"Download"**
3. Elige Windows (64-bit)
4. Descarga el .exe (~100 MB)

**Opción B: Con Chocolatey**
```bash
choco install burpsuite-community
```

---

## 🔧 PASO 2: Instalar

1. Ejecuta el .exe descargado
2. Click **"Next"** hasta el final
3. Marca: ✅ "Run Burp Suite Community"
4. Espera a que se abra (primer start = lento, ~30 seg)

**Primera pantalla:** "Start Burp" → Click

---

## 🌐 PASO 3: Configurar Navegador

Burp Suite actúa como "proxy" (intermediario). Debes decirle al navegador que pase requests por Burp.

### Opción A: Usar Chrome/Edge

1. **Instala extensión FoxyProxy:**
   - Chrome: [FoxyProxy Chrome](https://chrome.google.com/webstore)
   - Edge: [FoxyProxy Edge](https://microsoftedge.microsoft.com)

2. **Configura proxy en FoxyProxy:**
   - Host: 127.0.0.1
   - Puerto: 8080
   - Protocolo: HTTP

3. **Activa el proxy:**
   - Abre FoxyProxy
   - Selecciona "Burp Suite"
   - Verifica status: 🟢 Conectado

### Opción B: Configurar Windows (Global)

```
Settings → Network & Internet → Proxy
→ Manual proxy setup
→ HTTP proxy: 127.0.0.1:8080
→ ✅ Use proxy for all protocols
```

---

## 🔐 PASO 4: Instalar Certificado de Burp

**Por qué?** Burp necesita "certificado" para interceptar HTTPS

1. En Burp Suite, ve a **Proxy → Options**
2. Busca **"Import / Export CA Certificate"**
3. Click en **"Export"**
4. Guarda en Desktop como `burp.cer`

5. **En Windows:**
   - Click derecho en `burp.cer`
   - "Install Certificate"
   - "Current User"
   - "Place all certificates in the following store"
   - Browse → "Trusted Root Certification Authorities"
   - OK

---

## ✅ PASO 5: Verificar Configuración

1. **En Burp Suite:**
   - Ve a **Proxy → Intercept**
   - Verifica: **"Intercept is on"** (botón azul)

2. **En navegador:**
   - Abre http://localhost:3000 (PROYECTOCARRO)
   - Request debe aparecer en Burp

3. **Si ves algo en Burp = ¡Funciona! ✓**

---

## 🎮 PASO 6: Primeros Pasos en Burp

### Pestaña "Proxy"
- **Intercept:** Ve requests en tiempo real
- **HTTP history:** Historial de todas las requests

### Pestaña "Repeater"
- Copiar request
- Modificarla
- Reenviar
- Ver respuesta

### Pestaña "Intruder"
- Ataques automatizados
- Fuzzing
- Fuerza bruta

---

## 🚀 PRIMER TEST EN BURP

1. **Abre Burp + Navegador (configurado)**

2. **En navegador:**
   - Ve a http://localhost:3000/admin
   - Escribe un username: `admin`
   - Escribe password: `wrongpass`
   - Click "Login"

3. **En Burp (Proxy → Intercept):**
   - ¡Verás el request POST!
   - Puedes ver: username, password, cookies, headers

4. **Modifica y reenvía:**
   - En Burp, modifica `"password": "wrongpass"` 
   - Cámbialo a `"password": "test123"`
   - Click "Forward"
   - Ve la respuesta en navegador

**¿Ves? Ahora controlas TODO el tráfico 🎯**

---

## 📋 TROUBLESHOOTING

### "No veo requests en Burp"
- [ ] ¿Está "Intercept is on"?
- [ ] ¿FoxyProxy está activado?
- [ ] ¿Puerto 8080 es correcto?
- [ ] Reinicia navegador

### "Connection refused"
- [ ] ¿Burp Suite está corriendo?
- [ ] ¿Puerto no está ocupado?
  ```bash
  netstat -ano | findstr :8080
  ```

### "Certificate error"
- [ ] ¿Instalaste el certificado de Burp?
- [ ] ¿En "Trusted Root"?
- [ ] Limpia cache: Ctrl+Shift+Del

---

## 🎓 Conceptos Clave

| Término | Significado |
|---------|-----------|
| **Proxy** | Intermediario entre navegador y servidor |
| **Intercept** | Pausar requests para modificarlas |
| **Repeater** | Enviar request múltiples veces |
| **Intruder** | Automatizar ataques con payloads |
| **Burp Certificate** | Certificado para ver HTTPS |

---

## ⏭️ Siguientes Pasos

1. ✅ Instala Burp Suite
2. ✅ Configura navegador
3. ✅ Instala certificado
4. ✅ Haz primer test
5. 📋 Usa Repeater para modificar requests
6. 🎯 Intenta los 10 tests de `02_LAB_PRACTICO_TESTING.md`

---

## 🎉 Una vez configurado

Verás en Burp TODAS las requests de tu navegador. Puedes:
- ✅ Ver cookies, tokens, headers
- ✅ Modificar parámetros
- ✅ Repetir requests
- ✅ Automatizar ataques
- ✅ Ver respuestas del servidor

**Esto es lo que hacen los hackers profesionales 🔓**

---

**¿Ya tienes Burp instalado? Avísame cuando esté listo 👇**
