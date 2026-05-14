package co.edu.unbosque.model;


public class Casilla {

	private String tipo;
	private boolean tieneRastro; 
	
	public Casilla() {
		this.tipo = "VACIO";
		this.tieneRastro = false;
	}


	
	public Casilla(String tipo) {
		this.tipo = tipo;
		this.tieneRastro = false;
	}



	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public boolean isTieneRastro() {
		return tieneRastro;
	}

	public void setTieneRastro(boolean tieneRastro) {
		this.tieneRastro = tieneRastro;
	}
}