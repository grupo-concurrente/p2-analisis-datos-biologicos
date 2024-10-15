package com.umbrellacorporation.backend.controllers;

import com.umbrellacorporation.backend.models.BiologicalData;
import com.umbrellacorporation.backend.services.BiologicalDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;
import com.umbrellacorporation.backend.messaging.InputMessage;
import com.umbrellacorporation.backend.messaging.OutputMessage;

import java.util.List;

@Controller
public class WebSocketController {

    private final BiologicalDataService biologicalDataService;

    @Autowired
    public WebSocketController(BiologicalDataService biologicalDataService) {
        this.biologicalDataService = biologicalDataService;
    }

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public OutputMessage sendMessage(InputMessage message) {
        return new OutputMessage(HtmlUtils.htmlEscape(message.getContent()));
    }

    @MessageMapping("/biological-data")
    @SendTo("/topic/biological-data")
    public List<BiologicalData> sendBiologicalData() {
        return biologicalDataService.getDataEntries();
    }
}