package co.edu.unbosque.model;

import java.util.ArrayList;
import java.util.Random;
import co.edu.unbosque.persistence.ArchivoLog;

public class Servidor {

	private Casilla[][] matriz;
	private int filas;
	private int columnas;
	private ScriptInfiltracion hacker;
	private ArrayList<Amenaza> amenazas;
	private CalculadoraSeguridad calculadora;
	private int puertosCapturados;
	private Random aleatorio;

	public Servidor(int m, int n) {
		this.filas = m;
		this.columnas = n;
		this.matriz = new Casilla[m][n];
		this.amenazas = new ArrayList<>();
		this.calculadora = new CalculadoraSeguridad();
		this.aleatorio = new Random();
		this.puertosCapturados = 0;
		inicializarMatriz();
	}

	private void inicializarMatriz() {
		for (int i = 0; i < filas; i++) {
			for (int j = 0; j < columnas; j++) {
				matriz[i][j] = new Casilla();
			}
		}
	}

	public void generarEscenario(String dificultad) {
	
		hacker = new ScriptInfiltracion(0, 0, 100); 
		actualizarPosicionEnMatriz(0, 0, "SCRIPT");

	
		for (int i = 0; i < 3; i++) {
			colocarObjetoAleatorio("PAQUETE");
		}

		
		int cantidadObstaculos = dificultad.equals("Alta") ? 15 : 8;
		for (int i = 0; i < cantidadObstaculos; i++) {
			colocarObjetoAleatorio("FIREWALL");
			
		
			if (i % 3 == 0) {
				int af = generarPosicionAleatoria(true);
				int ac = generarPosicionAleatoria(false);
				
				if (matriz[af][ac].getTipo().equals("VACIO")) {
					amenazas.add(new Amenaza("ANTIVIRUS", af, ac));
					actualizarPosicionEnMatriz(af, ac, "ANTIVIRUS");
				}
			}
		}
		
	
		colocarObjetoAleatorio("NODO");
		colocarObjetoAleatorio("NODO");
	}

	public boolean intentarMovimiento(String direccion) {
		int nuevaF = hacker.getFila();
		int nuevaC = hacker.getColumna();

		switch (direccion) {
			case "ARRIBA": nuevaF--; break;
			case "ABAJO": nuevaF++; break;
			case "IZQUIERDA": nuevaC--; break;
			case "DERECHA": nuevaC++; break;
		}

		if (nuevaF >= 0 && nuevaF < filas && nuevaC >= 0 && nuevaC < columnas) {
			if (!matriz[nuevaF][nuevaC].getTipo().equals("FIREWALL")) {
				
				matriz[hacker.getFila()][hacker.getColumna()].setTieneRastro(true);
				matriz[hacker.getFila()][hacker.getColumna()].setTipo("VACIO");

				hacker.mover(nuevaF, nuevaC);
				evaluarCasilla(nuevaF, nuevaC); 
				actualizarPosicionEnMatriz(nuevaF, nuevaC, "SCRIPT");
				
				hacker.descontarMovimientos(1);
				moverAmenazas();
				return true;
			}
		}
		return false;
	}

	private void evaluarCasilla(int f, int c) {
		String objeto = matriz[f][c].getTipo();
		
		if (objeto.equals("NODO")) {
			int bono = calculadora.calcularBonoNodo(hacker.getMovimientosRestantes());
			hacker.aumentarMovimientos(bono);
		} else if (objeto.equals("PAQUETE")) {
			puertosCapturados++; 
		} else if (objeto.equals("ANTIVIRUS") && !hacker.isModoSigiloActivo()) {
			hacker.descontarMovimientos(10); 
		}
		
		
	}

	private void moverAmenazas() {
		for (Amenaza a : amenazas) {
			if (!matriz[a.getFila()][a.getColumna()].getTipo().equals("SCRIPT")) {
				matriz[a.getFila()][a.getColumna()].setTipo("VACIO");
			}
			a.moverAleatoriamente(filas, columnas);
			matriz[a.getFila()][a.getColumna()].setTipo(a.getTipo());
		}
	}

	private void colocarObjetoAleatorio(String tipo) {
		int f, c;
		int intentos = 0;
		do {
			f = aleatorio.nextInt(filas);
			c = aleatorio.nextInt(columnas);
			intentos++;
		} while (!matriz[f][c].getTipo().equals("VACIO") && intentos < 100);
		
		matriz[f][c].setTipo(tipo);
	}

	private int generarPosicionAleatoria(boolean esFila) {
		return aleatorio.nextInt(esFila ? filas : columnas);
	}

	private void actualizarPosicionEnMatriz(int f, int c, String tipo) {
		matriz[f][c].setTipo(tipo);
	}

	public boolean verificarVictoria() { return puertosCapturados >= 3; }
	public boolean verificarDerrota() { return hacker.getMovimientosRestantes() <= 0; }
	public Casilla[][] getMatriz() { return matriz; }
	public int getMovimientosRestantes() { return hacker.getMovimientosRestantes(); }
	public int getPuertosVisitados() { return puertosCapturados; }
	public boolean isSigiloDisponible() { return !hacker.isSigiloUsado(); }
	public void activarModoSigilo() { hacker.setModoSigiloActivo(true); hacker.setSigiloUsado(true); }

	public void guardarLogFinal() {
	    ArchivoLog logger = new ArchivoLog();
	    String resultado = verificarVictoria() ? "VICTORIA" : "DERROTA";
	    
	    logger.escribirRegistro("--- FIN DE LA INFILTRACIÓN ---");
	    logger.escribirRegistro("Usuario: User"); 
	    logger.escribirRegistro("Resultado: " + resultado);
	    logger.escribirRegistro("Movimientos restantes: " + hacker.getMovimientosRestantes());
	    logger.escribirRegistro("Puertos comprometidos: " + puertosCapturados);
	}
}
