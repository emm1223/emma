package co.edu.unbosque.view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.GridLayout;
import java.awt.Image;
import java.io.File;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.LineBorder;
import co.edu.unbosque.model.Casilla;

/**
 * Panel del tablero principal del juego.
 * Dibuja la cuadrícula del servidor usando etiquetas (JLabel) con íconos e 
 * incorpora una botonera con flechas direccionales en la parte inferior para 
 * controlar el desplazamiento del script en tiempo real.
 * 
 * @author Farid Emmanuel Munayar Rincon
 */
public class PanelTablero extends JPanel {

    private JLabel[][] celdas;
    private JPanel pnlGrid; 
    private JPanel pnlControles; 
    
    private JButton btnMoverArriba, btnMoverAbajo, btnMoverIzquierda, btnMoverDerecha;
    private ImageIcon imgHacker, imgPaquete, imgFirewall, imgAntivirus, imgEscaner, imgNodo, imgPuerto;

    /**
     * Constructor del panel. Divide la pantalla con un BorderLayout:
     * en el centro ubica el mapa dinámico y abajo prepara los controles de movimiento.
     */
    public PanelTablero() {
        setLayout(new BorderLayout()); 
        setBackground(Color.BLACK);
        setBorder(new LineBorder(Color.DARK_GRAY));
        
        // Contenedor principal donde se creará la rejilla de JLabels
        pnlGrid = new JPanel();
        pnlGrid.setBackground(Color.BLACK);
        add(pnlGrid, BorderLayout.CENTER);
        
        inicializarBotones();
        cargarRecursos();
    }

    /**
     * Crea los botones direccionales usando flechas clásicas de consola (▲, ▼, ◀, ▶) 
     * y los organiza en una pequeña rejilla de 2x3 simulando una cruz de control.
     */
    private void inicializarBotones() {
        pnlControles = new JPanel(new GridLayout(2, 3)); 
        pnlControles.setBackground(new Color(30, 30, 30));

        btnMoverArriba = new JButton("▲");
        btnMoverArriba.setActionCommand("ARRIBA");
        
        btnMoverAbajo = new JButton("▼");
        btnMoverAbajo.setActionCommand("ABAJO");
        
        btnMoverIzquierda = new JButton("◀");
        btnMoverIzquierda.setActionCommand("IZQUIERDA");
        
        btnMoverDerecha = new JButton("▶");
        btnMoverDerecha.setActionCommand("DERECHA");

        // Espacios vacíos (JLabel vacíos) para darle forma de cruz a la botonera
        pnlControles.add(new JLabel("")); 
        pnlControles.add(btnMoverArriba);
        pnlControles.add(new JLabel("")); 
        pnlControles.add(btnMoverIzquierda);
        pnlControles.add(btnMoverAbajo);
        pnlControles.add(btnMoverDerecha);

        add(pnlControles, BorderLayout.SOUTH); 
    }

    public JButton getBtnMoverArriba() { return btnMoverArriba; }
    public JButton getBtnMoverAbajo() { return btnMoverAbajo; }
    public JButton getBtnMoverIzquierda() { return btnMoverIzquierda; }
    public JButton getBtnMoverDerecha() { return btnMoverDerecha; }

    /**
     * Carga las imágenes de disco y las escala de una vez para que encajen 
     * perfectamente dentro de las casillas del juego.
     */
    private void cargarRecursos() {
        imgHacker = ajustarImagen("imagenes/hacker.png");
        imgPaquete = ajustarImagen("imagenes/paquete.png");
        imgFirewall = ajustarImagen("imagenes/firewall.png");
        imgAntivirus = ajustarImagen("imagenes/antivirus.png");
        imgEscaner = ajustarImagen("imagenes/escaner.png");
        imgNodo = ajustarImagen("imagenes/nodo.png");
        imgPuerto = ajustarImagen("imagenes/puerto.png");
    }

    /**
     * Busca una imagen en la ruta indicada, verifica si físicamente existe 
     * para evitar caídas del programa, y la redimensiona a un tamaño fijo de 40x40.
     * 
     * @param ruta El camino relativo hacia el archivo png.
     * @return El objeto ImageIcon listo para usar, o null si hubo algún fallo.
     */
    private ImageIcon ajustarImagen(String ruta) {
        try {
            File f = new File(ruta);
            if(!f.exists()) {
                System.err.println("Imagen no encontrada: " + f.getAbsolutePath());
                return null;
            }
            ImageIcon icono = new ImageIcon(ruta);
            // Escala suave (SMOOTH) para mantener la nitidez del pixelart o íconos
            Image img = icono.getImage().getScaledInstance(40, 40, Image.SCALE_SMOOTH);
            return new ImageIcon(img);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Genera dinámicamente la cuadrícula visual de celdas según el tamaño 
     * que haya elegido el usuario en el panel de configuración.
     * 
     * @param filas    Cantidad de celdas verticales.
     * @param columnas Cantidad de celdas horizontales.
     */
    public void crearTablero(int filas, int columnas) {
        pnlGrid.removeAll(); // Borra el mapa anterior por si reinician la partida
        pnlGrid.setLayout(new GridLayout(filas, columnas));
        this.celdas = new JLabel[filas][columnas];

        for (int i = 0; i < filas; i++) {
            for (int j = 0; j < columnas; j++) {
                celdas[i][j] = new JLabel();
                celdas[i][j].setOpaque(true); // Permite cambiar el color de fondo del JLabel
                celdas[i][j].setBackground(new Color(10, 10, 10));
                celdas[i][j].setBorder(new LineBorder(Color.DARK_GRAY));
                celdas[i][j].setHorizontalAlignment(JLabel.CENTER); // Centra los iconos
                pnlGrid.add(celdas[i][j]);
            }
        }
        pnlGrid.revalidate(); // Refresca la estructura del layout en caliente
        pnlGrid.repaint();    // Vuelve a pintar los componentes en la pantalla
    }

    /**
     * Recorre la matriz lógica del Modelo y refresca la interfaz gráfica colocando 
     * los íconos correspondientes y pintando de verde las casillas ya visitadas.
     * 
     * @param matriz La estructura bidimensional de objetos Casilla del Modelo.
     */
    public void actualizarTablero(Casilla[][] matriz) {
        if (celdas == null) return; 

        for (int i = 0; i < matriz.length; i++) {
            for (int j = 0; j < matriz[i].length; j++) {
                String tipo = matriz[i][j].getTipo();
                
                // Efecto de rastro digital por donde pasa el script hacker
                if (matriz[i][j].isTieneRastro()) {
                    celdas[i][j].setBackground(new Color(0, 50, 0));
                } else {
                    celdas[i][j].setBackground(new Color(10, 10, 10));
                }

                // Asigna el ícono gráfico según el tipo lógico de la casilla
                switch (tipo) {
                    case "SCRIPT": celdas[i][j].setIcon(imgHacker); break;
                    case "PAQUETE": celdas[i][j].setIcon(imgPaquete); break;
                    case "FIREWALL": celdas[i][j].setIcon(imgFirewall); break;
                    case "ANTIVIRUS": celdas[i][j].setIcon(imgAntivirus); break;
                    case "ESCANER": celdas[i][j].setIcon(imgEscaner); break;
                    case "NODO": celdas[i][j].setIcon(imgNodo); break;
                    case "PUERTO": celdas[i][j].setIcon(imgPuerto); break;
                    default: celdas[i][j].setIcon(null); break; // Casilla vacía
                }
            }
        }
        pnlGrid.repaint(); // Redibuja el mapa actualizado
    }
}