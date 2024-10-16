package com.umbrellacorporation.backend.config;

import org.apache.juli.logging.Log;
import org.springframework.web.socket.*;
import org.apache.juli.logging.LogFactory;

public class WsHandler implements WebSocketHandler {

    private static final Log log = LogFactory.getLog(WsHandler.class);
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("nueva conexion en la sesion: " + session.getId());
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String ws = (String) message.getPayload();
        log.info("Mensaje recibido: " + ws);
        session.sendMessage(new BinaryMessage(("Procesando..." + session + " - " + ws).getBytes()));
        Thread.sleep(1000);
        session.sendMessage(new TextMessage("Procesado"));
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.info("Error en la conexion: " + exception.getMessage() + " en la sesion: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        log.info("Conexion cerrada: " + closeStatus.getCode() + " en la sesion: " + session.getId());
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
