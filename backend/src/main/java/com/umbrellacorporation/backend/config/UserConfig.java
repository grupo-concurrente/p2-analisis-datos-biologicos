package com.umbrellacorporation.backend.config;

import com.umbrellacorporation.backend.models.Rol;
import com.umbrellacorporation.backend.models.User;
import com.umbrellacorporation.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner userRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            User defaultAdmin = new User( "admin@umbrellacorporation.com", "admin", passwordEncoder.encode("admin"), Rol.ADMIN);
            User defaultUser = new User( "user@umbrellacorporation.com", "user", passwordEncoder.encode("user"), Rol.USER);
            userRepository.deleteAll();
            userRepository.saveAll(List.of(defaultAdmin, defaultUser));
        };
    }
}
