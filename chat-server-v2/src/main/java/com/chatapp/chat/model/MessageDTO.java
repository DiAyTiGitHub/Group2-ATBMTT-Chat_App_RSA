package com.chatapp.chat.model;

import com.chatapp.chat.entity.Message;
import com.chatapp.chat.entity.MessageType;

import java.util.Comparator;
import java.util.Date;
import java.util.UUID;

public class MessageDTO implements Comparator<MessageDTO> {
    private UUID id;
    private String content;
    private Date sendDate;
    private UserDTO user;
    private RoomDTO room;
    private MessageTypeDTO messageType;

    public MessageDTO() {
    }

    public MessageDTO(Message entity) {
        this.id = entity.getId();
        this.content = entity.getContent();
        this.sendDate = entity.getSendDate();
        if (entity.getRoom() != null)
            this.room = new RoomDTO(entity.getRoom());
        if (entity.getUser() != null)
            this.user = new UserDTO(entity.getUser());
        if (entity.getMessageType() != null)
            this.messageType = new MessageTypeDTO(entity.getMessageType());
    }

    public MessageDTO(MessageDTO dto) {
        this.id = dto.getId();
        this.content = dto.getContent();
        this.sendDate = dto.getSendDate();
//        if (dto.getRoom() != null)
//            this.room = dto.getRoom();
        if (dto.getUser() != null)
            this.user = dto.getUser();
        if (dto.getMessageType() != null)
            this.messageType = dto.getMessageType();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getSendDate() {
        return sendDate;
    }

    public void setSendDate(Date sendDate) {
        this.sendDate = sendDate;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public RoomDTO getRoom() {
        return room;
    }

    public void setRoom(RoomDTO room) {
        this.room = room;
    }

    public MessageTypeDTO getMessageType() {
        return messageType;
    }

    public void setMessageType(MessageTypeDTO messageType) {
        this.messageType = messageType;
    }

    @Override
    public int compare(MessageDTO o1, MessageDTO o2) {
        return o1.getSendDate().compareTo(o2.getSendDate());
    }
}
