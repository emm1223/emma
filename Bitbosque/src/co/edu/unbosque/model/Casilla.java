package co.edu.unbosque.model;

/**
 * Representa un nodo o celda individual dentro de la matriz de direccionamiento del servidor.
 * Cada casilla almacena su estado físico y lógico, permitiendo identificar la naturaleza 
 * del terreno digital (obstáculos, firewalls, vacíos) y si el jugador ha dejado una huella 
 * en esa posición.
 * 
 * @author Farid Emmanuel Munayar Rincon
 * @version 1.0
 * @since 2026-05-22
 */
public class Casilla {

    /**
     * El tipo o contenido específico de la casilla.
     * Ejemplos de uso común: "VACIO", "FIREWALL", "PUERTO", "SALIDA", "JUGADOR".
     */
    private String tipo;

    /**
     * Indicador lógico que determina si el jugador ha transitado previamente por esta celda,
     * dejando un rastro digital detectable por las amenazas del sistema.
     */
    private boolean tieneRastro; 
    
    /**
     * Constructor por defecto. Inicializa la casilla en un estado neutro, 
     * asignando el tipo como "VACIO" y estableciendo que no posee rastro alguno.
     */
    public Casilla() {
        this.tipo = "VACIO";
        this.tieneRastro = false;
    }

    /**
     * Constructor sobrecargado que permite definir explícitamente la naturaleza inicial 
     * de la celda al momento de construir el escenario de red.
     * 
     * @param tipo Cadena de texto que clasifica el contenido original de la casilla.
     */
    public Casilla(String tipo) {
        this.tipo = tipo;
        this.tieneRastro = false;
    }

    /**
     * Obtiene el tipo actual asignado a la casilla.
     * 
     * @return Cadena de texto descriptiva del tipo de celda.
     */
    public String getTipo() {
        return tipo;
    }

    /**
     * Modifica dinámicamente el tipo o elemento presente en la casilla.
     * Útil para simular movimientos o la destrucción/desactivación de barreras informáticas.
     * 
     * @param tipo El nuevo tipo que adoptará la celda.
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    /**
     * Consulta si el jugador ha dejado una huella o rastro en esta posición del servidor.
     * 
     * @return {@code true} si la casilla ya fue visitada, {@code false} en caso contrario.
     */
    public boolean isTieneRastro() {
        return tieneRastro;
    }

    /**
     * Altera el estado del rastro digital en la casilla, marcándola como visitada 
     * o limpiando las huellas del sistema si se usa una habilidad de borrado.
     * 
     * @param tieneRastro {@code true} para activar el rastro, {@code false} para limpiarlo.
     */
    public void setTieneRastro(boolean tieneRastro) {
        this.tieneRastro = tieneRastro;
    }
}