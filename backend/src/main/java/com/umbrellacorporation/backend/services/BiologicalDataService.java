package com.umbrellacorporation.backend.services;

import com.umbrellacorporation.backend.models.BiologicalData;
import com.umbrellacorporation.backend.repositories.BiologicalDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BiologicalDataService {

    private final BiologicalDataRepository dataRepository;

    @Autowired
    public BiologicalDataService(BiologicalDataRepository dataRepository) {
        this.dataRepository = dataRepository;
    }

    public List<BiologicalData> getDataEntries() {
        return dataRepository.findAll();
    }

    public Optional<BiologicalData> getDataEntryById(Long id) {
        return dataRepository.findById(id);
    }

    public void addNewDataEntry(BiologicalData data) {
        dataRepository.save(data);
    }

    public void deteleDataEntry(Long id) {
        boolean exists = dataRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Data entry with id " + id + " doesn't exist.");
        }
        dataRepository.deleteById(id);
    }
}
