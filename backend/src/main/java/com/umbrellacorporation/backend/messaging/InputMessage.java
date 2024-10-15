package com.umbrellacorporation.backend.messaging;

public class InputMessage {
    private String content;

    public InputMessage() {
    }

    public InputMessage(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
