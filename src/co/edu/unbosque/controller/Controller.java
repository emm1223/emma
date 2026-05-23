package co.edu.unbosque.controller;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import co.edu.unbosque.model.Servidor;
import co.edu.unbosque.view.VentanaPrincipal;

/**
 * Clase controladora principal del sistema de infiltración.
 * Actúa como intermediaria entre la interfaz gráfica (Vista) y la lógica del
 * servidor (Modelo),
 * gestionando elp flujo de datos y respondiendo a las interacciones del usuario
 * mediante eventos.
 * <p>
 * Implementa {@link ActionListener} para la captura y procesamiento de comandos
 * de botones.
 * </p>
 * 
 * @author Farid Emmanuel Munayar Rincon
 * @version 1.0
 * @since 2026-05-22
 */
public class Controller implements ActionListener {

    /**
     * Marco gráfico principal que representa la vista del juego (Ventana
     * Principal).
     */
    private VentanaPrincipal ventanaPrincipal;

    /**
     * Motor lógico del juego que gestiona la simulación del servidor, la matriz y
     * las reglas.
     */
    private Servidor servidorDelJuego;

    /**
     * Constructor de la clase. Inicializa los componentes de la vista y el modelo
     * por defecto,
     * establece las conexiones de los eventos gráficos y hace visible la interfaz
     * del sistema.
     */
    public Controller() {
        ventanaPrincipal = new VentanaPrincipal();

        // Servidor por defecto inicializado temporalmente con dimensiones 10x10
        servidorDelJuego = new Servidor(10, 10);

        enlazarEventos();

        ventanaPrincipal.setVisible(true);
    }

    /**
     * Registra los escuchadores de eventos (listeners) en los diferentes
     * componentes
     * y paneles interactivos expuestos por la vista principal.
     */
    public void enlazarEventos() {
        // Evento del panel de configuración inicial
        ventanaPrincipal.getPanelConfiguracion().getBtnIniciar().addActionListener(this);

        // Eventos para el control del movimiento en el tablero
        ventanaPrincipal.getPanelTablero().getBtnMoverArriba().addActionListener(this);
        ventanaPrincipal.getPanelTablero().getBtnMoverAbajo().addActionListener(this);
        ventanaPrincipal.getPanelTablero().getBtnMoverIzquierda().addActionListener(this);
        ventanaPrincipal.getPanelTablero().getBtnMoverDerecha().addActionListener(this);

        // Evento para activar habilidades o mecánicas especiales
        ventanaPrincipal.getPanelEstadisticas().getBtnSigilo().addActionListener(this);
    }

    /**
     * Atiende y despacha todas las acciones generadas por los botones de la
     * interfaz gráfica.
     * Evalúa el comando de acción asociado y ejecuta el proceso correspondiente
     * como:
     * iniciar el juego con validaciones, activar el modo sigilo o direccionar los
     * movimientos.
     * 
     * @param e El evento de acción capturado por el componente gráfico.
     */
    @Override
    public void actionPerformed(ActionEvent e) {
        String comando = e.getActionCommand();

        // Bloque para procesar el inicio del juego y creación del tablero
        if (comando.equals("INICIAR_JUEGO")) {
            try {
                int filas = ventanaPrincipal.getPanelConfiguracion().leerFilas();
                int columnas = ventanaPrincipal.getPanelConfiguracion().leerColumnas();
                String dificultad = ventanaPrincipal.getPanelConfiguracion().leerDificultad();

                // Validación de límites del escenario según requisitos de estabilidad
                if (filas >= 5 && filas <= 20 && columnas >= 5 && columnas <= 20) {

                    servidorDelJuego = new Servidor(filas, columnas);
                    servidorDelJuego.generarEscenario(dificultad);

                    ventanaPrincipal.getPanelTablero().crearTablero(filas, columnas);
                    ventanaPrincipal.getPanelTablero().actualizarTablero(servidorDelJuego.getMatriz());

                    ventanaPrincipal.getPanelEstadisticas().actualizarDatos(
                            servidorDelJuego.getMovimientosRestantes(),
                            servidorDelJuego.getPuertosVisitados());

                    ventanaPrincipal.mostrarPanelJuego();
                    ventanaPrincipal.getVentanaMensajes()
                            .mostrarInformacion("Infiltración iniciada. ¡Buena suerte, Farid!");
                } else {
                    ventanaPrincipal.getVentanaMensajes().mostrarError("Dimensiones inválidas (mínimo 5, máximo 20).");
                }
            } catch (NumberFormatException error) {
                ventanaPrincipal.getVentanaMensajes()
                        .mostrarError("Por favor, ingrese solo números en las dimensiones.");
            }
        }

        // Bloque de procesamiento de la mecánica especial de sigilo
        else if (comando.equals("ACTIVAR_SIGILO")) {
            if (servidorDelJuego.isSigiloDisponible()) {
                servidorDelJuego.activarModoSigilo();
                ventanaPrincipal.getPanelEstadisticas().actualizarEstadoSigilo(true);
                ventanaPrincipal.getVentanaMensajes()
                        .mostrarInformacion("MODO SIGILO ACTIVO: Los antivirus no te detectarán en el próximo paso.");
            } else {
                ventanaPrincipal.getVentanaMensajes().mostrarError("El modo sigilo ya no está disponible.");
            }
        }

        // Bloques de dirección para el movimiento dentro de la matriz del Servidor
        else if (comando.equals("ARRIBA")) {
            procesarMovimiento("ARRIBA");
        } else if (comando.equals("ABAJO")) {
            procesarMovimiento("ABAJO");
        } else if (comando.equals("IZQUIERDA")) {
            procesarMovimiento("IZQUIERDA");
        } else if (comando.equals("DERECHA")) {
            procesarMovimiento("DERECHA");
        }
    }

    /**
     * Gestiona la ejecución lógica de un movimiento en la dirección especificada,
     * actualizando de manera inmediata los componentes gráficos de la interfaz
     * (tablero y estadísticas).
     * <p>
     * Evalúa las condiciones de finalización (victoria o derrota) tras efectuar la
     * acción
     * y consolida el registro (log final) del sistema en caso de término.
     * </p>
     * 
     * @param direccion La dirección del movimiento pretendido ("ARRIBA", "ABAJO",
     *                  "IZQUIERDA", "DERECHA").
     */
    private void procesarMovimiento(String direccion) {
        boolean pudoMoverse = servidorDelJuego.intentarMovimiento(direccion);

        if (pudoMoverse) {
            ventanaPrincipal.getPanelTablero().actualizarTablero(servidorDelJuego.getMatriz());

            ventanaPrincipal.getPanelEstadisticas().actualizarDatos(
                    servidorDelJuego.getMovimientosRestantes(),
                    servidorDelJuego.getPuertosVisitados());

            // Verificación del estado final de la simulación
            if (servidorDelJuego.verificarVictoria()) {
                servidorDelJuego.guardarLogFinal();
                ventanaPrincipal.getVentanaMensajes().mostrarVictoria("Farid",
                        servidorDelJuego.getMovimientosRestantes());
                System.exit(0);
            } else if (servidorDelJuego.verificarDerrota()) {
                servidorDelJuego.guardarLogFinal();
                ventanaPrincipal.getVentanaMensajes().mostrarDerrota();
                System.exit(0);
            }
        } else {
            ventanaPrincipal.getVentanaMensajes()
                    .mostrarError("Movimiento bloqueado por Firewall o límites del servidor.");
        }
    }
}