import 'package:flutter/material.dart';

/// Widget overlay para mostrar el contador de sentadillas y estado
class SquatCounterOverlay extends StatelessWidget {
  final int squatCount;
  final String statusMessage;
  final double kneeAngle;
  final bool bodyFullyVisible;

  const SquatCounterOverlay({
    Key? key,
    required this.squatCount,
    required this.statusMessage,
    required this.kneeAngle,
    required this.bodyFullyVisible,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final targetCount = 15;
    final progress = squatCount / targetCount;
    final isComplete = squatCount >= targetCount;

    return Stack(
      children: [
        // Fondo oscuro con transparencia
        Container(
          color: Colors.black.withOpacity(0.3),
        ),

        // Contador grande en el centro
        Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Número de sentadillas
              Text(
                '$squatCount',
                style: TextStyle(
                  fontSize: 120.0,
                  fontWeight: FontWeight.bold,
                  color: isComplete ? Colors.green : Colors.cyan,
                ),
              ),
              Text(
                '/ $targetCount',
                style: const TextStyle(
                  fontSize: 40.0,
                  color: Colors.white70,
                ),
              ),
              const SizedBox(height: 20),
              // Barra de progreso
              SizedBox(
                width: screenSize.width * 0.7,
                height: 12,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: LinearProgressIndicator(
                    value: progress.clamp(0.0, 1.0),
                    backgroundColor: Colors.grey[800],
                    valueColor: AlwaysStoppedAnimation<Color>(
                      isComplete ? Colors.green : Colors.cyan,
                    ),
                    minHeight: 12,
                  ),
                ),
              ),
            ],
          ),
        ),

        // Estado en la parte superior
        Positioned(
          top: 40,
          left: 0,
          right: 0,
          child: Center(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: bodyFullyVisible ? Colors.green : Colors.red,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                statusMessage,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ),

        // Ángulo de rodilla en la parte inferior izquierda
        Positioned(
          bottom: 40,
          left: 20,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.7),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.cyan, width: 2),
            ),
            child: Text(
              'Ángulo: ${kneeAngle.toStringAsFixed(1)}°',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 14,
                fontFamily: 'monospace',
              ),
            ),
          ),
        ),

        // Mensaje de éxito
        if (isComplete)
          Positioned(
            bottom: 100,
            left: 0,
            right: 0,
            child: Center(
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.green,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Column(
                  children: [
                    Icon(Icons.check_circle, size: 50, color: Colors.white),
                    SizedBox(height: 10),
                    Text(
                      '¡ALARMA DESACTIVADA!',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
      ],
    );
  }
}
