package com.chatapp.chat.model;

import com.chatapp.chat.entity.UserRoom;

import java.util.UUID;

public class UserRoomDTO {
    private UUID id;
    private UserDTO user;
    private RoomDTO room;
    private String role;
    private String nickName;

    public UserRoomDTO() {
    }

    public UserRoomDTO(UserRoom entity) {
        this.id = entity.getId();
        if (entity.getUser() != null)
            this.user = new UserDTO(entity.getUser());
        if (entity.getRoom() != null)
            this.room = new RoomDTO(entity.getRoom());
        this.role = entity.getRole();
        this.nickName = entity.getNickName();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
}
