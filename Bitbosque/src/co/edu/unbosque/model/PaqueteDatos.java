package co.edu.unbosque.model;


public class PaqueteDatos {

	private int fila;
	private int columna;
	private boolean entregado;

	public PaqueteDatos(int fila, int columna) {
		this.fila = fila;
		this.columna = columna;
		this.entregado = false;
	}

	
	public void mover(int nuevaFila, int nuevaColumna) {
		this.fila = nuevaFila;
		this.columna = nuevaColumna;
	}


	public int getFila() {
		return fila;
	}

	public void setFila(int fila) {
		this.fila = fila;
	}

	public int getColumna() {
		return columna;
	}

	public void setColumna(int columna) {
		this.columna = columna;
	}

	public boolean isEntregado() {
		return entregado;
	}

	public void setEntregado(boolean entregado) {
		this.entregado = entregado;
	}
}