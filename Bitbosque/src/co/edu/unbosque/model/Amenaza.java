package co.edu.unbosque.model;

import java.util.Random;


public class Amenaza {

	private String tipo; // "ANTIVIRUS" o "ESCANER"
	private int fila;
	private int columna;
	private Random aleatorio;

	
	public Amenaza(String tipo, int fila, int columna) {
		this.tipo = tipo;
		this.fila = fila;
		this.columna = columna;
		this.aleatorio = new Random();
	}

	
	public void moverAleatoriamente(int maxFilas, int maxColumnas) {
	
		int direccion = aleatorio.nextInt(4);

		switch (direccion) {
		case 0: // Arriba
			if (fila > 0) fila--;
			break;
		case 1: // Abajo
			if (fila < maxFilas - 1) fila++;
			break;
		case 2: // Izquierda
			if (columna > 0) columna--;
			break;
		case 3: // Derecha
			if (columna < maxColumnas - 1) columna++;
			break;
		}
	}

	
	
	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
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
}