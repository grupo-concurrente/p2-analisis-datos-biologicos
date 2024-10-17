package com.umbrellacorporation.backend.controllers;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    // Aquí no usamos prefijos como /app
    @MessageMapping("/sendLoginMessage")  // El cliente enviará mensajes a /sendLoginMessage
    @SendTo("/login")  // El servidor enviará mensajes a los clientes suscritos a /login
    public String sendMessage(String message) {
        return "Hola, " + message;  // Devuelve un mensaje con la entrada del cliente
    }
}