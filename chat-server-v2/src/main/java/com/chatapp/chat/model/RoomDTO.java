package com.chatapp.chat.model;

import com.chatapp.chat.entity.Room;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public class RoomDTO {
    private UUID id;
    private String code;
    private String name;
    private String description;
    private Date createDate;
    private String avatar;
    private String color;
    private RoomTypeDTO roomType;
    private Set<UserDTO> participants;

    public Set<UserDTO> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<UserDTO> participants) {
        this.participants = participants;
    }

    public List<MessageDTO> messages;

    public RoomDTO() {
    }

    public RoomDTO(Room entity) {
        this.id = entity.getId();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.description = entity.getDescription();
        this.createDate = entity.getCreateDate();
        this.avatar = entity.getAvatar();
        this.color = entity.getColor();
        this.roomType = new RoomTypeDTO(entity.getRoomType());
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

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public RoomTypeDTO getRoomType() {
        return roomType;
    }

    public void setRoomType(RoomTypeDTO roomType) {
        this.roomType = roomType;
    }

    public List<MessageDTO> getMessages() {
        return messages;
    }

    public void setMessages(List<MessageDTO> messages) {
        this.messages = messages;
    }

    @Override
    public String toString() {
        return "RoomDTO{" +
                "code='" + code + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", createDate=" + createDate +
                '}';
    }
}
