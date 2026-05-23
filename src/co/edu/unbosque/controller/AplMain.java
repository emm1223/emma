package co.edu.unbosque.controller;

/**
 * Clase principal (punto de entrada) de la aplicación.
 * Se encarga de iniciar el flujo del programa instanciando el controlador principal.
 * 
 * @author Farid Emmanuel Munayar Rincon
 * @version 1.0
 * @since 2026-05-22
 */
public class AplMain {

    /**
     * Método de inicio (main) que ejecuta la Máquina Virtual de Java (JVM).
     * Crea una nueva instancia anónima de la clase {@link Controller} para 
     * cederle el control de la aplicación.
     * 
     * @param args Argumentos de la línea de comandos (no utilizados en esta aplicación).
     */
    public static void main(String[] args) {
        
        new Controller(); 
    }
} 