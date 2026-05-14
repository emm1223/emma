package co.edu.unbosque.view;

import java.awt.Color;
import java.awt.Font;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;


public class PanelConfiguracion extends JPanel {

	private JLabel lblTitulo;
	private JLabel lblFilas;
	private JLabel lblColumnas;
	private JLabel lblDificultad;
	private JTextField txtFilas;
	private JTextField txtColumnas;
	private JComboBox<String> cbDificultad;
	private JButton btnIniciar;

	
	public PanelConfiguracion() {
		setLayout(null);
		setBackground(new Color(20, 20, 20)); 
		inicializarComponentes();
	}

	
	private void inicializarComponentes() {
		lblTitulo = new JLabel("CONFIGURACIÓN DE INFILTRACIÓN");
		lblTitulo.setFont(new Font("Monospaced", Font.BOLD, 18));
		lblTitulo.setForeground(Color.GREEN);
		lblTitulo.setBounds(50, 30, 400, 30);
		add(lblTitulo);

		lblFilas = new JLabel("Filas (5-20):");
		lblFilas.setForeground(Color.WHITE);
		lblFilas.setBounds(50, 100, 150, 25);
		add(lblFilas);

		txtFilas = new JTextField();
		txtFilas.setBounds(200, 100, 100, 25);
		add(txtFilas);

		lblColumnas = new JLabel("Columnas (5-20):");
		lblColumnas.setForeground(Color.WHITE);
		lblColumnas.setBounds(50, 150, 150, 25);
		add(lblColumnas);

		txtColumnas = new JTextField();
		txtColumnas.setBounds(200, 150, 100, 25);
		add(txtColumnas);

		lblDificultad = new JLabel("Nivel Seguridad:");
		lblDificultad.setForeground(Color.WHITE);
		lblDificultad.setBounds(50, 200, 150, 25);
		add(lblDificultad);

		String[] opciones = { "Baja", "Media", "Alta" };
		cbDificultad = new JComboBox<>(opciones);
		cbDificultad.setBounds(200, 200, 100, 25);
		add(cbDificultad);

		btnIniciar = new JButton("INICIAR SISTEMA");
		btnIniciar.setActionCommand("INICIAR_JUEGO");
		btnIniciar.setBounds(100, 300, 200, 40);
		btnIniciar.setBackground(Color.DARK_GRAY);
		btnIniciar.setForeground(Color.GREEN);
		add(btnIniciar);
	}

	
	public int leerFilas() throws NumberFormatException {
		return Integer.parseInt(txtFilas.getText());
	}

	
	public int leerColumnas() throws NumberFormatException {
		return Integer.parseInt(txtColumnas.getText());
	}

	
	public String leerDificultad() {
		return cbDificultad.getSelectedItem().toString();
	}

	public JButton getBtnIniciar() {
		return btnIniciar;
	}
}