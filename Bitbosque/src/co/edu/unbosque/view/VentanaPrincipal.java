package co.edu.unbosque.view;

import java.awt.BorderLayout;
import java.awt.CardLayout;
import javax.swing.JFrame;
import javax.swing.JPanel;

/**
 * Ventana principal y contenedor maestro de la interfaz gráfica.
 * Hereda de JFrame y se encarga de armar la estructura global de la app,
 * controlando el intercambio de pantallas (configuración y juego) mediante
 * un sistema de tarjetas (CardLayout).
 * 
 * @author Farid Emmanuel Munayar Rincon
 */
public class VentanaPrincipal extends JFrame {

    private PanelConfiguracion panelConfig;
    private PanelTablero panelTablero;
    private PanelEstadisticas panelStats;
    private VentanaMensajes ventanaMensajes;
    private JPanel contenedorPrincipal;
    private CardLayout cartas;

    /**
     * Constructor de la ventana. Configura los parámetros básicos del marco,
     * como el título personalizado, el tamaño inicial de 900x700 píxeles,
     * el cierre completo del programa al salir y la centra en la pantalla.
     */
    public VentanaPrincipal() {
        setTitle("Cyber-Infiltrator - Sistema de Seguridad Bitbosque");
        setSize(900, 700);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null); // Centra la ventana automáticamente en el monitor
        setResizable(false); // Congela el tamaño para que no se descuadren los layouts absolutos

        inicializarComponentes();
    }

    /**
     * Instancia todos los paneles y ventanas de mensajes, y los organiza.
     * Crea un contenedor intermedio para el juego uniendo el tablero en el centro
     * y las estadísticas a la derecha usando un BorderLayout. Luego, añade todo
     * al CardLayout maestro bajo etiquetas clave ("CONFIG" y "JUEGO").
     */
    private void inicializarComponentes() {
        cartas = new CardLayout();
        contenedorPrincipal = new JPanel(cartas);

        // Creación de las piezas visuales
        panelConfig = new PanelConfiguracion();
        panelTablero = new PanelTablero();
        panelStats = new PanelEstadisticas();
        ventanaMensajes = new VentanaMensajes();

        // Ensamble de la pantalla de juego: Tablero en el centro y HUD a la derecha
        JPanel contenedorJuego = new JPanel(new BorderLayout());
        contenedorJuego.add(panelTablero, BorderLayout.CENTER);
        contenedorJuego.add(panelStats, BorderLayout.EAST);

        // Registro de pantallas en el manejador de tarjetas
        contenedorPrincipal.add(panelConfig, "CONFIG");
        contenedorPrincipal.add(contenedorJuego, "JUEGO");

        // Añade el contenedor maestro al marco del JFrame
        add(contenedorPrincipal);
    }

    /**
     * Ordena al CardLayout hacer un "switch" o cambio de frente para mostrar 
     * la pantalla con el tablero y las estadísticas de infiltración.
     */
    public void mostrarPanelJuego() {
        cartas.show(contenedorPrincipal, "JUEGO");
    }

    /**
     * Ordena al CardLayout regresar a la pantalla inicial donde se digitan 
     * las dimensiones del servidor y el nivel de seguridad.
     */
    public void mostrarPanelConfiguracion() {
        cartas.show(contenedorPrincipal, "CONFIG");
    }

    // Getters indispensables para que el Controller pueda interactuar con cada sección
    
    public PanelConfiguracion getPanelConfiguracion() {
        return panelConfig;
    }

    public PanelTablero getPanelTablero() {
        return panelTablero;
    }

    public PanelEstadisticas getPanelEstadisticas() {
        return panelStats;
    }

    public VentanaMensajes getVentanaMensajes() {
        return ventanaMensajes;
    }
}