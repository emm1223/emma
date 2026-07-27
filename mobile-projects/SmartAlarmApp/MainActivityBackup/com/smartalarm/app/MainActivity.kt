package com.smartalarm.app

import android.os.Build
import android.os.PowerManager
import android.view.WindowManager
import androidx.annotation.NonNull
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.smartalarm.app/alarm"
    private lateinit var wakeLock: PowerManager.WakeLock

    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL)
            .setMethodCallHandler { call, result ->
                when (call.method) {
                    "wakeUp" -> {
                        wakeUpDevice()
                        result.success("Device woken up")
                    }
                    "keepScreenOn" -> {
                        keepScreenOn()
                        result.success("Screen kept on")
                    }
                    "releaseWakeLock" -> {
                        releaseWakeLock()
                        result.success("WakeLock released")
                    }
                    else -> result.notImplemented()
                }
            }
    }

    /**
     * Wake up device from Doze Mode (Sleep)
     * Enciende la pantalla, desbloquea el dispositivo
     */
    private fun wakeUpDevice() {
        val pm = applicationContext.getSystemService(POWER_SERVICE) as PowerManager
        
        // Acquire wake lock for 10 seconds
        wakeLock = pm.newWakeLock(
            PowerManager.FULL_WAKE_LOCK or PowerManager.ACQUIRE_CAUSES_WAKEUP,
            "SmartAlarm::WakeLock"
        )
        wakeLock.acquire(10000) // 10 seconds

        // Set window flags to show on lock screen and turn screen on
        window.addFlags(
            WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON or
            WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
            WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON or
            WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD
        )

        // Additional: Disable keyguard (on older Android versions)
        val keyguardManager = applicationContext.getSystemService(KEYGUARD_SERVICE) as android.app.KeyguardManager
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            keyguardManager.requestDismissKeyguard(this, null)
        }
    }

    /**
     * Keep screen on while alarm is active
     */
    private fun keepScreenOn() {
        window.addFlags(
            WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON or
            WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
        )
    }

    /**
     * Release wake lock when alarm is dismissed
     */
    private fun releaseWakeLock() {
        if (::wakeLock.isInitialized && wakeLock.isHeld) {
            wakeLock.release()
        }
        window.clearFlags(
            WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON or
            WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
            WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
        )
    }
}
