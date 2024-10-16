package com.umbrellacorporation.backend.controllers;

import com.umbrellacorporation.backend.dto.LoginRequest;
import com.umbrellacorporation.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("public/login")
public class LoginController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public LoginController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        boolean isValid = userService.verifyUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (isValid) {
            simpMessagingTemplate.convertAndSend("/login", "Inicio de sesión exitoso para " + loginRequest.getEmail());
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid user or password");
        }
    }
    @MessageMapping("/login")
    @SendTo("/login")
    public String handleLogin(String message) {
        return "Inicio de sesión exitoso: " + message;
    }
}



