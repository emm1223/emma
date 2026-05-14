package co.edu.unbosque.model;


public class CalculadoraSeguridad {

	
	public int calcularBonoNodo(int movimientosActuales) {
		double bono = movimientosActuales * 0.10;
		return (int) Math.round(bono);
	}

	
	public int calcularPenalizacionFirewall(int fila, int columna) {
		return fila + columna;
	}

	public int calcularPenalizacionEscaner(int movimientosActuales) {
		double penalizacion = movimientosActuales * 0.05;
		return (int) Math.round(penalizacion);
	}

	
	public int calcularCostoProtocolo() {
		
		return 5;
	}
}