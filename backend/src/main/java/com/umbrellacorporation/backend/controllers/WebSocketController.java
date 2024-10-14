package com.umbrellacorporation.backend.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class WebSocketController {

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public OutputMessage sendMessage(InputMessage message) {
        return new OutputMessage(HtmlUtils.htmlEscape(message.getContent()));
    }
}