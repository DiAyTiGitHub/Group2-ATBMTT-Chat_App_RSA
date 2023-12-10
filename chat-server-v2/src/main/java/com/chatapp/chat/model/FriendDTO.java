package com.chatapp.chat.model;

import com.chatapp.chat.entity.Friend;

import java.util.Date;
import java.util.UUID;

public class FriendDTO {
    private UUID id;
    private UserDTO requestSender;

    private UserDTO receiver;

    private Date lastModifyDate;

    private Boolean state; // 0 - is not friend yet, 1 - is friend

    private RoomDTO room;

    public FriendDTO() {
    }

    public FriendDTO(Friend entity) {
        this.id = entity.getId();
        if (entity.getRequestSender() != null)
            this.requestSender = new UserDTO(entity.getRequestSender());
        if (entity.getReceiver() != null)
            this.receiver = new UserDTO(entity.getReceiver());
        this.lastModifyDate = entity.getLastModifyDate();
        this.state = entity.getState();
        if (entity.getRoom() != null)
            this.room = new RoomDTO(entity.getRoom());
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UserDTO getRequestSender() {
        return requestSender;
    }

    public void setRequestSender(UserDTO requestSender) {
        this.requestSender = requestSender;
    }

    public UserDTO getReceiver() {
        return receiver;
    }

    public void setReceiver(UserDTO receiver) {
        this.receiver = receiver;
    }

    public Date getLastModifyDate() {
        return lastModifyDate;
    }

    public void setLastModifyDate(Date lastModifyDate) {
        this.lastModifyDate = lastModifyDate;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public RoomDTO getRoom() {
        return room;
    }

    public void setRoom(RoomDTO room) {
        this.room = room;
    }
}
