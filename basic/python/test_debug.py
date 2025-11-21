"""
Archivo de prueba para depuración en Python
Presiona F5 y selecciona "Python: Current File"
"""

def saludar(nombre):
    mensaje = f"Hola, {nombre}!"
    return mensaje

def sumar(a, b):
    resultado = a + b
    return resultado

# Aquí es donde puedes poner un breakpoint (click izquierda del número)
if __name__ == "__main__":
    nombre = "Tatis"
    saludo = saludar(nombre)
    print(saludo)
    
    x = 10
    y = 20
    total = sumar(x, y)
    print(f"Suma: {x} + {y} = {total}")
    
    # Prueba: cambia los valores y vuelve a ejecutar
    numeros = [1, 2, 3, 4, 5]
    for numero in numeros:
        print(f"Número: {numero}")
