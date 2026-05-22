package co.edu.unbosque.view;

import java.awt.Color;
import java.awt.Font;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

/**
 * Panel de configuración inicial de la interfaz gráfica.
 * Aquí es donde el usuario ingresa el tamaño del mapa y el nivel de seguridad 
 * (dificultad) antes de lanzar el script de infiltración. Tiene toda la onda 
 * de una consola terminal oscura con letras verdes.
 * 
 * @author Farid Emmanuel Munayar Rincon
 */
public class PanelConfiguracion extends JPanel {

    private JLabel lblTitulo;
    private JLabel lblFilas;
    private JLabel lblColumnas;
    private JLabel lblDificultad;
    private JTextField txtFilas;
    private JTextField txtColumnas;
    private JComboBox<String> cbDificultad;
    private JButton btnIniciar;

    /**
     * Constructor del panel. Configura el fondo oscuro tipo terminal 
     * y llama a la creación de los componentes visuales. Usamos layout nulo 
     * para acomodar todo con coordenadas exactas en la pantalla.
     */
    public PanelConfiguracion() {
        setLayout(null);
        setBackground(new Color(20, 20, 20)); 
        inicializarComponentes();
    }

    /**
     * Crea, decora y acomoda cada etiqueta, caja de texto, combo y botón 
     * en el panel usando coordenadas absolutas (setBounds).
     */
    private void inicializarComponentes() {
        // Título principal con fuente Monospaced para que parezca código de consola
        lblTitulo = new JLabel("CONFIGURACIÓN DE INFILTRACIÓN");
        lblTitulo.setFont(new Font("Monospaced", Font.BOLD, 18));
        lblTitulo.setForeground(Color.GREEN);
        lblTitulo.setBounds(50, 30, 400, 30);
        add(lblTitulo);

        // Configuración de filas
        lblFilas = new JLabel("Filas (5-20):");
        lblFilas.setForeground(Color.WHITE);
        lblFilas.setBounds(50, 100, 150, 25);
        add(lblFilas);

        txtFilas = new JTextField();
        txtFilas.setBounds(200, 100, 100, 25);
        add(txtFilas);

        // Configuración de columnas
        lblColumnas = new JLabel("Columnas (5-20):");
        lblColumnas.setForeground(Color.WHITE);
        lblColumnas.setBounds(50, 150, 150, 25);
        add(lblColumnas);

        txtColumnas = new JTextField();
        txtColumnas.setBounds(200, 150, 100, 25);
        add(txtColumnas);

        // Configuración del nivel de seguridad (dificultad)
        lblDificultad = new JLabel("Nivel Seguridad:");
        lblDificultad.setForeground(Color.WHITE);
        lblDificultad.setBounds(50, 200, 150, 25);
        add(lblDificultad);

        String[] opciones = { "Baja", "Media", "Alta" };
        cbDificultad = new JComboBox<>(opciones);
        cbDificultad.setBounds(200, 200, 100, 25);
        add(cbDificultad);

        // Botón para arrancar el sistema
        btnIniciar = new JButton("INICIAR SISTEMA");
        btnIniciar.setActionCommand("INICIAR_JUEGO"); // El ID que escucha el controlador
        btnIniciar.setBounds(100, 300, 200, 40);
        btnIniciar.setBackground(Color.DARK_GRAY);
        btnIniciar.setForeground(Color.GREEN);
        add(btnIniciar);
    }

    /**
     * Toma el texto ingresado en la caja de filas y lo convierte a un número entero.
     * Si el usuario escribe letras, lanzará un error que el controlador atrapará.
     * 
     * @return El número de filas digitado por el usuario.
     * @throws NumberFormatException Si el texto no se puede transformar a número.
     */
    public int leerFilas() throws NumberFormatException {
        return Integer.parseInt(txtFilas.getText());
    }

    /**
     * Toma el texto ingresado en la caja de columnas y lo convierte a un número entero.
     * Igual que el anterior, puede lanzar error si escriben texto normal.
     * 
     * @return El número de columnas digitado por el usuario.
     * @throws NumberFormatException Si el texto no es un número válido.
     */
    public int leerColumnas() throws NumberFormatException {
        return Integer.parseInt(txtColumnas.getText());
    }

    /**
     * Saca la opción seleccionada en el menú desplegable (Baja, Media o Alta).
     * 
     * @return El nivel de seguridad elegido en formato String.
     */
    public String leerDificultad() {
        return cbDificultad.getSelectedItem().toString();
    }

    /**
     * Le da acceso al controlador para que pueda poner a escuchar el botón de inicio.
     */
    public JButton getBtnIniciar() {
        return btnIniciar;
    }
}