package co.edu.unbosque.view;

import javax.swing.JOptionPane;

/**
 * Gestor de alertas y ventanas emergentes del sistema.
 * Se encarga de centralizar todas las notificaciones, advertencias y pantallas 
 * finales de éxito o fallo mediante cuadros de diálogo rápidos (JOptionPane).
 * 
 * @author Farid Emmanuel Munayar Rincon
 */
public class VentanaMensajes {

    /**
     * Muestra un cuadro de diálogo informativo estándar para notificar 
     * eventos comunes del sistema, como el inicio exitoso de la sesión.
     * 
     * @param mensaje El texto explicativo que se le mostrará al usuario.
     */
    public void mostrarInformacion(String mensaje) {
        JOptionPane.showMessageDialog(null, mensaje, "Cyber-Infiltrator - Notificación", JOptionPane.INFORMATION_MESSAGE);
    }

    /**
     * Despliega una alerta emergente de error con un ícono crítico cuando el usuario 
     * ingresa dimensiones inválidas o realiza una acción prohibida por las reglas de red.
     * 
     * @param mensaje El detalle del error que detuvo la operación.
     */
    public void mostrarError(String mensaje) {
        JOptionPane.showMessageDialog(null, mensaje, "ALERTA DE SEGURIDAD - ERROR", JOptionPane.ERROR_MESSAGE);
    }

    /**
     * Muestra la pantalla de felicitaciones cuando el hacker logra comprometer 
     * los 3 puertos del servidor de manera exitosa antes de agotar sus recursos.
     * 
     * @param nombreJugador El alias del atacante (por defecto configurado como Farid).
     * @param movimientos   El saldo final de pasos que le quedaron en la reserva.
     */
    public void mostrarVictoria(String nombreJugador, int movimientos) {
        String msg = "¡ACCESO CONCEDIDO!\n\nFelicidades " + nombreJugador + ".\n" +
                     "Has infiltrado el servidor con " + movimientos + " movimientos de sobra.\n" +
                     "Estado: Hacker de Élite bro.";
        JOptionPane.showMessageDialog(null, msg, "SISTEMA COMPROMETIDO", JOptionPane.INFORMATION_MESSAGE);
    }

    /**
     * Despliega la pantalla de fallo si los procesos de antivirus te atrapan 
     * o si los movimientos del script llegan a cero absoluto.
     */
    public void mostrarDerrota() {
        String msg = "¡CONEXIÓN PERDIDA!\n\nHas sido detectado por el Antivirus o te has quedado sin recursos.\n" +
                     "Tu rastro ha sido eliminado del servidor.";
        JOptionPane.showMessageDialog(null, msg, "ERROR CRÍTICO", JOptionPane.WARNING_MESSAGE);
    }
}