package co.edu.unbosque.view;

import java.awt.Color;
import java.awt.Font;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

/**
 * Panel de interfaz gráfica dedicado a la parametrización inicial del sistema.
 * <p>
 * Permite al usuario definir las dimensiones del área de operaciones (filas y columnas)
 * y el nivel de contramedidas de seguridad antes de iniciar la simulación de infiltración.
 * Mantiene una identidad visual cohesiva con el entorno oscuro y el esquema de color cian 
 * del panel de estado principal.
 * </p>
 * * @author Farid Emmanuel Munayar Rincon
 * @version 1.2
 */
public class PanelConfiguracion extends JPanel {

    /** Etiqueta de título principal de la pantalla de configuración. */
    private JLabel lblTitulo;
    
    /** Etiqueta indicadora para la entrada de filas. */
    private JLabel lblFilas;
    
    /** Etiqueta indicadora para la entrada de columnas. */
    private JLabel lblColumnas;
    
    /** Etiqueta indicadora para la selección del nivel de seguridad. */
    private JLabel lblDificultad;
    
    /** Campo de entrada de texto para especificar la cantidad de filas. */
    private JTextField txtFilas;
    
    /** Campo de entrada de texto para especificar la cantidad de columnas. */
    private JTextField txtColumnas;
    
    /** Componente de selección desplegable para establecer el nivel de seguridad. */
    private JComboBox<String> cbDificultad;
    
    /** Botón encargado de confirmar los parámetros y disparar la ejecución del sistema. */
    private JButton btnIniciar;

    // --- PALETA DE COLORES CROMÁTICAMENTE SINCRONIZADA ---
    
    /** Tono gris oscuro base extraído directamente del fondo del tablero operativo. */
    private final Color GRIS_FONDO_TABLERO = new Color(33, 35, 37);
    
    /** Tono gris medio utilizado para unificar el estilo de los bordes con la rejilla del mapa. */
    private final Color GRIS_REJILLA_MAPA  = new Color(54, 57, 61);
    
    /** Tono cian/azul eléctrico de alto contraste para destacar títulos, cursores y enfoques. */
    private final Color AZUL_CIBERNETICO   = new Color(0, 230, 230);

    /**
     * Instancia un nuevo panel de configuración.
     * Define el posicionamiento absoluto (Layout nulo) y establece el color de fondo 
     * base de forma unificada con el tablero de control.
     */
    public PanelConfiguracion() {
        setLayout(null);
        setBackground(GRIS_FONDO_TABLERO); 
        inicializarComponentes();
    }

    /**
     * Inicializa, posiciona y aplica los estilos visuales ciberpunk/terminal 
     * a cada uno de los componentes de la interfaz de usuario.
     */
    private void inicializarComponentes() {
        // Fuentes monospaced estables para estilo terminal
        Font fontTitulo = new Font("Monospaced", Font.BOLD, 18);
        Font fontLabels = new Font("Monospaced", Font.BOLD, 14);
        Font fontInputs = new Font("Monospaced", Font.PLAIN, 13);

        // 1. Título principal
        lblTitulo = new JLabel("CONFIGURACIÓN DE INFILTRACIÓN");
        lblTitulo.setFont(fontTitulo);
        lblTitulo.setForeground(AZUL_CIBERNETICO);
        lblTitulo.setBounds(50, 30, 400, 30);
        add(lblTitulo);

        // 2. Parámetro: Filas
        lblFilas = new JLabel("Filas (5-20):");
        lblFilas.setFont(fontLabels);
        lblFilas.setForeground(Color.WHITE);
        lblFilas.setBounds(50, 100, 150, 25);
        add(lblFilas);

        txtFilas = new JTextField();
        txtFilas.setFont(fontInputs);
        txtFilas.setBackground(GRIS_FONDO_TABLERO); 
        txtFilas.setForeground(Color.WHITE);
        txtFilas.setCaretColor(AZUL_CIBERNETICO); 
        txtFilas.setHorizontalAlignment(JTextField.CENTER);
        txtFilas.setBorder(BorderFactory.createLineBorder(GRIS_REJILLA_MAPA, 1));
        txtFilas.setBounds(200, 100, 100, 25);
        add(txtFilas);

        // 3. Parámetro: Columnas
        lblColumnas = new JLabel("Columnas (5-20):");
        lblColumnas.setFont(fontLabels);
        lblColumnas.setForeground(Color.WHITE);
        lblColumnas.setBounds(50, 150, 150, 25);
        add(lblColumnas);

        txtColumnas = new JTextField();
        txtColumnas.setFont(fontInputs);
        txtColumnas.setBackground(GRIS_FONDO_TABLERO);
        txtColumnas.setForeground(Color.WHITE);
        txtColumnas.setCaretColor(AZUL_CIBERNETICO);
        txtColumnas.setHorizontalAlignment(JTextField.CENTER);
        txtColumnas.setBorder(BorderFactory.createLineBorder(GRIS_REJILLA_MAPA, 1));
        txtColumnas.setBounds(200, 150, 100, 25);
        add(txtColumnas);

        // 4. Parámetro: Dificultad
        lblDificultad = new JLabel("Nivel Seguridad:");
        lblDificultad.setFont(fontLabels);
        lblDificultad.setForeground(Color.WHITE);
        lblDificultad.setBounds(50, 200, 150, 25);
        add(lblDificultad);

        String[] opciones = { "Baja", "Media", "Alta" };
        cbDificultad = new JComboBox<>(opciones);
        cbDificultad.setFont(fontInputs);
        cbDificultad.setBackground(GRIS_FONDO_TABLERO);
        cbDificultad.setForeground(Color.WHITE);
        cbDificultad.setFocusable(false);
        cbDificultad.setBorder(BorderFactory.createLineBorder(GRIS_REJILLA_MAPA, 1));
        cbDificultad.setBounds(200, 200, 100, 25);
        add(cbDificultad);

        // 5. Botón de Infiltración
        btnIniciar = new JButton("INICIAR SISTEMA");
        btnIniciar.setActionCommand("INICIAR_JUEGO"); 
        btnIniciar.setFont(fontLabels);
        btnIniciar.setBackground(GRIS_REJILLA_MAPA); 
        btnIniciar.setForeground(Color.WHITE);
        btnIniciar.setFocusPainted(false);
        btnIniciar.setBorder(BorderFactory.createLineBorder(AZUL_CIBERNETICO, 1)); 
        btnIniciar.setBounds(100, 300, 200, 40);
        add(btnIniciar);
    }

    /**
     * Recupera y procesa el número de filas ingresado en la interfaz.
     * * @return El número entero que representa las filas configuradas por el usuario.
     * @throws NumberFormatException Si el contenido del campo de texto no posee un formato numérico válido.
     */
    public int leerFilas() throws NumberFormatException {
        return Integer.parseInt(txtFilas.getText().trim());
    }

    /**
     * Recupera y procesa el número de columnas ingresado en la interfaz.
     * * @return El número entero que representa las columnas configuradas por el usuario.
     * @throws NumberFormatException Si el contenido del campo de texto no posee un formato numérico válido.
     */
    public int leerColumnas() throws NumberFormatException {
        return Integer.parseInt(txtColumnas.getText().trim());
    }

    /**
     * Obtiene el valor textual de la dificultad seleccionada en el menú desplegable.
     * * @return Una cadena de caracteres (String) que indica el nivel de seguridad establecido ("Baja", "Media" o "Alta").
     */
    public String leerDificultad() {
        return cbDificultad.getSelectedItem().toString();
    }

    /**
     * Proporciona el acceso al componente de activación gráfica (botón de inicio)
     * para permitir el acoplamiento de eventos desde el controlador.
     * * @return La instancia del botón {@code btnIniciar}.
     */
    public JButton getBtnIniciar() {
        return btnIniciar;
    }
}