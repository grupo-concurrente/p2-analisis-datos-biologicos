package com.umbrellacorporation.backend.controllers;

import com.umbrellacorporation.backend.models.User;
import com.umbrellacorporation.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("admin/api/v1/users")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // Obtener todos los usuarios
    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    // Agregar un nuevo usuario
    @PostMapping
    public void addUsuario(@RequestBody User user) {
        userService.addNewUser(new User(user.getName(), user.getEmail(), passwordEncoder.encode(user.getPassword()), user.getRol()));
    }

    // Eliminar un usuario por ID
    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable("id") Long id) {
        userService.deleteUser(id);
    }

    // Actualizar un usuario por ID
    @PutMapping("/{id}")
    public void updateUsuario(
            @PathVariable("id") Long id,
            @RequestBody User updatedUser) {
        userService.updateUser(id, updatedUser);
    }
}
