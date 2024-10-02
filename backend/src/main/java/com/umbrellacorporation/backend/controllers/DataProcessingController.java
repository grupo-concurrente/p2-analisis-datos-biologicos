package com.umbrellacorporation.backend.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@RestController
@RequestMapping("public/process-data")
public class DataProcessingController {

    @PostMapping
    public ResponseEntity<String> processData(@RequestParam int numThreads) {
        try {
            // Registrar el tiempo de inicio
            long startTime = System.currentTimeMillis();

            // Comando para ejecutar el script de Python
            String[] command = {"./venv/bin/python3", "./process_data.py", String.valueOf(numThreads)};

            // Ejecutar el script de Python
            Process process = Runtime.getRuntime().exec(command);

            // Esperar a que el script finalice
            int exitCode = process.waitFor();

            // Registrar el tiempo de finalización
            long endTime = System.currentTimeMillis();

            // Calcular el tiempo transcurrido en milisegundos
            long duration = endTime - startTime;
            double durationInSeconds = duration / 1000.0;

            if (exitCode == 0) {
                // Si el script se ejecuta correctamente, devolver el tiempo que tardó
                return ResponseEntity.ok(String.valueOf(durationInSeconds));
            } else {
                // Si algo falla, devolver un error
                return ResponseEntity.status(500).body("Error al ejecutar el script de Python.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Excepción al ejecutar el script: " + e.getMessage());
        }
    }
}
