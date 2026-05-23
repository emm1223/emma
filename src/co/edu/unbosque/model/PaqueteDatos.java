package co.edu.unbosque.model;

/**
 * Representa un lote de información o carga útil (payload) dentro del servidor.
 * Esta clase simula un paquete de datos físicos que el jugador debe recolectar,
 * escoltar o transferir hacia un nodo de salida para completar con éxito los
 * objetivos
 * de la infiltración.
 * 
 * @author Farid Emmanuel Munayar Rincon
 * @version 1.0
 * @since 2026-05-22
 */
public class PaqueteDatos {

    /**
     * Ubicación actual del paquete de datos en el eje vertical (Y) del servidor.
     */
    private int fila;

    /**
     * Ubicación actual del paquete de datos en el eje horizontal (X) del servidor.
     */
    private int columna;

    /**
     * Estado logístico del paquete; determina si ya alcanzó con éxito su nodo de
     * destino
     * o si fue extraído del sistema de manera segura.
     */
    private boolean entregado;

    /**
     * Crea un nuevo paquete de datos en coordenadas específicas del mapa de red.
     * Al instanciarse, su estado inicial de entrega se establece de manera lógica
     * en falso.
     * 
     * @param fila    Coordenada vertical inicial del paquete dentro de la matriz.
     * @param columna Coordenada horizontal inicial del paquete dentro de la matriz.
     */
    public PaqueteDatos(int fila, int columna) {
        this.fila = fila;
        this.columna = columna;
        this.entregado = false;
    }

    /**
     * Actualiza simultáneamente la ubicación espacial del paquete en el escenario.
     * Este método facilita el transporte del paquete cuando es arrastrado o
     * interceptado
     * por otra entidad del juego.
     * 
     * @param nuevaFila    La nueva coordenada en el eje vertical.
     * @param nuevaColumna La nueva coordenada en el eje horizontal.
     */
    public void mover(int nuevaFila, int nuevaColumna) {
        this.fila = nuevaFila;
        this.columna = nuevaColumna;
    }

    /**
     * Obtiene la posición actual de la fila del paquete.
     * 
     * @return Índice entero de la fila.
     */
    public int getFila() {
        return fila;
    }

    /**
     * Asigna o fuerza un cambio manual en el índice de la fila del paquete.
     * 
     * @param fila Nueva coordenada vertical.
     */
    public void setFila(int fila) {
        this.fila = fila;
    }

    /**
     * Obtiene la posición actual de la columna del paquete.
     * 
     * @return Índice entero de la columna.
     */
    public int getColumna() {
        return columna;
    }

    /**
     * Asigna o fuerza un cambio manual en el índice de la columna del paquete.
     * 
     * @param columna Nueva coordenada horizontal.
     */
    public void setColumna(int columna) {
        this.columna = columna;
    }

    /**
     * Consulta si el flujo del paquete ha finalizado con éxito (entregado).
     * 
     * @return {@code true} si el paquete llegó a su destino, {@code false} si sigue
     *         en tránsito o perdido.
     */
    public boolean estáEntregado() {
        return entregado;
    }

    /**
     * Modifica el estado de entrega del paquete de datos al interactuar con el
     * punto de descarga.
     * 
     * @param entregado {@code true} para confirmar la recepción segura,
     *                  {@code false} para revertirla.
     */
    public void setEntregado(boolean entregado) {
        this.entregado = entregado;
    }
}