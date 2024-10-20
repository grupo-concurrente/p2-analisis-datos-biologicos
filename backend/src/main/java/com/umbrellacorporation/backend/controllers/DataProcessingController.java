package com.umbrellacorporation.backend.controllers;

import com.opencsv.CSVReader;
import com.umbrellacorporation.backend.models.BiologicalData;
import com.umbrellacorporation.backend.services.BiologicalDataService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicIntegerArray;

@RestController
@RequestMapping("public")
public class DataProcessingController {

    private final BiologicalDataService dataService;
    private AtomicIntegerArray percentages;

    @Autowired
    public DataProcessingController(BiologicalDataService dataService) {
        this.dataService = dataService;
        this.percentages = null;
    }

    @GetMapping("/biological-data")
    public List<BiologicalData> getAllData() {
        return dataService.getDataEntries();
    }

    @GetMapping("/processing-status")
    public ResponseEntity<?> getProcessingStatus() {
        try {
            // Leer el archivo JSON
            String filePath = "./data/progress.json";
            FileReader reader = new FileReader(filePath);
            JSONParser jsonParser = new JSONParser();
            Object obj = jsonParser.parse(reader);

            // Devolver el contenido del archivo como respuesta
            return ResponseEntity.ok(obj);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al obtener el progreso: " + e.getMessage());
        }
    }

    @PostMapping("/process-data")
    public ResponseEntity<String> processData(@RequestParam int numThreads) {
        try {
            
            // Comando para ejecutar el script de Python
            String[] command = {"./venv/bin/python3", "./process_data.py", String.valueOf(numThreads)};

            // Registrar el tiempo de inicio
            long startTime = System.currentTimeMillis();

            // Ejecutar el script de Python
            Process process = Runtime.getRuntime().exec(command);

            // Esperar a que el script finalice
            int exitCode = process.waitFor();

            // Si el script de Python se ejecuta correctamente, leer el CSV
            if (exitCode == 0) {
                // Registrar el tiempo de finalización
                long endTime = System.currentTimeMillis();
                long duration = endTime - startTime;
                double durationInSeconds = duration / 1000.0;
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

    // Método para sobrescribir el archivo de progreso
    private void resetProcessingStatus(int nThreads) {
        File file = new File("./data/progress.json");

        if (!file.exists()) {
            return; // Salir del método si el archivo no existe
        }

        try (FileWriter fileWriter = new FileWriter(file)) {
            // Crear un objeto JSON
            JSONObject jsonObject = new JSONObject();

            // Añadir cada chunk con un valor inicial de 0
            for (int i = 1; i <= nThreads; i++) {
                jsonObject.put("chunk_" + i, 0); // Establecer el progreso a 0
            }

            // Escribir el objeto JSON en el archivo
            fileWriter.write(jsonObject.toJSONString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @PostMapping("/save-data")
    public ResponseEntity<String> saveData(@RequestParam int numThreads) {
        try {
            resetProcessingStatus(numThreads);
            String csvFilePath = "./data/processed_data.csv";

            // Registrar el tiempo de inicio
            long startTime = System.currentTimeMillis();

            // Guardar en la BBDD
            readCsvAndSaveToDatabase(csvFilePath, numThreads);

            // Registrar el tiempo de finalización
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            double durationInSeconds = duration / 1000.0;

            return ResponseEntity.ok(String.valueOf(durationInSeconds));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Excepción al ejecutar el script: " + e.getMessage());
        }
    }

    private void readCsvAndSaveToDatabase(String csvFilePath, int numThreads) {
        List<BiologicalData> dataList = new ArrayList<>();

        try (CSVReader csvReader = new CSVReader(new FileReader(csvFilePath))) {
            String[] values;
            csvReader.readNext(); // Saltar la primera fila si tiene encabezados

            // Leer cada fila del CSV
            while ((values = csvReader.readNext()) != null) {
                BiologicalData biologicalData = new BiologicalData();

                // Asignar valores a la entidad desde el CSV (ajusta según tu modelo)
                biologicalData.setGenusSpecies(Integer.parseInt(values[0]));
                biologicalData.setTimePeriod(Double.parseDouble(values[1]));
                biologicalData.setLocation(Integer.parseInt(values[2]));
                biologicalData.setZone(Integer.parseInt(values[3]));
                biologicalData.setCurrentCountry(Integer.parseInt(values[4]));
                biologicalData.setHabitat(Integer.parseInt(values[5]));
                biologicalData.setCranialCapacity(Double.parseDouble(values[6]));
                biologicalData.setHeight(Double.parseDouble(values[7]));
                biologicalData.setIncisorSize(Integer.parseInt(values[8]));
                biologicalData.setJawShape(Integer.parseInt(values[9]));
                biologicalData.setTorusSupraorbital(Integer.parseInt(values[10]));
                biologicalData.setPrognathism(Integer.parseInt(values[11]));
                biologicalData.setForamenMagnumPosition(Integer.parseInt(values[12]));
                biologicalData.setCanineSize(Integer.parseInt(values[13]));
                biologicalData.setCaninesShape(Integer.parseInt(values[14]));
                biologicalData.setToothEnamel(Integer.parseInt(values[15]));
                biologicalData.setTecnoCulture(Integer.parseInt(values[16]));
                biologicalData.setTecnoType(Integer.parseInt(values[17]));
                biologicalData.setBipedalism(Integer.parseInt(values[18]));
                biologicalData.setArmsLength(Integer.parseInt(values[19]));
                biologicalData.setFeetStructure(Integer.parseInt(values[20]));
                biologicalData.setDietType(Integer.parseInt(values[21]));
                biologicalData.setSexualDimorphism(Integer.parseInt(values[22]));
                biologicalData.setHipStructure(Integer.parseInt(values[23]));
                biologicalData.setVerticalFrontStructure(Integer.parseInt(values[24]));
                biologicalData.setAnatomyFeatures(Integer.parseInt(values[25]));
                biologicalData.setMigrated(Integer.parseInt(values[26]));
                biologicalData.setSkeletonFeatures(Integer.parseInt(values[27]));
                // Guardar en la base de datos
                dataList.add(biologicalData);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
        dataService.deleteAllDataEntries();
        saveDataInParallel(dataList, numThreads);
    }

    @GetMapping("/saving-status")
    public ResponseEntity<?> getProgress() {
        if (percentages == null) {
            return ResponseEntity.status(404).body("El procesamiento aún no ha comenzado.");
        }

        // Convertir AtomicIntegerArray a un array normal para devolver en la respuesta
        int[] progressArray = new int[percentages.length()];
        for (int i = 0; i < percentages.length(); i++) {
            progressArray[i] = percentages.get(i);
        }

        // Crear un objeto JSON con los chunks y sus porcentajes
        JSONObject jsonResponse = new JSONObject();
        for (int i = 0; i < progressArray.length; i++) {
            jsonResponse.put("chunk_" + (i + 1), progressArray[i]);
        }

        return ResponseEntity.ok(jsonResponse);
    }


    private void saveDataInParallel(List<BiologicalData> dataList, int numThreads) {
    ExecutorService executorService = Executors.newFixedThreadPool(numThreads);

    // Calcular el tamaño de cada chunk
    int chunkSize = (int) Math.ceil((double) dataList.size() / numThreads);
    List<List<BiologicalData>> chunks = new ArrayList<>();

    // Dividir dataList en chunks equitativos
    for (int i = 0; i < dataList.size(); i += chunkSize) {
        int end = Math.min(i + chunkSize, dataList.size());
        chunks.add(dataList.subList(i, end));
    }

    // Crear un array para los porcentajes de progreso de cada chunk
    this.percentages = new AtomicIntegerArray(numThreads);

    // Contador para numerar los hilos (chunks)
    int[] chunkCounter = {1}; // Usamos un array para poder modificarlo dentro de lambdas

    // Procesar cada chunk en paralelo
    for (List<BiologicalData> chunk : chunks) {
        int currentChunkIndex = chunkCounter[0] - 1; // Guardamos el índice actual del chunk
        executorService.submit(() -> {
            int entriesProcessed = 0;
            for (BiologicalData data : chunk) {
                // Agregar la entrada de datos al servicio
                dataService.addNewDataEntry(data);

                // Simular un pequeño retardo para evitar que el procesamiento sea instantáneo
                try {
                    Thread.sleep(100); // Pausa de 100 milisegundos
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }

                entriesProcessed++;
                int percentage = Math.round((float) (entriesProcessed * 100) / chunk.size());

                // Actualizamos el porcentaje si es mayor que el porcentaje anterior
                if (percentage > percentages.get(currentChunkIndex)) {
                    percentages.set(currentChunkIndex, percentage);

                    // Imprimir el progreso del chunk actual en la consola
                    System.out.println("Progreso del chunk " + (currentChunkIndex + 1) + ": " + percentage + "%");
                }
            }
        });
        chunkCounter[0]++;
    }

    executorService.shutdown();
    try {
        // Esperar hasta que todas las tareas terminen
        if (!executorService.awaitTermination(60, TimeUnit.MINUTES)) {
            executorService.shutdownNow();
        }
    } catch (InterruptedException e) {
        executorService.shutdownNow();
        Thread.currentThread().interrupt();
    }
}

}
