package co.edu.unbosque.persistence;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Componente encargado de la persistencia de datos del sistema.
 * Implementa la gestión de archivos planos para almacenar de forma persistente, 
 * cronológica e inmutable el registro de eventos (logs) y auditorías resultantes 
 * de las sesiones de infiltración en el servidor.
 * 
 * @author Farid Emmanuel Munayar Rincon
 * @version 1.0
 * @since 2026-05-22
 */
public class ArchivoLog {

    /**
     * El nombre literal o ruta relativa asignada al archivo físico en el disco duro.
     */
    private String nombreArchivo;

    /**
     * Objeto descriptor del archivo que maneja el enlace físico con el sistema de archivos del SO.
     */
    private File archivo;

    /**
     * Constructor de la clase. Inicializa las referencias físicas del archivo de logs,
     * parametrizando por defecto el nombre del destino como "registro_infiltracion.txt".
     */
    public ArchivoLog() {
        this.nombreArchivo = "registro_infiltracion.txt";
        this.archivo = new File(nombreArchivo);
    }

    /**
     * Escribe de forma síncrona un nuevo registro o línea de evento en el archivo de texto.
     * <p>
     * El método abre el flujo de datos bajo la estrategia de anexado (append de tipo true) 
     * e inyecta de manera automática una estampa de tiempo formateada según el estándar
     * "año/mes/día hora:minutos:segundos". Utiliza la estructura defensiva Try-with-resources
     * para asegurar la liberación y cierre de canales físicos ante cualquier fallo de E/S.
     * </p>
     * 
     * @param evento Mensaje descriptivo o cadena de datos que detalla la acción ocurrida.
     */
    public void escribirRegistro(String evento) {
        // Inicialización segura de flujos de salida con auto-close incorporado
        try (FileWriter fw = new FileWriter(archivo, true); 
             PrintWriter pw = new PrintWriter(fw)) {
            
            // Generación y formateo de la marca cronológica del sistema
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            String fecha = dtf.format(LocalDateTime.now());
            
            // Escritura estructurada con metadatos de tiempo
            pw.println("[" + fecha + "] " + evento);
            
        } catch (IOException e) {
            System.err.println("Error de entrada/salida al escribir el log: " + e.getMessage());
        }
    }

    /**
     * Genera y escribe de forma estructurada un bloque sintáctico de cierre para consolidar
     * los resultados globales obtenidos al finalizar la ejecución táctica del hacker.
     * 
     * @param resultado   Estado final del flujo, típicamente "VICTORIA" o "DERROTA".
     * @param movimientos El saldo numérico remanente de movimientos con el que cerró el Script.
     */
    public void registrarFinal(String resultado, int movimientos) {
        escribirRegistro("--- FIN DE LA INFILTRACIÓN ---");
        escribirRegistro("RESULTADO FINAL: " + resultado);
        escribirRegistro("MOVIMIENTOS TOTALES: " + movimientos);
        escribirRegistro("-------------------------------");
    }
}