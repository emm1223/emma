package co.edu.unbosque.view;

import java.awt.BorderLayout;
import java.awt.CardLayout;
import javax.swing.JFrame;
import javax.swing.JPanel;



public class VentanaPrincipal extends JFrame {

	private PanelConfiguracion panelConfig;
	private PanelTablero panelTablero;
	private PanelEstadisticas panelStats;
	private VentanaMensajes ventanaMensajes;
	private JPanel contenedorPrincipal;
	private CardLayout cartas;

	
	public VentanaPrincipal() {
		setTitle("Cyber-Infiltrator - Sistema de Seguridad Bitbosque");
		setSize(900, 700);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setLocationRelativeTo(null);
		setResizable(false);

		inicializarComponentes();
	}

	
	private void inicializarComponentes() {
		cartas = new CardLayout();
		contenedorPrincipal = new JPanel(cartas);

		panelConfig = new PanelConfiguracion();
		panelTablero = new PanelTablero();
		panelStats = new PanelEstadisticas();
		ventanaMensajes = new VentanaMensajes();

		JPanel contenedorJuego = new JPanel(new BorderLayout());
		contenedorJuego.add(panelTablero, BorderLayout.CENTER);
		contenedorJuego.add(panelStats, BorderLayout.EAST);

		contenedorPrincipal.add(panelConfig, "CONFIG");
		contenedorPrincipal.add(contenedorJuego, "JUEGO");

		add(contenedorPrincipal);
	}


	public void mostrarPanelJuego() {
		cartas.show(contenedorPrincipal, "JUEGO");
	}

	
	public void mostrarPanelConfiguracion() {
		cartas.show(contenedorPrincipal, "CONFIG");
	}

	

	public PanelConfiguracion getPanelConfiguracion() {
		return panelConfig;
	}

	public PanelTablero getPanelTablero() {
		return panelTablero;
	}

	public PanelEstadisticas getPanelEstadisticas() {
		return panelStats;
	}

	public VentanaMensajes getVentanaMensajes() {
		return ventanaMensajes;
	}
}