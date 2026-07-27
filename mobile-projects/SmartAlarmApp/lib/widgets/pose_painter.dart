import 'package:flutter/material.dart';
import 'package:google_mlkit_pose_detection/google_mlkit_pose_detection.dart';

/// CustomPainter para dibujar el esqueleto de pose detection
class PosePainter extends CustomPainter {
  final List<Pose> poses;
  final Size imageSize;
  final bool showConfidence;

  PosePainter({
    required this.poses,
    required this.imageSize,
    this.showConfidence = false,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.0
      ..color = Colors.cyan;

    final pointPaint = Paint()
      ..style = PaintingStyle.fill
      ..strokeWidth = 8.0;

    final scaleX = size.width / imageSize.width;
    final scaleY = size.height / imageSize.height;

    for (final pose in poses) {
      // Dibujar conexiones entre puntos (huesos)
      _drawSkeleton(canvas, pose, paint, scaleX, scaleY);

      // Dibujar puntos (articulaciones)
      _drawLandmarks(canvas, pose, pointPaint, scaleX, scaleY);
    }
  }

  /// Dibuja las conexiones entre puntos
  void _drawSkeleton(
    Canvas canvas,
    Pose pose,
    Paint paint,
    double scaleX,
    double scaleY,
  ) {
    // Definir conexiones entre puntos (esqueleto)
    const List<List<int>> connections = [
      // Cabeza
      [0, 1], [1, 2], [2, 3], [3, 7],
      [0, 4], [4, 5], [5, 6], [6, 8],
      // Brazos
      [9, 10], [10, 11], [11, 12], [11, 13], [13, 15],
      [12, 14], [14, 16],
      // Torso
      [11, 23], [12, 24],
      // Piernas
      [23, 25], [25, 27], [27, 29], [29, 31],
      [24, 26], [26, 28], [28, 30], [30, 32],
      [23, 24],
    ];

    for (final connection in connections) {
      final from = pose.landmarks[connection[0]];
      final to = pose.landmarks[connection[1]];

      if (from.confidence > 0.5 && to.confidence > 0.5) {
        canvas.drawLine(
          Offset(from.x * scaleX, from.y * scaleY),
          Offset(to.x * scaleX, to.y * scaleY),
          paint,
        );
      }
    }
  }

  /// Dibuja los puntos (articulaciones)
  void _drawLandmarks(
    Canvas canvas,
    Pose pose,
    Paint paint,
    double scaleX,
    double scaleY,
  ) {
    for (final landmark in pose.landmarks) {
      if (landmark.confidence > 0.5) {
        // Color según confianza
        final color = landmark.confidence > 0.7 ? Colors.green : Colors.yellow;
        paint.color = color;

        final x = landmark.x * scaleX;
        final y = landmark.y * scaleY;

        // Dibujar círculo
        canvas.drawCircle(Offset(x, y), 5.0, paint);

        // Dibujar confianza si está habilitado
        if (showConfidence) {
          final textPainter = TextPainter(
            text: TextSpan(
              text: '${(landmark.confidence * 100).toStringAsFixed(0)}%',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 10.0,
              ),
            ),
            textDirection: TextDirection.ltr,
          );
          textPainter.layout();
          textPainter.paint(
            canvas,
            Offset(x + 5, y - 10),
          );
        }
      }
    }
  }

  @override
  bool shouldRepaint(PosePainter oldDelegate) {
    return oldDelegate.poses != poses;
  }
}
