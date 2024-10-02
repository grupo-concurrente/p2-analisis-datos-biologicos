package com.umbrellacorporation.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private long id;

    @Setter @Getter
    private String name;

    @Setter @Getter
    private String email;

    @Setter @Getter
    private String password;

    @Getter @Setter
    @Enumerated(EnumType.STRING)
    Rol rol;

    public User() {
    }

    public User(long id, String email, String name, String password, Rol rol) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.rol = rol;
    }

    public User(String email, String name, String password, Rol rol) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.rol = rol;
    }

    @Override
    public String toString() {
        return "Usuario [" +
                "Nombre: " + name + '\'' + "; Rol:"
                + rol + '\'' + "; Email:" + email +
                '\'' + "; Contraseña:" + password
                + '\'' + " ID: " + id +
                ']';
    }
}
