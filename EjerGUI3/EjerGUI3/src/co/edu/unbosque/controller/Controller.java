package co.edu.unbosque.controller;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import co.edu.unbosque.model.Fachada;
import co.edu.unbosque.view.VentanaPrincipal;

public class Controller implements ActionListener {

	private VentanaPrincipal ventana;
	private Fachada fachada;
	private int pos;
	private int pos_elem;

	public Controller() {

		fachada = new Fachada();

		pos = 0;
		pos_elem = 0;

		ventana = new VentanaPrincipal();

		for (int i = 0; i < fachada.getCantidadSitios(); i++) {

			ventana.getPaneldatos()
			       .getCbxSitios()
			       .addItem(fachada.getNombreSitio(i));
		}

		asignarOyentes();
	}

	public void asignarOyentes() {

		ventana.getPaneldatos()
		       .getCbxSitios()
		       .addActionListener(this);

		ventana.getPaneldatos()
		       .getBtnBuscar()
		       .addActionListener(this);

		ventana.getPaneldatos()
		       .getBtnReiniciar()
		       .addActionListener(this);
	}

	@Override
	public void actionPerformed(ActionEvent e) {

		String command = e.getActionCommand();

		System.out.println(command);

		if (command.equals("SITIO")) {

			pos = ventana.getPaneldatos()
					     .getCbxSitios()
					     .getSelectedIndex();

			ventana.getPaneldatos()
			       .getCbxElementos()
			       .removeAllItems();

			for (int i = 0; i < fachada.getCantidadElementos(pos); i++) {

				ventana.getPaneldatos()
				       .getCbxElementos()
				       .addItem(fachada.getNombreElemento(pos, i));
			}

			fachada.aumentarVisita(pos);

			ventana.getPaneldatos()
			       .getCbxSitios()
			       .setEnabled(false);

			ventana.getPaneldatos()
			       .getCbxElementos()
			       .setEnabled(true);

			ventana.getPaneldatos()
			       .getBtnBuscar()
			       .setEnabled(true);

			ventana.getPaneldatos()
			       .getBtnReiniciar()
			       .setEnabled(true);

		} else if (command.equals("BUSCAR")) {

			pos_elem = ventana.getPaneldatos()
					          .getCbxElementos()
					          .getSelectedIndex();

			String nombre_sitio =
					fachada.getNombreSitio(pos);

			String nombre_elemento =
					fachada.getNombreElemento(pos, pos_elem);

			String descripcion_elemento =
					fachada.getDescripcionElemento(pos, pos_elem);

			int visitas =
					fachada.getVisitas(pos);

			ventana.getPanelinfo()
			       .getLblL1()
			       .setText("Sitio: " + nombre_sitio);

			ventana.getPanelinfo()
			       .getLblL2()
			       .setText("Elemento: " + nombre_elemento);

			ventana.getPanelinfo()
			       .getLblL3()
			       .setText("Visitas: " + visitas);

			ventana.getPanelinfo()
			       .getTxtArea()
			       .setText("Descripcion:\n" + descripcion_elemento);

			ventana.getPaneldatos()
			       .getCbxElementos()
			       .setEnabled(false);

			ventana.getPaneldatos()
			       .getBtnBuscar()
			       .setEnabled(false);

			String elem =
					fachada.getNombreElemento(pos, pos_elem)
					       .toLowerCase();

			ventana.getPanelimagen().cambiarImagen(elem);

		} else if (command.equals("REINICIAR")) {

			ventana.getPaneldatos()
			       .getCbxElementos()
			       .removeAllItems();

			ventana.getPaneldatos()
			       .getCbxSitios()
			       .setEnabled(true);

			ventana.getPaneldatos()
			       .getCbxElementos()
			       .setEnabled(false);

			ventana.getPaneldatos()
			       .getBtnBuscar()
			       .setEnabled(false);

			ventana.getPaneldatos()
			       .getBtnReiniciar()
			       .setEnabled(false);

			ventana.getPanelimagen()
			       .getLblL1()
			       .setIcon(null);

			ventana.getPanelinfo()
			       .getLblL1()
			       .setText("Sitio: ");

			ventana.getPanelinfo()
			       .getLblL2()
			       .setText("Elemento: ");

			ventana.getPanelinfo()
			       .getLblL3()
			       .setText("Visitas: ");

			ventana.getPanelinfo()
			       .getTxtArea()
			       .setText("");

			ventana.getPaneldatos()
			       .getCbxSitios()
			       .removeActionListener(this);

			ventana.getPaneldatos()
			       .getCbxSitios()
			       .removeAllItems();

			for (int i = 0; i < fachada.getCantidadSitios(); i++) {

				ventana.getPaneldatos()
				       .getCbxSitios()
				       .addItem(fachada.getNombreSitio(i));
			}

			ventana.getPaneldatos()
			       .getCbxSitios()
			       .addActionListener(this);
		}
	}
}