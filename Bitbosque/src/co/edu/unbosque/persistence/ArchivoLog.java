package co.edu.unbosque.persistence;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Se encarga de escribir el historial de la partida en un archivo de texto externo 
 * incluyendo fecha y hora exacta de cada evento.
 * 
 * @author Farid Emmanuel Munayar Rincon
 */
public class ArchivoLog {

    private String nombreArchivo;
    private File archivo;

    /**
     * Configura el archivo txt donde se guardarán los resultados del hackeo.
     */
    public ArchivoLog() {
        this.nombreArchivo = "registro_infiltracion.txt";
        this.archivo = new File(nombreArchivo);
    }

    /**
     * Escribe una línea de texto en el log sin borrar lo que ya existía, 
     * poniéndole una estampa de tiempo al inicio.
     */
    public void escribirRegistro(String evento) {
        try (FileWriter fw = new FileWriter(archivo, true); 
             PrintWriter pw = new PrintWriter(fw)) {
            
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            String fecha = dtf.format(LocalDateTime.now());
            
            pw.println("[" + fecha + "] " + evento);
            
        } catch (IOException e) {
            System.err.println("Error de entrada/salida al escribir el log: " + e.getMessage());
        }
    }

    /**
     * Escribe un bloque completo con el resumen del juego en el txt.
     */
    public void registrarFinal(String resultado, int movimientos) {
        escribirRegistro("--- FIN DE LA INFILTRACIÓN ---");
        escribirRegistro("RESULTADO FINAL: " + resultado);
        escribirRegistro("MOVIMIENTOS TOTALES: " + movimientos);
        escribirRegistro("-------------------------------");
    }
}