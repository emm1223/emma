package co.edu.unbosque.model;

import java.util.ArrayList;
import java.util.Random;
import co.edu.unbosque.persistence.ArchivoLog;

/**
 * Motor lógico principal y simulación del entorno de red (Servidor).
 * Esta clase administra el estado global de la infiltración. Se encarga de la creación 
 * del mapa bidimensional, el posicionamiento aleatorio de las amenazas y los recursos, 
 * el procesamiento de movimientos basados en reglas de colisión, y el volcado de auditorías 
 * finales en la persistencia del sistema[cite: 10, 12, 21].
 * * @author Farid Emmanuel Munayar Rincon
 * @version 1.1
 * @since 2026-05-22
 */
public class Servidor {

    /** Matriz bidimensional que representa los nodos lógicos del servidor[cite: 12]. */
    private Casilla[][] matriz;
    
    /** Cantidad de filas que componen la infraestructura de red actual[cite: 12]. */
    private int filas;
    
    /** Cantidad de columnas que componen la infraestructura de red actual[cite: 12]. */
    private int columnas;
    
    /** Instancia del agente atacante que realiza la infiltración táctica[cite: 11]. */
    private ScriptInfiltracion hacker;
    
    /** Colección dinámica de procesos hostiles autónomos en ejecución simultánea[cite: 20]. */
    private ArrayList<Amenaza> amenazas;
    
    /** Componente utilitario encargado del procesamiento matemático de penalizaciones y bonos. */
    private CalculadoraSeguridad calculadora;
    
    /** Contador acumulativo de los paquetes de datos o puertos vulnerados exitosamente[cite: 10]. */
    private int puertosCapturados;
    
    /** Proveedor de aleatoriedad para la generación de entornos procedimentales[cite: 21]. */
    private Random aleatorio;

    /**
     * Construye el núcleo del servidor dimensionando el espacio de direcciones de red 
     * e inicializando las colecciones y herramientas requeridas de soporte lógico[cite: 12].
     * * @param m Cantidad de filas del mapa.
     * @param n Cantidad de columnas del mapa.
     */
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

    /**
     * Instancia y puebla cada índice de la matriz bidimensional con objetos neutros 
     * de tipo {@link Casilla} para prevenir errores de tipo nulo ({@link NullPointerException}).
     */
    private void inicializarMatriz() {
        for (int i = 0; i < filas; i++) {
            for (int j = 0; j < columnas; j++) {
                matriz[i][j] = new Casilla();
            }
        }
    }

    /**
     * Genera la distribución inicial de recursos, defensas y obstáculos dentro del servidor 
     * en función del nivel de dificultad técnica seleccionado por el usuario[cite: 21, 45].
     * * @param dificultad Grado de complejidad del sistema de defensa ("Baja", "Media", "Alta")[cite: 45].
     */
    public void generarEscenario(String dificultad) {
        // REQ-04 y Regla Base: Los movimientos máximos equivalen al producto de M x N[cite: 31, 45].
        int movimientosIniciales = filas * columnas;
        hacker = new ScriptInfiltracion(0, 0, movimientosIniciales); 
        actualizarPosicionEnMatriz(0, 0, "SCRIPT");

        // Coloca de forma procedimental los paquetes de datos requeridos para la misión[cite: 21].
        for (int i = 0; i < 3; i++) {
            colocarObjetoAleatorio("PAQUETE");
        }

        // Densidad de cortafuegos y procesos defensivos según REQ-04 [cite: 45]
        int cantidadObstaculos;
        if (dificultad.equals("Alta")) {
            cantidadObstaculos = 16;
        } else if (dificultad.equals("Media")) {
            cantidadObstaculos = 10;
        } else {
            cantidadObstaculos = 5;
        }

        for (int i = 0; i < cantidadObstaculos; i++) {
            colocarObjetoAleatorio("FIREWALL");
            
            // Generación balanceada e intercalada de amenazas móviles autónomas 
            if (i % 2 == 0) {
                int af = generarPosicionAleatoria(true);
                int ac = generarPosicionAleatoria(false);
                
                if (matriz[af][ac].getTipo().equals("VACIO")) {
                    // Si el índice es divisible por 4 crea un Antivirus, si no, crea un Escáner 
                    String tipoAmenaza = (i % 4 == 0) ? "ANTIVIRUS" : "ESCANER";
                    amenazas.add(new Amenaza(tipoAmenaza, af, ac));
                    actualizarPosicionEnMatriz(af, ac, tipoAmenaza);
                }
            }
        }
        
        // REQ-02: Distribución de nodos de energía para restauración de movimientos [cite: 40]
        colocarObjetoAleatorio("NODO");
        colocarObjetoAleatorio("NODO");
    }

    /**
     * Evalúa y ejecuta el desplazamiento físico del script hacker a través de los nodos 
     * del servidor, controlando el rastro digital dejado, colisiones con firewalls, 
     * consumo de movimientos de red y la posterior reacción de las defensas[cite: 12, 26, 33, 46].
     * * @param direccion Cardinalidad del movimiento pretendido ("ARRIBA", "ABAJO", "IZQUIERDA", "DERECHA")[cite: 12].
     * @return {@code true} si el paso fue válido y ejecutado, {@code false} si fue cancelado por límites o bloqueos.
     */
    public boolean intentarMovimiento(String direccion) {
        int nuevaF = hacker.getFila();
        int nuevaC = hacker.getColumna();

        switch (direccion) {
            case "ARRIBA": nuevaF--; break;
            case "ABAJO": nuevaF++; break;
            case "IZQUIERDA": nuevaC--; break;
            case "DERECHA": nuevaC++; break;
        }

        // Validación perimetral de desbordamiento de índices en el mapa de red [cite: 12]
        if (nuevaF >= 0 && nuevaF < filas && nuevaC >= 0 && nuevaC < columnas) {
            if (!matriz[nuevaF][nuevaC].getTipo().equals("FIREWALL")) {
                
                // REQ-05: Deja huella o rastro digital en el nodo saliente antes de actualizar [cite: 46]
                matriz[hacker.getFila()][hacker.getColumna()].setTieneRastro(true);
                matriz[hacker.getFila()][hacker.getColumna()].setTipo("VACIO");

                hacker.mover(nuevaF, nuevaC);
                evaluarCasilla(nuevaF, nuevaC); 
                actualizarPosicionEnMatriz(nuevaF, nuevaC, "SCRIPT");
                
                hacker.descontarMovimientos(1);
                moverAmenazas(); // Fase de respuesta táctica de la IA del servidor [cite: 26]
                return true;
            }
        }
        return false;
    }

    /**
     * Aplica las reglas lógicas y físicas de colisión según el objeto alojado 
     * en la casilla de destino, alterando recursos del hacker mediante la {@link CalculadoraSeguridad}[cite: 27, 29, 39, 40].
     * * @param f Coordenada vertical de la casilla a evaluar.
     * @param c Coordenada horizontal de la casilla a evaluar.
     */
    private void evaluarCasilla(int f, int c) {
        String objeto = matriz[f][c].getTipo();
        
        if (objeto.equals("NODO")) {
            // REQ-02: Los nodos de energía recuperan el 10% de la capacidad base [cite: 40]
            int bono = calculadora.calcularBonoNodo(filas * columnas);
            hacker.aumentarMovimientos(bono);
        } else if (objeto.equals("PAQUETE")) {
            puertosCapturados++; 
        } else if (objeto.equals("ANTIVIRUS")) {
            // REQ-01: El Modo Sigilo bloquea la detección hostil por un único turno [cite: 39]
            if (!hacker.isModoSigiloActivo()) {
                // Regla oficial: El encuentro directo con un Antivirus causa la derrota inmediata [cite: 27]
                hacker.setMovimientosRestantes(0); 
            } else {
                hacker.setModoSigiloActivo(false); // Quema el escudo del camuflaje [cite: 39]
            }
        } else if (objeto.equals("ESCANER")) {
            if (!hacker.isModoSigiloActivo()) {
                // Regla oficial: El Escáner disminuye un 5% de tus recursos de movimiento restantes 
                int penalizacion = calculadora.calcularPenalizacionEscaner(hacker.getMovimientosRestantes());
                hacker.descontarMovimientos(penalizacion);
            } else {
                hacker.setModoSigiloActivo(false); // Quema el escudo del camuflaje [cite: 39]
            }
        }
    }

    /**
     * Dispara los ciclos de actualización autónoma para cada amenaza registrada, 
     * limpiando su posición anterior en el plano y reubicándola tras su cálculo aleatorio[cite: 26].
     */
    private void moverAmenazas() {
        for (Amenaza a : amenazas) {
            if (!matriz[a.getFila()][a.getColumna()].getTipo().equals("SCRIPT")) {
                matriz[a.getFila()][a.getColumna()].setTipo("VACIO");
            }
            a.moverAleatoriamente(filas, columnas);
            matriz[a.getFila()][a.getColumna()].setTipo(a.getTipo());
        }
    }

    /**
     * Ubica de manera pseudoaleatoria un objeto en un espacio vacío disponible de la matriz[cite: 21]. 
     * Incorpora un límite defensivo de 100 intentos de búsqueda para mitigar bucles infinitos 
     * en mapas de alta densidad de objetos.
     * * @param tipo Identificador del objeto a inyectar en el plano.
     */
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

    /**
     * Genera un índice entero aleatorio acotado por las dimensiones de la infraestructura.
     * * @param esFila Determina si la dimensión a acotar corresponde al eje vertical (true) o horizontal (false).
     * @return Valor entero aleatorio válido para direccionamiento.
     */
    private int generarPosicionAleatoria(boolean esFila) {
        return aleatorio.nextInt(esFila ? filas : columnas);
    }

    /**
     * Sobrescribe el tipo estructural de una celda específica dadas sus coordenadas espaciales.
     * * @param f    Índice de la fila.
     * @param c    Índice de la columna.
     * @param tipo El nuevo valor de tipo de la celda.
     */
    private void actualizarPosicionEnMatriz(int f, int c, String tipo) {
        matriz[f][c].setTipo(tipo);
    }

    /**
     * Verifica si se cumple la condición de éxito (Extracción de los 3 paquetes de datos)[cite: 10].
     * * @return {@code true} en caso de victoria, {@code false} de lo contrario.
     */
    public boolean verificarVictoria() { return puertosCapturados >= 3; }

    /**
     * Verifica si se cumple la condición de fracaso del agente (Agotamiento de la reserva de movimientos)[cite: 10].
     * * @return {@code true} en caso de derrota, {@code false} de lo contrario.
     */
    public boolean verificarDerrota() { return hacker.getMovimientosRestantes() <= 0; }

    /** @return La topología de la red actual (matriz de casillas)[cite: 12]. */
    public Casilla[][] getMatriz() { return matriz; }

    /** @return Conteo actual de recursos remanentes en el script de ataque. */
    public int getMovimientosRestantes() { return hacker.getMovimientosRestantes(); }

    /** @return Cantidad neta de objetivos estratégicos cumplidos[cite: 60]. */
    public int getPuertosVisitados() { return puertosCapturados; }

    /** @return Estado de disponibilidad global de la habilidad sigilosa[cite: 39]. */
    public boolean isSigiloDisponible() { return !hacker.isSigiloUsado(); }

    /** Modifica y ejecuta de forma atómica el estado de camuflaje de red del agente[cite: 39]. */
    public void activarModoSigilo() { hacker.setModoSigiloActivo(true); hacker.setSigiloUsado(true); }

    /**
     * REQ-03: Compila, formatea y escribe de forma síncrona los indicadores clave de rendimiento 
     * (KPI) de la sesión de infiltración utilizando la entidad física {@link ArchivoLog}[cite: 44].
     */
    public void guardarLogFinal() {
        ArchivoLog logger = new ArchivoLog();
        String resultado = verificarVictoria() ? "VICTORIA" : "DERROTA";
        
        logger.escribirRegistro("--- FIN DE LA INFILTRACIÓN ---");
        logger.escribirRegistro("Usuario: Farid Emmanuel Munayar Rincon"); 
        logger.escribirRegistro("Resultado: " + resultado);
        logger.escribirRegistro("Movimientos restantes: " + hacker.getMovimientosRestantes());
        logger.escribirRegistro("Puertos comprometidos: " + puertosCapturados);
    }
}