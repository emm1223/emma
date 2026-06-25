package co.edu.unbosque.model;

public class Fachada {

	private Sitio[] sitios;
	private int agregados;

	public Fachada() {

		sitios = new Sitio[3];
		agregados = 0;

		cargarDatos();
	}

	public void cargarDatos() {

		Sitio aux = new Sitio();

		aux.setNombre("Alcoba");

		Elemento a = new Elemento();
		a.setNombre_elemento("Cama");
		a.setDescripcion("Sirve para descansar y hacer unas cosas muy ....");
		aux.agregarElemento(a);

		Elemento b = new Elemento();
		b.setNombre_elemento("Mesa");
		b.setDescripcion("Sirve guardar cosas que nunca se utilizan");
		aux.agregarElemento(b);

		agregarSitio(aux);


		aux = new Sitio();

		aux.setNombre("Banio");

		a = new Elemento();
		a.setNombre_elemento("Ducha");
		a.setDescripcion("Sirve para bañarse y hacer unas cosas muy ....");
		aux.agregarElemento(a);

		b = new Elemento();
		b.setNombre_elemento("Lavamanos");
		b.setDescripcion("Sirve lavarse las manos");
		aux.agregarElemento(b);

		agregarSitio(aux);


		aux = new Sitio();

		aux.setNombre("Cocina");

		a = new Elemento();
		a.setNombre_elemento("Estufa");
		a.setDescripcion("Sirve para cocinar y hacer unas cosas muy ....");
		aux.agregarElemento(a);

		b = new Elemento();
		b.setNombre_elemento("Nevera");
		b.setDescripcion("Sirve enfriar cosas");
		aux.agregarElemento(b);

		agregarSitio(aux);
	}

	public void agregarSitio(Sitio aux) {

		sitios[agregados] = aux;
		agregados++;
	}

	public int getCantidadSitios() {
		return agregados;
	}

	public String getNombreSitio(int pos) {
		return sitios[pos].getNombre();
	}

	public int getCantidadElementos(int posSitio) {
		return sitios[posSitio].getIngresados();
	}

	public String getNombreElemento(int posSitio, int posElemento) {

		return sitios[posSitio]
				.buscarElemento(posElemento)
				.getNombre_elemento();
	}

	public String getDescripcionElemento(int posSitio, int posElemento) {

		return sitios[posSitio]
				.buscarElemento(posElemento)
				.getDescripcion();
	}

	public void aumentarVisita(int posSitio) {
		sitios[posSitio].setAumentarVisitas();
	}

	public int getVisitas(int posSitio) {
		return sitios[posSitio].getVisitado();
	}
}