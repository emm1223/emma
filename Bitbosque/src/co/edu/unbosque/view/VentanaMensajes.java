package co.edu.unbosque.view;

import javax.swing.JOptionPane;


public class VentanaMensajes {

	
	public void mostrarInformacion(String mensaje) {
		JOptionPane.showMessageDialog(null, mensaje, "Cyber-Infiltrator - Notificación", JOptionPane.INFORMATION_MESSAGE);
	}

	
	public void mostrarError(String mensaje) {
		JOptionPane.showMessageDialog(null, mensaje, "ALERTA DE SEGURIDAD - ERROR", JOptionPane.ERROR_MESSAGE);
	}

	
	public void mostrarVictoria(String nombreJugador, int movimientos) {
		String msg = "¡ACCESO CONCEDIDO!\n\nFelicidades " + nombreJugador + ".\n" +
		             "Has infiltrado el servidor con " + movimientos + " movimientos de sobra.\n" +
		             "Estado: Hacker de Élite bro.";
		JOptionPane.showMessageDialog(null, msg, "SISTEMA COMPROMETIDO", JOptionPane.INFORMATION_MESSAGE);
	}

	
	public void mostrarDerrota() {
		String msg = "¡CONEXIÓN PERDIDA!\n\nHas sido detectado por el Antivirus o te has quedado sin recursos.\n" +
		             "Tu rastro ha sido eliminado del servidor.";
		JOptionPane.showMessageDialog(null, msg, "ERROR CRÍTICO", JOptionPane.WARNING_MESSAGE);
	}
}