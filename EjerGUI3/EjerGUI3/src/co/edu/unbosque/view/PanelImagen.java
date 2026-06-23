package co.edu.unbosque.view;

import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Image;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.TitledBorder;

public class PanelImagen extends JPanel {
	
	private JLabel lblL1;
		
	public PanelImagen() {
		setLayout(new FlowLayout());
		setBackground(Color.CYAN);
		setBorder( new TitledBorder( "Imagen del Elemento:" ) ) ;
		
		inicializarComponentes();
		
		setVisible(true);
	}

	public void inicializarComponentes() {
			
		lblL1 = new JLabel();
		add(lblL1);
		
	}
	
	public void cambiarImagen(String elem) {
		ImageIcon im = new ImageIcon(getClass().getResource("/imagenes/"+elem+".jpg"));
		ImageIcon icono = new ImageIcon(
				im.getImage().getScaledInstance(
						this.getWidth()-30, 
						this.getHeight()-30, 
						Image.SCALE_DEFAULT
				)
		);
		lblL1.setIcon(icono);
	}

	public JLabel getLblL1() {
		return lblL1;
	}

	public void setLblL1(JLabel lblL1) {
		this.lblL1 = lblL1;
	}
	
}
