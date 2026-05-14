package co.edu.unbosque.controller;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JOptionPane;

import co.edu.unbosque.model.Servidor;
import co.edu.unbosque.view.VentanaPrincipal;


public class Controller implements ActionListener {

	private VentanaPrincipal marcoGrafico;
	private Servidor motorLogico;

	
	public Controller() {
		
		marcoGrafico = new VentanaPrincipal();
		
		
		motorLogico = new Servidor(10, 10); 
		
		
		enlazarEventos();
		
		
		marcoGrafico.setVisible(true);
	}

	public void enlazarEventos() {
		
		marcoGrafico.getPanelConfiguracion().getBtnIniciar().addActionListener(this);
		
	
		marcoGrafico.getPanelTablero().getBtnMoverArriba().addActionListener(this);
		marcoGrafico.getPanelTablero().getBtnMoverAbajo().addActionListener(this);
		marcoGrafico.getPanelTablero().getBtnMoverIzquierda().addActionListener(this);
		marcoGrafico.getPanelTablero().getBtnMoverDerecha().addActionListener(this);
		
	
		marcoGrafico.getPanelEstadisticas().getBtnSigilo().addActionListener(this);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		String idComando = e.getActionCommand();

		
		if (idComando.equals("INICIAR_JUEGO")) {
			try {
				int filas = marcoGrafico.getPanelConfiguracion().leerFilas();
				int columnas = marcoGrafico.getPanelConfiguracion().leerColumnas();
				String dificultad = marcoGrafico.getPanelConfiguracion().leerDificultad();

				if (filas >= 5 && filas <= 20 && columnas >= 5 && columnas <= 20) {
					
					motorLogico = new Servidor(filas, columnas);
					motorLogico.generarEscenario(dificultad);
					
					
					marcoGrafico.getPanelTablero().crearTablero(filas, columnas);
					marcoGrafico.getPanelTablero().actualizarTablero(motorLogico.getMatriz());
					
				
					marcoGrafico.getPanelEstadisticas().actualizarDatos(
						motorLogico.getMovimientosRestantes(), 
						motorLogico.getPuertosVisitados()
					);
					
					marcoGrafico.mostrarPanelJuego();
					marcoGrafico.getVentanaMensajes().mostrarInformacion("Infiltración iniciada. ¡Buena suerte, Farid!");
				} else {
					marcoGrafico.getVentanaMensajes().mostrarError("Dimensiones inválidas (mínimo 5, máximo 20).");
				}
			} catch (NumberFormatException error) {
				marcoGrafico.getVentanaMensajes().mostrarError("Por favor, ingrese solo números en las dimensiones.");
			}
		}

		
		else if (idComando.equals("ACTIVAR_SIGILO")) {
			if (motorLogico.isSigiloDisponible()) {
				motorLogico.activarModoSigilo();
				marcoGrafico.getPanelEstadisticas().actualizarEstadoSigilo(true);
				marcoGrafico.getVentanaMensajes().mostrarInformacion("MODO SIGILO ACTIVO: Los antivirus no te detectarán en el próximo paso.");
			} else {
				marcoGrafico.getVentanaMensajes().mostrarError("El modo sigilo ya no está disponible.");
			}
		}

	
		else if (idComando.equals("ARRIBA")) {
			procesarMovimiento("ARRIBA");
		} 
		else if (idComando.equals("ABAJO")) {
			procesarMovimiento("ABAJO");
		} 
		else if (idComando.equals("IZQUIERDA")) {
			procesarMovimiento("IZQUIERDA");
		} 
		else if (idComando.equals("DERECHA")) {
			procesarMovimiento("DERECHA");
		}
	}

	
	private void procesarMovimiento(String direccion) {
		boolean pudoMoverse = motorLogico.intentarMovimiento(direccion);
		
		if (pudoMoverse) {
			marcoGrafico.getPanelTablero().actualizarTablero(motorLogico.getMatriz());
			
			marcoGrafico.getPanelEstadisticas().actualizarDatos(
				motorLogico.getMovimientosRestantes(),
				motorLogico.getPuertosVisitados()
			);

			if (motorLogico.verificarVictoria()) {
				motorLogico.guardarLogFinal();
				marcoGrafico.getVentanaMensajes().mostrarVictoria("Farid", motorLogico.getMovimientosRestantes());
				System.exit(0);
			} else if (motorLogico.verificarDerrota()) {
				motorLogico.guardarLogFinal();
				marcoGrafico.getVentanaMensajes().mostrarDerrota();
				System.exit(0);
			}
		} else {
			marcoGrafico.getVentanaMensajes().mostrarError("Movimiento bloqueado por Firewall o límites del servidor.");
		}
	}
}