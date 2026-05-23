package co.edu.unbosque.controller;
import co.edu.unbosque.model.Tablero;
import co.edu.unbosque.view.VistaConsola;

public class Controller {

private VistaConsola vista;
private Tablero tablero;

public Controller() {
	vista = new VistaConsola();
	tablero = new Tablero();
}
	 public void run( ) {
		    tablero.limpiar();
		    vista.mostrarInformacion(tablero.verPizarra());
	 
		    tablero.limpiar();
		    tablero.cargarLetraF();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraA();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraR();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraI();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraD();
		    vista.mostrarInformacion(tablero.verPizarra());
		    
		    tablero.limpiar();
		    tablero.cargarLetraE();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraM();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraM();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraA();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraN();
		    vista.mostrarInformacion(tablero.verPizarra());
		    
		    tablero.limpiar();
		    tablero.cargarLetraU();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraE();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraL();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraM();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraU();
		    vista.mostrarInformacion(tablero.verPizarra());
		    
		    tablero.limpiar();
		    tablero.cargarLetraN();
		    vista.mostrarInformacion(tablero.verPizarra());
		    
		    tablero.limpiar();
		    tablero.cargarLetraA();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraY();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraA();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraR();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraR();
		    vista.mostrarInformacion(tablero.verPizarra());
		    
		    tablero.limpiar();
		    tablero.cargarLetraI();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraN();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraC();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraO();
		    vista.mostrarInformacion(tablero.verPizarra());

		    tablero.limpiar();
		    tablero.cargarLetraN();
		    vista.mostrarInformacion(tablero.verPizarra());
		}
	 
	 

}

