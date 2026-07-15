package co.edu.unbosque.view;

import java.awt.Color;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.border.TitledBorder;

public class PanelAsignaturas extends JPanel {

	private static final long serialVersionUID = 1L;
	private JLabel etiquetaEncabezado;
	private JTextArea areaListaMaterias;
	private JButton botonNumeros;

	public PanelAsignaturas() {
		setLayout(null);
		setBackground(Color.ORANGE);
		setBorder(new TitledBorder("Asignaturas en curso"));
		inicializarComponentes();
	}

	public void inicializarComponentes() {
		etiquetaEncabezado = new JLabel("Materias del Semestre");
		etiquetaEncabezado.setBounds(120, 15, 200, 30);
		add(etiquetaEncabezado);
		
		areaListaMaterias = new JTextArea("Desarrollo de sistemas de informacion 1\n" 
				+ "Fundamentos de Ingenieria\n"
				+ "Ciencias para la vida\n" 
				+ "Matematicas 1\n"
				+ "Principios de sistemas de informacion\n"
				+ "Estructuracion del pensamiento");
		areaListaMaterias.setBounds(40, 70, 300, 150);
		areaListaMaterias.setEditable(false); 
		add(areaListaMaterias);
		
		botonNumeros = new JButton("Numeros");
		botonNumeros.setBounds(10, 20, 100, 25);
		botonNumeros.setBackground(Color.GRAY);
		botonNumeros.setActionCommand("NUMEROS");
		add(botonNumeros);
	}

	public JButton getBtnnumero() {
		return botonNumeros;
	}
}