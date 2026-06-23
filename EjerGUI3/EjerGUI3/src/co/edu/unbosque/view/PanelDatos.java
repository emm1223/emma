package co.edu.unbosque.view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.TitledBorder;

public class PanelDatos extends JPanel {

	private JLabel lblL1;
	private JComboBox<String> cbxSitios;
	private JLabel lblL2;
	private JComboBox<String> cbxElementos;
	private JButton btnBuscar;
	private JButton btnReiniciar;

	public PanelDatos() {
		setLayout(new GridLayout(1, 6, 5, 5));
		setBackground(new Color(212, 217, 217));
		setPreferredSize(new Dimension(600, 50));
		setBorder(new TitledBorder("Modulo de Datos:"));

		inicializarComponentes();

		setVisible(true);
	}

	public void inicializarComponentes() {

		lblL1 = new JLabel("Sitio: ");
		add(lblL1);

		cbxSitios = new JComboBox<String>();
		cbxSitios.setActionCommand("SITIO");
		add(cbxSitios);

		lblL2 = new JLabel("Elemento: ");
		add(lblL2);

		cbxElementos = new JComboBox<String>();
		cbxElementos.setEnabled(false);
		add(cbxElementos);

		btnBuscar = new JButton("Buscar");
		btnBuscar.setActionCommand("BUSCAR");
		btnBuscar.setEnabled(false);
		add(btnBuscar);

		btnReiniciar = new JButton("Reiniciar");
		btnReiniciar.setActionCommand("REINICIAR");
		btnReiniciar.setEnabled(false);
		add(btnReiniciar);

	}

	public JLabel getLblL1() {
		return lblL1;
	}

	public void setLblL1(JLabel lblL1) {
		this.lblL1 = lblL1;
	}

	public JComboBox<String> getCbxSitios() {
		return cbxSitios;
	}

	public void setCbxSitios(JComboBox<String> cbxSitios) {
		this.cbxSitios = cbxSitios;
	}

	public JLabel getLblL2() {
		return lblL2;
	}

	public void setLblL2(JLabel lblL2) {
		this.lblL2 = lblL2;
	}

	public JComboBox<String> getCbxElementos() {
		return cbxElementos;
	}

	public void setCbxElementos(JComboBox<String> cbxElementos) {
		this.cbxElementos = cbxElementos;
	}

	public JButton getBtnBuscar() {
		return btnBuscar;
	}

	public void setBtnBuscar(JButton btnBuscar) {
		this.btnBuscar = btnBuscar;
	}

	public JButton getBtnReiniciar() {
		return btnReiniciar;
	}

	public void setBtnReiniciar(JButton btnReiniciar) {
		this.btnReiniciar = btnReiniciar;
	}

}
