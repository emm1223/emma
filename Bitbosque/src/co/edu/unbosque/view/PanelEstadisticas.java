package co.edu.unbosque.view;

import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.Component;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;
import javax.swing.border.TitledBorder;
import javax.swing.border.EmptyBorder;
import javax.swing.border.CompoundBorder;

public class PanelEstadisticas extends JPanel {

	private JLabel lblMovimientos;
	private JLabel lblPuertos;
	private JLabel lblSigilo;
	private JButton btnSigilo;

	
	public PanelEstadisticas() {
		setLayout(new GridLayout(4, 1, 10, 10));
		setBackground(new Color(30, 30, 30));
		
		TitledBorder bordeTitulo = new TitledBorder("ESTADO DEL SISTEMA");
		bordeTitulo.setTitleColor(Color.CYAN);
		
		EmptyBorder margenInterno = new EmptyBorder(80, 10, 80, 10); 
		
		setBorder(new CompoundBorder(bordeTitulo, margenInterno));

		inicializarComponentes();
	}

	
	private void inicializarComponentes() {
		Font fuenteConsola = new Font("Monospaced", Font.BOLD, 14);

	
		lblMovimientos = new JLabel("MOVIMIENTOS: 0", SwingConstants.CENTER);
		lblMovimientos.setForeground(Color.WHITE);
		lblMovimientos.setFont(fuenteConsola);
		add(lblMovimientos);

		lblPuertos = new JLabel("PUERTOS: 0 / 3", SwingConstants.CENTER);
		lblPuertos.setForeground(Color.WHITE);
		lblPuertos.setFont(fuenteConsola);
		add(lblPuertos);

		lblSigilo = new JLabel("SIGILO: DISPONIBLE", SwingConstants.CENTER);
		lblSigilo.setForeground(Color.CYAN);
		lblSigilo.setFont(fuenteConsola);
		add(lblSigilo);

		btnSigilo = new JButton("ACTIVAR SIGILO");
		btnSigilo.setActionCommand("ACTIVAR_SIGILO");
		btnSigilo.setBackground(Color.DARK_GRAY);
		btnSigilo.setForeground(Color.WHITE);
		btnSigilo.setFocusable(false); 
		add(btnSigilo);
	}

	
	 
	public void actualizarDatos(int mov, int puertos) {
		lblMovimientos.setText("MOVIMIENTOS: " + mov);
		lblPuertos.setText("PUERTOS: " + puertos + " / 3");
		
		
		if (mov <= 10) {
			lblMovimientos.setForeground(Color.RED);
		} else {
			lblMovimientos.setForeground(Color.WHITE);
		}
	}

	
	
	public void actualizarEstadoSigilo(boolean activo) {
		if (activo) {
			lblSigilo.setText("SIGILO: ACTIVO");
			lblSigilo.setForeground(Color.ORANGE);
			btnSigilo.setEnabled(false); 
		} else {
			lblSigilo.setText("SIGILO: AGOTADO");
			lblSigilo.setForeground(Color.GRAY);
		}
	}

	public JButton getBtnSigilo() {
		return btnSigilo;
	}
}