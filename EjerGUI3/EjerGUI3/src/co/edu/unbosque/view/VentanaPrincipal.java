package co.edu.unbosque.view;

import java.awt.BorderLayout;
import java.awt.Color;
import javax.swing.JFrame;
import javax.swing.JOptionPane;

public class VentanaPrincipal extends JFrame {
	
	private PanelDatos panelDatos;
	private PanelInformacion panelInfo;
	private PanelImagen panelImagen;
	
	
	public VentanaPrincipal() {
		setTitle("Programa Objetos de la Casa");
		setSize(600, 500);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		getContentPane().setBackground(Color.red);
		getContentPane().setLayout(new BorderLayout(10,10));

		inicializarComponentes();

		setResizable(true);
		setLocationRelativeTo(null);
		setVisible(true);
	}
	
	public void inicializarComponentes() {
		
		panelDatos = new PanelDatos();
		getContentPane().add(panelDatos,BorderLayout.NORTH);
		panelInfo = new PanelInformacion();
		getContentPane().add(panelInfo,BorderLayout.WEST);
		panelImagen = new PanelImagen();
		getContentPane().add(panelImagen,BorderLayout.CENTER);
		
	}
	
	public PanelDatos getPaneldatos() {
		return panelDatos;
	}

	public void setPaneldatos(PanelDatos paneldatos) {
		this.panelDatos = paneldatos;
	}

	public PanelInformacion getPanelinfo() {
		return panelInfo;
	}

	public void setPanelinfo(PanelInformacion panelinfo) {
		this.panelInfo = panelinfo;
	}

	public PanelImagen getPanelimagen() {
		return panelImagen;
	}

	public void setPanelimagen(PanelImagen panelimagen) {
		this.panelImagen = panelimagen;
	}

	public void imprimirMensaje(String m) {
		JOptionPane.showMessageDialog(null, m);
	}

	public int capturarDato(String m) {
		int n = 0;
		String aux = JOptionPane.showInputDialog(m);
		n = Integer.parseInt(aux);
		return n;
	}
}
