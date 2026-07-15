package co.edu.unbosque.view;

import javax.swing.JFrame;
import javax.swing.JOptionPane;
import java.awt.GridLayout;

public class VentanaPrincipal extends JFrame {

	private PanelAcademico panelAcademico;
	private PanelAsignaturas panelAsignaturas;
	private PanelDificultad panelDificultad;
	private PanelFamilia panelFamilia;

	public VentanaPrincipal() {
		setTitle("Sistema de Farid Munayar");
		setSize(800, 600);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		getContentPane().setLayout(new GridLayout(2, 2));

		inicializarComponentes();

		setResizable(false);
		setLocationRelativeTo(null);
		setVisible(true);
	}

	private void inicializarComponentes() {
		panelAcademico = new PanelAcademico();
		getContentPane().add(panelAcademico);

		panelAsignaturas = new PanelAsignaturas();
		getContentPane().add(panelAsignaturas);

		panelDificultad = new PanelDificultad();
		getContentPane().add(panelDificultad);

		panelFamilia = new PanelFamilia();
		getContentPane().add(panelFamilia);
	}

	public int leerDatoEntero(String mensaje) {
		String aux = JOptionPane.showInputDialog(this, mensaje);
		return Integer.parseInt(aux);
	}

	public double leerDatoDecimal(String mensaje) {
		String aux = JOptionPane.showInputDialog(this, mensaje);
		return Double.parseDouble(aux);
	}

	public PanelAcademico getPanelAcademico() { return panelAcademico; }
	public PanelAsignaturas getPanelAsignaturas() { return panelAsignaturas; }
	public PanelDificultad getPanelDificultad() { return panelDificultad; }
	public PanelFamilia getPanelFamilia() { return panelFamilia; }
}