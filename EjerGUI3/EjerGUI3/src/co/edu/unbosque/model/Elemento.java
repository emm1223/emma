package co.edu.unbosque.model;

public class Elemento {
	
	private String nombre_elemento;
	private String descripcion;
	
	public Elemento() {
		nombre_elemento = "";
		descripcion = "";
	}

	public String getNombre_elemento() {
		return nombre_elemento;
	}

	public void setNombre_elemento(String nombre_elemento) {
		this.nombre_elemento = nombre_elemento;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
}
