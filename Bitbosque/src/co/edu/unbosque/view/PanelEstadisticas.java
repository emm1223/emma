package co.edu.unbosque.view;

import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;
import javax.swing.border.TitledBorder;
import javax.swing.border.EmptyBorder;
import javax.swing.border.CompoundBorder;

/**
 * Panel lateral encargado de mostrar las estadísticas en tiempo real.
 * Funciona como el "HUD" o panel de control del hacker, informando cuántos
 * movimientos le quedan, cuántos puertos lleva interceptados y el estado del
 * sigilo.
 * 
 * @author Farid Emmanuel Munayar Rincon
 */
public class PanelEstadisticas extends JPanel {

    private JLabel lblMovimientos;
    private JLabel lblPuertos;
    private JLabel lblSigilo;
    private JButton btnSigilo;

    /**
     * Constructor del panel. Organiza los elementos de arriba a abajo
     * en una sola columna con una rejilla (GridLayout) y le pone un borde
     * personalizado con título de color cian para que combine con el estilo
     * cibernético.
     */
    public PanelEstadisticas() {
        // 4 filas, 1 columna, y 10 píxeles de espacio entre componentes
        setLayout(new GridLayout(4, 1, 10, 10));
        setBackground(new Color(30, 30, 30));

        TitledBorder bordeTitulo = new TitledBorder("ESTADO DEL SISTEMA");
        bordeTitulo.setTitleColor(Color.CYAN);

        // Espaciado interno superior/inferior para centrar visualmente los elementos en
        // el panel
        EmptyBorder margenInterno = new EmptyBorder(80, 10, 80, 10);

        // Combina el borde con título y el margen transparente
        setBorder(new CompoundBorder(bordeTitulo, margenInterno));

        inicializarComponentes();
    }

    /**
     * Crea las etiquetas de texto con tipografía estilo código (Monospaced),
     * los añade a la interfaz con alineación centrada y configura el botón de
     * sigilo.
     */
    private void inicializarComponentes() {
        Font fuenteConsola = new Font("Monospaced", Font.BOLD, 14);

        // Contador de pasos restantes
        lblMovimientos = new JLabel("MOVIMIENTOS: 0", SwingConstants.CENTER);
        lblMovimientos.setForeground(Color.WHITE);
        lblMovimientos.setFont(fuenteConsola);
        add(lblMovimientos);

        // Contador de objetivos capturados
        lblPuertos = new JLabel("PUERTOS: 0 / 3", SwingConstants.CENTER);
        lblPuertos.setForeground(Color.WHITE);
        lblPuertos.setFont(fuenteConsola);
        add(lblPuertos);

        // Estado del bypass o protocolo invisible
        lblSigilo = new JLabel("SIGILO: DISPONIBLE", SwingConstants.CENTER);
        lblSigilo.setForeground(Color.CYAN);
        lblSigilo.setFont(fuenteConsola);
        add(lblSigilo);

        // Botón de acción para quemar la habilidad especial
        btnSigilo = new JButton("ACTIVAR SIGILO");
        btnSigilo.setActionCommand("ACTIVAR_SIGILO"); // ID de comando para el Controller
        btnSigilo.setBackground(Color.DARK_GRAY);
        btnSigilo.setForeground(Color.WHITE);
        btnSigilo.setFocusable(false); // Quita el molesto recuadro de foco al hacer clic
        add(btnSigilo);
    }

    /**
     * Refresca en pantalla los valores numéricos actuales entregados por el Modelo.
     * Si los movimientos bajan de un umbral crítico (10 o menos), el texto se tiñe
     * de rojo como alerta visual de peligro.
     * 
     * @param mov     Cantidad actual de movimientos que le quedan al script de
     *                ataque.
     * @param puertos Número de paquetes/puertos extraídos exitosamente.
     */
    public void actualizarDatos(int mov, int puertos) {
        lblMovimientos.setText("MOVIMIENTOS: " + mov);
        lblPuertos.setText("PUERTOS: " + puertos + " / 3");

        // Sistema defensivo visual: alerta de batería/pasos bajos
        if (mov <= 10) {
            lblMovimientos.setForeground(Color.RED);
        } else {
            lblMovimientos.setForeground(Color.WHITE);
        }
    }

    /**
     * Cambia las etiquetas y deshabilita el botón una vez que el usuario
     * decide quemar o activar su protocolo de sigilo en el turno actual.
     * 
     * @param activo True si la habilidad está operando ahora mismo, false si ya
     *               expiró por completo.
     */
    public void actualizarEstadoSigilo(boolean activo) {
        if (activo) {
            lblSigilo.setText("SIGILO: ACTIVO");
            lblSigilo.setForeground(Color.ORANGE);
            btnSigilo.setEnabled(false); // Apaga el botón para evitar múltiples clics accidentales
        } else {
            lblSigilo.setText("SIGILO: AGOTADO");
            lblSigilo.setForeground(Color.GRAY);
        }
    }

    /**
     * Permite al controlador enlazarse al botón para escuchar cuándo es presionado.
     */
    public JButton getBtnSigilo() {
        return btnSigilo;
    }
}