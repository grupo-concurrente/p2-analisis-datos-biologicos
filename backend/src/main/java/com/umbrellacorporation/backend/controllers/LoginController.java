package com.umbrellacorporation.backend.controllers;

import com.umbrellacorporation.backend.dto.LoginRequest;
import com.umbrellacorporation.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("public/login")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        boolean isValid = userService.verifyUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (isValid) {
            return ResponseEntity.ok("Login succeed");
        } else {
            return ResponseEntity.status(401).body("Invalid user or password");
        }
    }
}


