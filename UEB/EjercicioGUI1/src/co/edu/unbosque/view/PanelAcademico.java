package co.edu.unbosque.view;

import java.awt.Color;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.border.TitledBorder;

public class PanelAcademico extends JPanel {

	private static final long serialVersionUID = 1L; 
	private JLabel etiquetaEstudios;
	private JButton btnSaludar;
	private JTextArea areaTextoHistorial;

	public PanelAcademico() {
		setLayout(null);
		setBackground(Color.MAGENTA); 
		setBorder(new TitledBorder("Historial Academico"));
		
		inicializarComponentes();
	}

	public void inicializarComponentes() {
		etiquetaEstudios = new JLabel("Mis Estudios - Farid");
		etiquetaEstudios.setBounds(130, 10, 370, 30);
		add(etiquetaEstudios);
		
		areaTextoHistorial = new JTextArea("Estudiante de Ingenieria de Sistemas\n" +
				"Universidad El Bosque - Primer Semestre\n" +
				"Interes en Ciberseguridad y Hacking\n" +
				"Meta: Ser de los hackers mas grandes del pais");
		
		areaTextoHistorial.setBounds(40, 80, 280, 120);
		areaTextoHistorial.setEditable(false); 
		add(areaTextoHistorial);
		
		btnSaludar = new JButton("Saludar");
		btnSaludar.setBounds(10, 20, 100, 30); 
		btnSaludar.setBackground(Color.GRAY);
		btnSaludar.setActionCommand("SALUDAR");
		add(btnSaludar);
	}

	public JButton getBtnSaludar() { 
		return btnSaludar;
	}
}