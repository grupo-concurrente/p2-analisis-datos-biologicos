package com.umbrellacorporation.backend.messaging;

public class OutputMessage {
    private String content;

    public OutputMessage() {
    }

    public OutputMessage(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}