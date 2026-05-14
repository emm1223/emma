package co.edu.unbosque.model;


public class ScriptInfiltracion {

	private int fila;
	private int columna;
	private int movimientosRestantes;
	private boolean modoSigiloActivo;
	private boolean sigiloUsado;

	
	public ScriptInfiltracion(int fila, int columna, int movimientos) {
		this.fila = fila;
		this.columna = columna;
		this.movimientosRestantes = movimientos;
		this.modoSigiloActivo = false;
		this.sigiloUsado = false;
	}

	
	public void mover(int nuevaFila, int nuevaColumna) {
		this.fila = nuevaFila;
		this.columna = nuevaColumna;
	}

	
	public void descontarMovimientos(int cantidad) {
		this.movimientosRestantes -= cantidad;
		if (this.movimientosRestantes < 0) {
			this.movimientosRestantes = 0;
		}
	}

	
	public void aumentarMovimientos(int cantidad) {
		this.movimientosRestantes += cantidad;
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

	public int getMovimientosRestantes() {
		return movimientosRestantes;
	}

	public void setMovimientosRestantes(int movimientosRestantes) {
		this.movimientosRestantes = movimientosRestantes;
	}

	public boolean isModoSigiloActivo() {
		return modoSigiloActivo;
	}

	public void setModoSigiloActivo(boolean modoSigiloActivo) {
		this.modoSigiloActivo = modoSigiloActivo;
	}

	public boolean isSigiloUsado() {
		return sigiloUsado;
	}

	public void setSigiloUsado(boolean sigiloUsado) {
		this.sigiloUsado = sigiloUsado;
	}
}