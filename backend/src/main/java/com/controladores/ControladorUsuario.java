package com.controladores;

import com.modelos.Usuario;
import com.servicios.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class ControladorUsuario {

    @Autowired
    private ServicioUsuario servicioUsuario;

    // Obtener todos los usuarios (simulado)
    @GetMapping
    public List<Usuario> obtenerUsuarios() {
        // Aquí puedes agregar lógica para recuperar usuarios de una base de datos
        return null; // Cambia esto por una lista real de usuarios
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public Usuario obtenerUsuario(@PathVariable String id) {
        // Llamas al servicio para buscar un usuario por su ID
        return null; // Aquí se devolvería un usuario real
    }

    // Crear un nuevo usuario
    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario nuevoUsuario) {
        // Aquí podrías llamar al método del servicio para agregar el usuario
        return servicioUsuario.agregarUsuario(
                nuevoUsuario.getId(),
                nuevoUsuario.getNombre(),
                nuevoUsuario.getEmail(),
                nuevoUsuario.getPassword(),
                nuevoUsuario.getRol()
        );
    }

    // Actualizar la información de un usuario
    @PutMapping("/{id}")
    public Usuario actualizarUsuario(@PathVariable String id, @RequestBody Usuario usuarioActualizado) {
        // Aquí puedes agregar lógica para actualizar un usuario existente
        return null; // Cambia esto por el usuario actualizado
    }

    // Eliminar un usuario
    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable String id) {
        // Aquí podrías agregar lógica para eliminar un usuario
    }
}
