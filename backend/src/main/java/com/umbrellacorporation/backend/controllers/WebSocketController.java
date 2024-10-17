package com.umbrellacorporation.backend.controllers;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/sendLandingMessage")
    @SendTo("/landing")
    public String sendLandingMessage(String message) {
        return "Hola, " + message;
    }
}
