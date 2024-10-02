package com.umbrellacorporation.backend.services;

import com.umbrellacorporation.backend.models.User;
import com.umbrellacorporation.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Obtener todos los usuarios
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // Obtener un usuario por ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Agregar un nuevo usuario
    public void addNewUser(User user) {
        Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
        if (userByEmail.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        userRepository.save(user);
    }

    // Eliminar un usuario por ID
    public void deleteUser(Long id) {
        boolean exists = userRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("User with id " + id + " doesn't exist.");
        }
        userRepository.deleteById(id);
    }

    // Actualizar un usuario por ID
    public void updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("User with id " + id + " doesn't exist."));

        if (updatedUser.getName() != null && !updatedUser.getName().isEmpty()) {
            user.setName(updatedUser.getName());
        }

        if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
            Optional<User> userByEmail = userRepository.findUserByEmail(updatedUser.getEmail());
            if (userByEmail.isPresent()) {
                throw new IllegalArgumentException("Email already exists");
            }
            user.setEmail(updatedUser.getEmail());
        }

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(updatedUser.getPassword());
        }

        if (updatedUser.getRol() != null) {
            user.setRol(updatedUser.getRol());
        }

        userRepository.save(user);
    }

    public boolean verifyUser(String email, String rawPassword) {
        Optional<User> userOpt = userRepository.findUserByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Verificar si la contraseña ingresada coincide con la cifrada almacenada
            return passwordEncoder.matches(rawPassword, user.getPassword());
        }

        return false; // Si el usuario no existe o la contraseña no coincide
    }
}
