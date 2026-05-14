package co.edu.unbosque.persistence;



import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


public class ArchivoLog {

	private String nombreArchivo;
	private File archivo;

	
	public ArchivoLog() {
		this.nombreArchivo = "registro_infiltracion.txt";
		this.archivo = new File(nombreArchivo);
	}

	
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

	
	public void registrarFinal(String resultado, int movimientos) {
		escribirRegistro("--- FIN DE LA INFILTRACIÓN ---");
		escribirRegistro("RESULTADO FINAL: " + resultado);
		escribirRegistro("MOVIMIENTOS TOTALES: " + movimientos);
		escribirRegistro("-------------------------------");
	}
}