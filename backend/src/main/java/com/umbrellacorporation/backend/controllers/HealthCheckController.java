package com.umbrellacorporation.backend.controllers;

import com.umbrellacorporation.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("public/api/v1/health")
public class HealthCheckController {

    private final UserRepository userRepository;

    @Autowired
    public HealthCheckController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<String> checkHealth() {
        try {
            // Intentar hacer una operación en la base de datos
            userRepository.count();
            return ResponseEntity.ok("UP");
        } catch (Exception e) {
            return ResponseEntity.status(503).body("DOWN");
        }
    }
}
