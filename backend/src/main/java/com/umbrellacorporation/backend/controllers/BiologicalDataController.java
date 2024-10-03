package com.umbrellacorporation.backend.controllers;

import com.umbrellacorporation.backend.models.BiologicalData;
import com.umbrellacorporation.backend.services.BiologicalDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller("api/v1/biological-data")
public class BiologicalDataController {

    private final BiologicalDataService dataService;

    @Autowired
    public BiologicalDataController(BiologicalDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<BiologicalData> getAllData() {
        return dataService.getDataEntries();
    }
}
