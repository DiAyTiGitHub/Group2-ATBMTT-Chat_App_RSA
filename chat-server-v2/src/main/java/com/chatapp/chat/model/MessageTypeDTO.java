package com.chatapp.chat.model;

import com.chatapp.chat.entity.MessageType;

import java.util.UUID;

public class MessageTypeDTO {
    private UUID id;
    private String code;
    private String name;
    private String description;

    public MessageTypeDTO() {
    }

    public MessageTypeDTO(MessageType entity) {
        this.id = entity.getId();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.description = entity.getDescription();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
