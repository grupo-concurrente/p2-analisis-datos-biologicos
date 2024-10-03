package com.umbrellacorporation.backend.controllers;

import com.opencsv.CSVReader;
import com.umbrellacorporation.backend.models.BiologicalData;
import com.umbrellacorporation.backend.models.User;
import com.umbrellacorporation.backend.repositories.BiologicalDataRepository;
import com.umbrellacorporation.backend.services.BiologicalDataService;
import com.umbrellacorporation.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("public")
public class DataProcessingController {

    private final BiologicalDataService dataService;

    @Autowired
    public DataProcessingController(BiologicalDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/biological-data")
    public List<BiologicalData> getAllData() {
        return dataService.getDataEntries();
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

    @PostMapping("/save-data")
    public ResponseEntity<String> saveData(@RequestParam int numThreads) {
        try {
            String csvFilePath = "./data/processed_data.csv";

            // Registrar el tiempo de inicio
            long startTime = System.currentTimeMillis();

            //Guardar en la BBDD
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

        saveDataInParallel(dataList, numThreads);
    }

    private void saveDataInParallel(List<BiologicalData> dataList, int numThreads) {
        ExecutorService executorService = Executors.newFixedThreadPool(numThreads);

        for (BiologicalData data : dataList) {
            executorService.submit(() -> {
                dataService.addNewDataEntry(data);
            });
        }

        executorService.shutdown();
        try {
            // Espera hasta que todas las tareas terminen
            if (!executorService.awaitTermination(60, TimeUnit.MINUTES)) {
                executorService.shutdownNow();
            }
        } catch (InterruptedException e) {
            executorService.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }
}
