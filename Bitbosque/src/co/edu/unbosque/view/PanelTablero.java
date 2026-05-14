package co.edu.unbosque.view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.GridLayout;
import java.awt.Image;
import java.io.File;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.LineBorder;
import co.edu.unbosque.model.Casilla;

public class PanelTablero extends JPanel {

	private JLabel[][] celdas;
	private JPanel pnlGrid; 
	private JPanel pnlControles; 
	
	private JButton btnMoverArriba, btnMoverAbajo, btnMoverIzquierda, btnMoverDerecha;
	private ImageIcon imgHacker, imgPaquete, imgFirewall, imgAntivirus, imgEscaner, imgNodo, imgPuerto;

	public PanelTablero() {
		setLayout(new BorderLayout()); 
		setBackground(Color.BLACK);
		setBorder(new LineBorder(Color.DARK_GRAY));
		
		pnlGrid = new JPanel();
		pnlGrid.setBackground(Color.BLACK);
		add(pnlGrid, BorderLayout.CENTER);
		
		inicializarBotones();
		cargarRecursos();
	}

	private void inicializarBotones() {
		pnlControles = new JPanel(new GridLayout(2, 3)); 
		pnlControles.setBackground(new Color(30, 30, 30));

		btnMoverArriba = new JButton("▲");
		btnMoverArriba.setActionCommand("ARRIBA");
		
		btnMoverAbajo = new JButton("▼");
		btnMoverAbajo.setActionCommand("ABAJO");
		
		btnMoverIzquierda = new JButton("◀");
		btnMoverIzquierda.setActionCommand("IZQUIERDA");
		
		btnMoverDerecha = new JButton("▶");
		btnMoverDerecha.setActionCommand("DERECHA");

		pnlControles.add(new JLabel("")); 
		pnlControles.add(btnMoverArriba);
		pnlControles.add(new JLabel("")); 
		pnlControles.add(btnMoverIzquierda);
		pnlControles.add(btnMoverAbajo);
		pnlControles.add(btnMoverDerecha);

		add(pnlControles, BorderLayout.SOUTH); 
	}

	public JButton getBtnMoverArriba() { return btnMoverArriba; }
	public JButton getBtnMoverAbajo() { return btnMoverAbajo; }
	public JButton getBtnMoverIzquierda() { return btnMoverIzquierda; }
	public JButton getBtnMoverDerecha() { return btnMoverDerecha; }

	private void cargarRecursos() {
		imgHacker = ajustarImagen("imagenes/hacker.png");
		imgPaquete = ajustarImagen("imagenes/paquete.png");
		imgFirewall = ajustarImagen("imagenes/firewall.png");
		imgAntivirus = ajustarImagen("imagenes/antivirus.png");
		imgEscaner = ajustarImagen("imagenes/escaner.png");
		imgNodo = ajustarImagen("imagenes/nodo.png");
		imgPuerto = ajustarImagen("imagenes/puerto.png");
	}

	private ImageIcon ajustarImagen(String ruta) {
		try {
			File f = new File(ruta);
			if(!f.exists()) {
				System.err.println("Imagen no encontrada: " + f.getAbsolutePath());
				return null;
			}
			ImageIcon icono = new ImageIcon(ruta);
			Image img = icono.getImage().getScaledInstance(40, 40, Image.SCALE_SMOOTH);
			return new ImageIcon(img);
		} catch (Exception e) {
			return null;
		}
	}

	public void crearTablero(int filas, int columnas) {
		pnlGrid.removeAll();
		pnlGrid.setLayout(new GridLayout(filas, columnas));
		this.celdas = new JLabel[filas][columnas];

		for (int i = 0; i < filas; i++) {
			for (int j = 0; j < columnas; j++) {
				celdas[i][j] = new JLabel();
				celdas[i][j].setOpaque(true);
				celdas[i][j].setBackground(new Color(10, 10, 10));
				celdas[i][j].setBorder(new LineBorder(Color.DARK_GRAY));
				celdas[i][j].setHorizontalAlignment(JLabel.CENTER);
				pnlGrid.add(celdas[i][j]);
			}
		}
		pnlGrid.revalidate();
		pnlGrid.repaint();
	}

	public void actualizarTablero(Casilla[][] matriz) {
		if (celdas == null) return; 

		for (int i = 0; i < matriz.length; i++) {
			for (int j = 0; j < matriz[i].length; j++) {
				String tipo = matriz[i][j].getTipo();
				
				if (matriz[i][j].isTieneRastro()) {
					celdas[i][j].setBackground(new Color(0, 50, 0));
				} else {
					celdas[i][j].setBackground(new Color(10, 10, 10));
				}

				switch (tipo) {
					case "SCRIPT": celdas[i][j].setIcon(imgHacker); break;
					case "PAQUETE": celdas[i][j].setIcon(imgPaquete); break;
					case "FIREWALL": celdas[i][j].setIcon(imgFirewall); break;
					case "ANTIVIRUS": celdas[i][j].setIcon(imgAntivirus); break;
					case "ESCANER": celdas[i][j].setIcon(imgEscaner); break;
					case "NODO": celdas[i][j].setIcon(imgNodo); break;
					case "PUERTO": celdas[i][j].setIcon(imgPuerto); break;
					default: celdas[i][j].setIcon(null); break;
				}
			}
		}
		pnlGrid.repaint();
	}
}