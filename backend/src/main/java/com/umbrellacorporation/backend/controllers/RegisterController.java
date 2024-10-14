package com.umbrellacorporation.backend.controllers;

import com.umbrellacorporation.backend.dto.RegisterRequest;
import com.umbrellacorporation.backend.models.Rol;
import com.umbrellacorporation.backend.models.User;
import com.umbrellacorporation.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("public/register")
public class RegisterController {

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        // Check if passwords match
        boolean areEqualPasswords = registerRequest.getPassword().equals(registerRequest.getPasswordConfirm());

        if (areEqualPasswords) {
            // Check if the email is already registered
            if (userService.existsByEmail(registerRequest.getEmail())) {
                return ResponseEntity.status(409).body("Email is already registered");
            }

            // Create a new User object based on the register request
            User newUser = new User();
            newUser.setEmail(registerRequest.getEmail());
            newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            newUser.setName(registerRequest.getName());
            newUser.setRol(Rol.USER);

            // Save the user to the database
            userService.addNewUser(newUser);

            // Return success response
            return ResponseEntity.status(201).body("User registered successfully");
        } else {
            // Return error response if passwords don't match
            return ResponseEntity.status(401).body("Passwords do not match: " + registerRequest.getPassword() + " " + registerRequest.getPasswordConfirm());
        }
    }
}
