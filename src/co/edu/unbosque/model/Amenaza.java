package co.edu.unbosque.model;

import java.util.Random;

/**
 * Representa una entidad hostil autónoma dentro del escenario del servidor.
 * Las amenazas actúan como obstáculos móviles (como procesos de Antivirus o Escáneres de red)
 * que patrullan de manera impredecible el sistema de archivos o la matriz de puertos,
 * complicando las maniobras de infiltración del usuario.
 * 
 * @author Farid Emmanuel Munayar Rincon
 * @version 1.0
 * @since 2026-05-22
 */
public class Amenaza {

    /**
     * Identificador del comportamiento o naturaleza de la amenaza. 
     * Valores esperados: "ANTIVIRUS" o "ESCANER".
     */
    private String tipo;

    /**
     * Coordenada actual de la amenaza orientada en el eje vertical (Y) de la matriz.
     */
    private int fila;

    /**
     * Coordenada actual de la amenaza orientada en el eje horizontal (X) de la matriz.
     */
    private int columna;

    /**
     * Generador de números pseudoaleatorios para determinar las rutinas de patrullaje.
     */
    private Random aleatorio;

    /**
     * Construye una nueva amenaza especificando sus características iniciales y su ubicación 
     * en el mapa de red.
     * 
     * @param tipo    El tipo de entidad defensiva ("ANTIVIRUS" o "ESCANER").
     * @param fila    Índice inicial de la fila dentro del escenario.
     * @param columna Índice inicial de la columna dentro del escenario.
     */
    public Amenaza(String tipo, int fila, int columna) {
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.aleatorio = new Random();
    }

    /**
     * Desplaza de forma aleatoria la posición de la amenaza en una de las cuatro 
     * direcciones cardinales posibles (Arriba, Abajo, Izquierda o Derecha).
     * El método valida matemáticamente los límites superiores e inferiores proporcionados 
     * para mitigar excepciones de desbordamiento de índice ({@link ArrayIndexOutOfBoundsException}).
     * 
     * @param maxFilas    Límite máximo de filas permitidas en el tablero actual.
     * @param maxColumnas Límite máximo de columnas permitidas en el tablero actual.
     */
    public void moverAleatoriamente(int maxFilas, int maxColumnas) {
        // Genera un valor entero entre 0 (inclusive) y 4 (exclusive)
        int direccion = aleatorio.nextInt(4);

        switch (direccion) {
            case 0: // Movimiento hacia el Norte (Arriba)
                if (fila > 0) fila--;
                break;
            case 1: // Movimiento hacia el Sur (Abajo)
                if (fila < maxFilas - 1) fila++;
                break;
            case 2: // Movimiento hacia el Oeste (Izquierda)
                if (columna > 0) columna--;
                break;
            case 3: // Movimiento hacia el Este (Derecha)
                if (columna < maxColumnas - 1) columna++;
                break;
        }
    }

    /**
     * Obtiene el tipo de amenaza activa.
     * 
     * @return Cadena de texto con la clasificación de la amenaza.
     */
    public String getTipo() {
        return tipo;
    }

    /**
     * Modifica el tipo de la amenaza actual.
     * 
     * @param tipo Nueva clasificación de la entidad hostil.
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    /**
     * Obtiene el índice de la fila actual de la amenaza.
     * 
     * @return Posición entera en el eje vertical.
     */
    public int getFila() {
        return fila;
    }

    /**
     * Actualiza forzosamente la fila de la amenaza en el mapa.
     * 
     * @param fila Nueva coordenada vertical.
     */
    public void setFila(int fila) {
        this.fila = fila;
    }

    /**
     * Obtiene el índice de la columna actual de la amenaza.
     * 
     * @return Posición entera en el eje horizontal.
     */
    public int getColumna() {
        return columna;
    }

    /**
     * Actualiza forzosamente la columna de la amenaza en el mapa.
     * 
     * @param columna Nueva coordenada horizontal.
     */
    public void setColumna(int columna) {
        this.columna = columna;
    }
}