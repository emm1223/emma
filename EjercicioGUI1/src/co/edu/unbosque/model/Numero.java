package co.edu.unbosque.model;

public class Numero {

	private char[][] pizarra;
	private int filas;
	private int columnas;

	public Numero() {
		filas = 7;
		columnas = 7;
		pizarra = new char[filas][columnas];
	}

	public String construirSerie(int limite) {
		String resultado = "";
		for (int i = 0; i <= limite; i++) {
			resultado += i + " ";
			if (i % 10 == 0 && i != 0) {
				resultado += "\n";
			}
		}
		return resultado;
	}

	public double calcularPromedioNotas(double n1, double n2, double n3, double n4) {
		return (n1 + n2 + n3 + n4) / 4;
	}

	public String verPizarra() {
		String rta = "";
		for (int i = 0; i < filas; i++) {
			for (int j = 0; j < columnas; j++) {
				rta += pizarra[i][j] + " ";
			}
			rta += "\n";
		}
		return rta;
	}

	public void limpiarPizarra() {
		for (int i = 0; i < filas; i++) {
			for (int j = 0; j < columnas; j++) {
				pizarra[i][j] = ' ';
			}
		}
	}

	public String generarMatrizF() {
		limpiarPizarra();
		for (int i = 0; i < filas; i++) {
			for (int j = 0; j < columnas; j++) {
				if (i == 0 || i == 3 || j == 0) {
					pizarra[i][j] = 'F';
				}
			}
		}
		return "Inicial F:\n" + verPizarra();
	}

	public String generarMatrizE() {
		limpiarPizarra();
		for (int i = 0; i < filas; i++) {
			for (int j = 0; j < columnas; j++) {
				if (i == 0 || i == 3 || i == 6 || j == 0) {
					pizarra[i][j] = 'E';
				}
			}
		}
		return "Inicial E:\n" + verPizarra();
	}

	public String generarMatrizM() {
		limpiarPizarra();
		for (int i = 0; i < filas; i++) {
			for (int j = 0; j < columnas; j++) {
				if (j == 0 || j == 6) {
					pizarra[i][j] = 'M';
				} 
				else if (i == j && i <= 3) {
					pizarra[i][j] = 'M';
				} 
				else if (i + j == 6 && i <= 3) {
					pizarra[i][j] = 'M';
				}
			}
		}
		return "Inicial M:\n" + verPizarra();
	}

	public String generarMatrizR() {
		limpiarPizarra();
		for (int i = 0; i < filas; i++) {
			for (int j = 0; j < columnas; j++) {
				if (i == 0 || i == 3 || j == 0) {
					pizarra[i][j] = 'R';
				} else if (j == 6 && i < 3) {
					pizarra[i][j] = 'R';
				} else if (i == 4 && j == 2) {
					pizarra[i][j] = 'R';
				} else if (i == 5 && j == 4) {
					pizarra[i][j] = 'R';
				} else if (i == 6 && j == 6) {
					pizarra[i][j] = 'R';
				}
			}
		}
		return "Inicial R:\n" + verPizarra();
	}
}