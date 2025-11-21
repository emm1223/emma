/*
Archivo de prueba para depuración en JavaScript/Node
Presiona F5 y selecciona "Node.js: Current File"
*/

function saludar(nombre) {
  const mensaje = `Hola, ${nombre}!`;
  return mensaje;
}

function sumar(a, b) {
  const resultado = a + b;
  return resultado;
}

function multiplicar(a, b) {
  const resultado = a * b;
  return resultado;
}

// Punto de prueba principal
console.log("=== Iniciando prueba de depuración ===\n");

const nombre = "Emma";
const saludo = saludar(nombre);
console.log(saludo);

const num1 = 15;
const num2 = 25;
const suma = sumar(num1, num2);
console.log(`Suma: ${num1} + ${num2} = ${suma}`);

const multiplicacion = multiplicar(num1, num2);
console.log(`Multiplicación: ${num1} * ${num2} = ${multiplicacion}`);

// Prueba con objetos
const persona = {
  nombre: "Emmanuel",
  edad: 25,
  ciudad: "Argentina",
};

console.log("\n=== Información de la persona ===");
console.log(`Nombre: ${persona.nombre}`);
console.log(`Edad: ${persona.edad}`);
console.log(`Ciudad: ${persona.ciudad}`);

console.log("\n=== Prueba completada ===");
