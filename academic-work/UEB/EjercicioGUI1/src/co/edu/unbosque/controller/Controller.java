package co.edu.unbosque.controller;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JOptionPane;
import co.edu.unbosque.model.Numero;
import co.edu.unbosque.view.VentanaPrincipal;

public class Controller implements ActionListener {

	private VentanaPrincipal marcoGrafico; 
	private Numero motorLogico;

	public Controller() {
		marcoGrafico = new VentanaPrincipal();
		motorLogico = new Numero();
		enlazarEventos();
	}

	public void enlazarEventos() {
		marcoGrafico.getPanelAcademico().getBtnSaludar().addActionListener(this);
		marcoGrafico.getPanelAsignaturas().getBtnnumero().addActionListener(this);
		marcoGrafico.getPanelDificultad().getBtnCalificaciones().addActionListener(this);
		marcoGrafico.getPanelFamilia().getBtnIniciales().addActionListener(this);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		String idComando = e.getActionCommand();
		
		if (idComando.equals("SALUDAR")) {
			JOptionPane.showMessageDialog(marcoGrafico, "Bienvenido al sistema de: Farid Munayar.");
		} 
		
		else if (idComando.equals("NUMEROS")) {
			try {
				int valor = marcoGrafico.leerDatoEntero("Farid, ingresa un numero para contar desde 0:");
				String resultado = motorLogico.construirSerie(valor);
				JOptionPane.showMessageDialog(marcoGrafico, "Cuenta hasta " + valor + ":\n" + resultado);
			} catch (Exception error) {
				JOptionPane.showMessageDialog(marcoGrafico, "Error: Debe ingresar un numero.");
			}
		} 
		
		else if (idComando.equals("PROMEDIAR")) {
			try {
				double n1 = marcoGrafico.leerDatoDecimal("Ingrese nota 1:");
				double n2 = marcoGrafico.leerDatoDecimal("Ingrese nota 2:");
				double n3 = marcoGrafico.leerDatoDecimal("Ingrese nota 3:");
				double n4 = marcoGrafico.leerDatoDecimal("Ingrese nota 4:");
				
				double promedio = motorLogico.calcularPromedioNotas(n1, n2, n3, n4);
				JOptionPane.showMessageDialog(marcoGrafico, "Farid, tu promedio es: " + promedio);
			} catch (Exception error) {
				JOptionPane.showMessageDialog(marcoGrafico, "Error: Use numeros (ej: 4.5)");
			}
		} 
		
		else if (idComando.equals("INICIALES")) {
			JOptionPane.showMessageDialog(marcoGrafico, motorLogico.generarMatrizF());
			JOptionPane.showMessageDialog(marcoGrafico, motorLogico.generarMatrizE());
			JOptionPane.showMessageDialog(marcoGrafico, motorLogico.generarMatrizM());
			JOptionPane.showMessageDialog(marcoGrafico, motorLogico.generarMatrizR());
		}
	}
}