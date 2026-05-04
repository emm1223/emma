package co.edu.unbosque.controller;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Font;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.SwingConstants;
import javax.swing.border.EmptyBorder;

public class VistaPrincipal extends JFrame {

	private static final long serialVersionUID = 1L;
	private JPanel contentPane;

	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					VistaPrincipal frame = new VistaPrincipal();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	public VistaPrincipal() {
		setTitle("CIBERSEGURIDAD - UNIVERSIDAD DEL BOSQUE");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 778, 450);
		contentPane = new JPanel();
		contentPane.setBackground(new Color(15, 15, 15)); // Negro profundo
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(new BorderLayout(10, 10));
		
		// TÍTULO HACKER
		JLabel lblNewLabel = new JLabel("SYSTEM OVERRIDE: ESTACIÓN DE CIBERSEGURIDAD");
		lblNewLabel.setHorizontalAlignment(SwingConstants.CENTER);
		lblNewLabel.setFont(new Font("Monospaced", Font.BOLD, 22));
		lblNewLabel.setForeground(new Color(255, 50, 50)); // Rojo vibrante
		contentPane.add(lblNewLabel, BorderLayout.NORTH);
		
		// CONSOLA DE LOGS
		JTextArea areaLogs = new JTextArea();
		areaLogs.setEditable(false);
		areaLogs.setBackground(new Color(25, 5, 5)); // Rojo vino muy oscuro
		areaLogs.setForeground(new Color(255, 100, 100)); // Texto claro
		areaLogs.setFont(new Font("Monospaced", Font.PLAIN, 14));
		areaLogs.setText(
			" > [INFO] Inicializando entorno de Ingeniería de Sistemas...\n" +
			" > [INFO] Cargando módulos de Ciberseguridad...\n" +
			" > [OK] Conexión establecida con Universidad del Bosque.\n" +
			" > [USER] Farid Emmanuel: Acceso Concedido.\n" +
			" > \n" +
			" > [STATUS] USB 8GB Detectada en Unidad D:/\n" +
			" > [STATUS] Repositorio Git Sincronizado.\n" +
			" > \n" +
			" > Esperando comandos en la terminal..."
		);
		contentPane.add(areaLogs, BorderLayout.CENTER);

		// PIE DE PÁGINA
		JLabel lblFooter = new JLabel("MODO: OFFENSIVE SECURITY ACTIVE");
		lblFooter.setHorizontalAlignment(SwingConstants.RIGHT);
		lblFooter.setFont(new Font("Monospaced", Font.ITALIC, 12));
		lblFooter.setForeground(new Color(150, 0, 0));
		contentPane.add(lblFooter, BorderLayout.SOUTH);
	}
}