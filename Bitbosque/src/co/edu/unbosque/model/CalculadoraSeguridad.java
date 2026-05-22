package co.edu.unbosque.model;

/**
 * Clase utilitaria encargada de realizar los cálculos aritméticos y lógicos
 * relacionados con las métricas de seguridad, bonificaciones y penalizaciones del sistema.
 * <p>
 * Centraliza las fórmulas que alteran el flujo de recursos (como los movimientos restantes)
 * del jugador durante su proceso de infiltración en el servidor.
 * </p>
 * 
 * @author Farid Emmanuel Munayar Rincon
 * @version 1.0
 * @since 2026-05-22
 */
public class CalculadoraSeguridad {

    /**
     * Calcula el bono de movimientos adicionales otorgado al capturar o hackear exitosamente un nodo.
     * La bonificación corresponde de forma lineal al 10% de los movimientos actuales del jugador,
     * redondeado matemáticamente al entero más cercano.
     * 
     * @param movimientosActuales La cantidad de movimientos disponibles que posee el jugador en el momento.
     * @return El número entero de movimientos que se sumarán como bonificación.
     */
    public int calcularBonoNodo(int movimientosActuales) {
        double bono = movimientosActuales * 0.10;
        return (int) Math.round(bono);
    }

    /**
     * Determina la penalización de movimientos ocasionada al impactar o intentar atravesar un Firewall.
     * La penalización es dinámica y se calcula sumando los índices de la posición espacial (fila y columna) 
     * donde se encuentra el cortafuegos.
     * 
     * @param fila    El índice de la fila actual de la anomalía en la matriz.
     * @param columna El índice de la columna actual de la anomalía en la matriz.
     * @return La cantidad de puntos de movimiento que se le restarán al jugador.
     */
    public int calcularPenalizacionFirewall(int fila, int columna) {
        return fila + columna;
    }

    /**
     * Calcula la penalización de movimientos sufrida cuando el jugador es detectado por un Escáner de red.
     * La deducción equivale al 5% de la reserva de movimientos actuales del jugador,
     * redondeado matemáticamente al entero más cercano.
     * 
     * @param movimientosActuales La cantidad de movimientos disponibles antes de aplicar el castigo.
     * @return El número entero de movimientos que se perderán por la detección.
     */
    public int calcularPenalizacionEscaner(int movimientosActuales) {
        double penalizacion = movimientosActuales * 0.05;
        return (int) Math.round(penalizacion);
    }

    /**
     * Devuelve el costo base fijo en movimientos requerido para ejecutar un protocolo del sistema
     * (por ejemplo, el uso de habilidades especiales como el modo sigilo).
     * 
     * @return El valor entero constante del costo del protocolo (fijado en 5 movimientos).
     */
    public int calcularCostoProtocolo() {
        return 5;
    }
}