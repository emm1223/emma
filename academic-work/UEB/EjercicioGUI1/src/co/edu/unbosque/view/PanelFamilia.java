package co.edu.unbosque.view;

import java.awt.Color;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.border.TitledBorder;

public class PanelFamilia extends JPanel {

	private JLabel etiquetaApellido;
	private JTextArea areaIntegrantes;
	private JButton botonSiglas;

	public PanelFamilia() {
		setLayout(null);
		setBackground(Color.YELLOW);
		setBorder(new TitledBorder("Mi Dinastia"));
		
		inicializarComponentes();
	}

	public void inicializarComponentes() {
		etiquetaApellido = new JLabel("Familia Munayar");
		etiquetaApellido.setBounds(150, 10, 370, 30);
		add(etiquetaApellido);

		areaIntegrantes = new JTextArea(
				"Abuelo: Farid Tellez Munayar" + "\n" +
				"Papa: Farid Abdala Munayar Pulecio" + "\n" +
				"Tio: Edgar Munayar Pulecio" + "\n" +
				"Mi persona: Farid Emmanuel Munayar Rincon" + "\n" +
				"Origen: Emiratos Arabes");
		
		areaIntegrantes.setBounds(20, 80, 330, 120);
		areaIntegrantes.setEditable(false);
		add(areaIntegrantes);

		botonSiglas = new JButton("Iniciales");
		botonSiglas.setBounds(10, 20, 100, 20);
		botonSiglas.setBackground(Color.GRAY);
		botonSiglas.setActionCommand("INICIALES");
		add(botonSiglas);
	}

	public JButton getBtnIniciales() {
		return botonSiglas;
	}

	public JTextArea getAreaIntegrantes() {
		return areaIntegrantes;
	}

	public JLabel getEtiquetaApellido() {
		return etiquetaApellido;
	}
}