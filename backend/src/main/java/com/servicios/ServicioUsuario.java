package com.servicios;

import com.modelos.Usuario;

public class ServicioUsuario {

    // Método para validar el correo
    public boolean validarEmail(Usuario usuario) {
        return usuario.getEmail() != null && usuario.getEmail().contains("@");
    }

    // Método para cambiar la contraseña
    public void cambiarPassword(Usuario usuario, String nuevaPassword) {
        usuario.setPassword(nuevaPassword); // Aquí podrías agregar lógica de hashing
    }

    // Método para activar o desactivar la cuenta
    public void toggleActivo(Usuario usuario) {
        usuario.setActivo(!usuario.isActivo());
    }

    // Método para agregar un nuevo usuario (ejemplo)
    public Usuario agregarUsuario(String id, String nombre, String email, String password, String rol) {
        Usuario nuevoUsuario = new Usuario(id, nombre, email, password, rol, true);
        // Aquí podrías agregar lógica para guardar el usuario en una base de datos
        return nuevoUsuario;
    }
}
