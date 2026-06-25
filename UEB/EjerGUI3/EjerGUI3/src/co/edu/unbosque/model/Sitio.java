package co.edu.unbosque.model;

public class Sitio {
	
	private String nombre;
	private Elemento elementos [];// arreglo de objetos tipo elemento
	private int ingresados;
	private int visitado;
	
	public Sitio() {
		nombre = "";
		elementos = new Elemento [2];
		visitado = 0;
		ingresados = 0;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Elemento[] getElementos() {
		return elementos;
	}

	public void setElementos(Elemento[] elementos) {
		this.elementos = elementos;
	}
	
	public void setAumentarVisitas() {
		this.visitado++;
	}
	
	public Elemento buscarElemento(int pos) {
		return elementos[pos];
	}
	
	public void agregarElemento(Elemento a) {
		elementos[ingresados]=a;
		ingresados++;
	}
	
	public int getIngresados() {
		return ingresados;
	}

	public void setIngresados(int ingresados) {
		this.ingresados = ingresados;
	}

	public int getVisitado() {
		return visitado;
	}

	public void setVisitado(int visitado) {
		this.visitado = visitado;
	}
	
}
