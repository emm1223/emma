package co.edu.unbosque.view;

import java.awt.Color;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.border.TitledBorder;

public class PanelDificultad extends JPanel {

	private static final long serialVersionUID = 1L;
	private JLabel etiquetaEncabezado;
	private JButton botonPromediar;
	private JTextArea areaDificultades;

	public PanelDificultad() {
		setLayout(null);
		setBackground(Color.PINK);
		setBorder(new TitledBorder("Dificultades academicas"));
		inicializarComponentes();
	}

	public void inicializarComponentes() {
		etiquetaEncabezado = new JLabel("Puntos a Mejorar");
		etiquetaEncabezado.setBounds(130, 15, 200, 30);
		add(etiquetaEncabezado);
		
		areaDificultades = new JTextArea("Reforzar logica de programacion para hacking\n" 
				+ "Mejorar el analisis matematico");
		areaDificultades.setBounds(50, 80, 290, 80);
		areaDificultades.setEditable(false); 
		add(areaDificultades);

		botonPromediar = new JButton("Promediar");
		botonPromediar.setBounds(10, 20, 110, 25);
		botonPromediar.setBackground(Color.GRAY);
		botonPromediar.setActionCommand("PROMEDIAR");
		add(botonPromediar);
	}

	public JButton getBtnCalificaciones() {
		return botonPromediar;
	}
}