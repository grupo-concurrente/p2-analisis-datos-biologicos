package com.umbrellacorporation.backend.services;

import com.umbrellacorporation.backend.models.BiologicalData;
import com.umbrellacorporation.backend.repositories.BiologicalDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BiologicalDataService {

    private final BiologicalDataRepository dataRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public BiologicalDataService(BiologicalDataRepository dataRepository, SimpMessagingTemplate messagingTemplate) {
        this.dataRepository = dataRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public List<BiologicalData> getDataEntries() {
        List<BiologicalData> dataEntries = dataRepository.findAll();
        messagingTemplate.convertAndSend("/topic/messages", "Datos recogidos exitosamente");
        return dataEntries;
    }

    public Optional<BiologicalData> getDataEntryById(Long id) {
        Optional<BiologicalData> dataEntry = dataRepository.findById(id);
        messagingTemplate.convertAndSend("/topic/messages", "Datos recogidos exitosamente");
        return dataEntry;
    }

    public void addNewDataEntry(BiologicalData data) {
        dataRepository.save(data);
        messagingTemplate.convertAndSend("/topic/messages", "Nuevo dato añadido exitosamente");
    }

    public void deleteDataEntry(Long id) {
        boolean exists = dataRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Data entry with id " + id + " doesn't exist.");
        }
        dataRepository.deleteById(id);
        messagingTemplate.convertAndSend("/topic/messages", "Dato eliminado exitosamente");
    }

    public void deleteAllDataEntries() {
        dataRepository.deleteAll();
        messagingTemplate.convertAndSend("/topic/messages", "Todos los datos eliminados exitosamente");
    }
}