package co.edu.unbosque.model;

/**
 * Representa el agente o script de ataque controlado por el usuario dentro del servidor.
 * Esta clase administra las propiedades vitales de la infiltración, tales como la
 * localización en la red (coordenadas), los recursos disponibles (movimientos restantes) 
 * y los estados lógicos de sus herramientas de evasión (modo sigilo).
 * * @author Farid Emmanuel Munayar Rincon
 * @version 1.1
 * @since 2026-05-22
 */
public class ScriptInfiltracion {

    /**
     * Posición actual del script de infiltración en el eje vertical (Y) del servidor.
     */
    private int fila;

    /**
     * Posición actual del script de infiltración en el eje horizontal (X) del servidor.
     */
    private int columna;

    /**
     * Reserva o cantidad de acciones disponibles que le quedan al script antes de ser 
     * completamente desconectado o bloqueado por el sistema de seguridad.
     */
    private int movimientosRestantes;

    /**
     * Estado lógico que determina si la herramienta de camuflaje está activa en el paso actual,
     * permitiendo evadir los sistemas antivirus de la matriz.
     */
    private boolean modoSigiloActivo;

    /**
     * Bandera de control para limitar el uso de la habilidad especial.
     * Garantiza que la herramienta de sigilo solo sea explotada o ejecutada una vez por sesión.
     */
    private boolean sigiloUsado;

    /**
     * Construye e inicializa un nuevo script de infiltración con coordenadas iniciales 
     * y una cantidad determinada de recursos lógicos de movimiento.
     * * @param fila        Coordenada de origen vertical dentro del escenario.
     * @param columna     Coordenada de origen horizontal dentro del escenario.
     * @param movimientos Cantidad inicial de movimientos otorgados para la misión.
     */
    public ScriptInfiltracion(int fila, int columna, int movimientos) {
        this.fila = fila;
        this.columna = columna;
        this.movimientosRestantes = movimientos;
        this.modoSigiloActivo = false;
        this.sigiloUsado = false;
    }

    /**
     * Actualiza la posición del script dentro de las coordenadas espaciales del mapa de red.
     * * @param nuevaFila    Nueva posición en el eje vertical.
     * @param nuevaColumna Nueva posición en el eje horizontal.
     */
    public void mover(int nuevaFila, int nuevaColumna) {
        this.fila = nuevaFila;
        this.columna = nuevaColumna;
    }

    /**
     * Disminuye de forma controlada la reserva de movimientos restantes del script.
     * Incorpora una regla de negocio defensiva: si el decremento genera un valor negativo,
     * el sistema nivela el atributo automáticamente a cero para evitar inconsistencias lógicas.
     * * @param cantidad Número entero de movimientos que se van a descontar del script.
     */
    public void descontarMovimientos(int cantidad) {
        this.movimientosRestantes -= cantidad;
        if (this.movimientosRestantes < 0) {
            this.movimientosRestantes = 0;
        }
    }

    /**
     * Incrementa la reserva de movimientos disponibles del script tras obtener un bono, 
     * vulnerar un nodo o recolectar información en la red.
     * * @param cantidad Número entero de movimientos que se sumarán al acumulado actual.
     */
    public void aumentarMovimientos(int cantidad) {
        this.movimientosRestantes += cantidad;
    }

    /**
     * Obtiene el índice de la fila actual del script.
     * * @return Índice de posición vertical.
     */
    public int getFila() {
        return fila;
    }

    /**
     * Modifica de manera directa la posición vertical de la celda del script.
     * * @param fila Nueva coordenada vertical.
     */
    public void setFila(int fila) {
        this.fila = fila;
    }

    /**
     * Obtiene el índice de la columna actual del script.
     * * @return Índice de posición horizontal.
     */
    public int getColumna() {
        return columna;
    }

    /**
     * Modifica de manera directa la posición horizontal de la celda del script.
     * * @param columna Nueva coordenada horizontal.
     */
    public void setColumna(int columna) {
        this.columna = columna;
    }

    /**
     * Obtiene el conteo actual de los movimientos disponibles.
     * * @return Número entero de movimientos restantes.
     */
    public int getMovimientosRestantes() {
        return movimientosRestantes;
    }

    /**
     * Asigna un valor específico al contador de movimientos del script.
     * * @param movimientosRestantes Nueva cantidad de movimientos asignados.
     */
    public void setMovimientosRestantes(int movimientosRestantes) {
        this.movimientosRestantes = movimientosRestantes;
    }

    /**
     * Consulta si el script se encuentra bajo el estado de camuflaje de red.
     * * @return {@code true} si el modo sigilo está activo, {@code false} de lo contrario.
     */
    public boolean isModoSigiloActivo() {
        return modoSigiloActivo;
    }

    /**
     * Altera el estado de visibilidad del script frente a los firewalls o antivirus del sistema.
     * * @param modoSigiloActivo {@code true} para activar el camuflaje, {@code false} para desactivarlo.
     */
    public void setModoSigiloActivo(boolean modoSigiloActivo) {
        this.modoSigiloActivo = modoSigiloActivo;
    }

    /**
     * Valida si el recurso de sigilo ya fue quemado o ejecutado previamente en el flujo del juego.
     * * @return {@code true} si la habilidad ya fue consumida, {@code false} si sigue disponible.
     */
    public boolean isSigiloUsado() {
        return sigiloUsado;
    }

    /**
     * Marca el estado de consumo de la herramienta de sigilo del agente.
     * * @param sigiloUsado {@code true} para indicar uso consumado, {@code false} para restablecerlo.
     */
    public void setSigiloUsado(boolean sigiloUsado) {
        this.sigiloUsado = sigiloUsado;
    }
}