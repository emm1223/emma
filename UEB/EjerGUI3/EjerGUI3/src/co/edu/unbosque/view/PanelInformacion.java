package co.edu.unbosque.view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.border.TitledBorder;

public class PanelInformacion extends JPanel {
	
	private JLabel lblL1;
	private JLabel lblL2;
	private JLabel lblL3;
	private JTextArea txtArea;
	
	
	public PanelInformacion() {
		setLayout(new GridLayout(4,1,5,5));
		setBackground(Color.YELLOW);
		setPreferredSize(new Dimension(200, 475));
		setBorder( new TitledBorder( "Modulo de Informacion:" ) ) ;
		
		inicializarComponentes();
		
		setVisible(true);
	}

	public void inicializarComponentes() {
				
		lblL1 = new JLabel("Sitio: ");
		add(lblL1);
		
		lblL2 = new JLabel("Elemento: ");
		add(lblL2);
		
		lblL3 = new JLabel("Visitas: ");
		add(lblL3);
		
		txtArea = new JTextArea();
		txtArea.setOpaque(false);
		txtArea.setLineWrap(true);
		add(txtArea);
		
	}

	public JLabel getLblL1() {
		return lblL1;
	}

	public void setLblL1(JLabel lblL1) {
		this.lblL1 = lblL1;
	}

	public JLabel getLblL2() {
		return lblL2;
	}

	public void setLblL2(JLabel lblL2) {
		this.lblL2 = lblL2;
	}

	public JLabel getLblL3() {
		return lblL3;
	}

	public void setLblL3(JLabel lblL3) {
		this.lblL3 = lblL3;
	}

	public JTextArea getTxtArea() {
		return txtArea;
	}

	public void setTxtArea(JTextArea txtArea) {
		this.txtArea = txtArea;
	}
	
}
