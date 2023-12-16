package com.chatapp.chat.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "tbl_room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type = "uuid-char")
    @Column(name = "id", unique = true, nullable = false)
    private UUID id;
    @Column
    private String code;
    @Column
    private String name;
    @Column
    private String description;
    @Column
    private Date createDate;
    @Column
    private String avatar;
    @Column
    private String color;

    @ManyToOne
    @JoinColumn(name = "room_type_id")
    private RoomType roomType;

    @OneToMany(mappedBy = "room", cascade = CascadeType.REMOVE)
    private Set<Message> messages;

    @OneToMany(mappedBy = "room", fetch = FetchType.EAGER)
    private Set<UserRoom> userRooms;

    @OneToOne(mappedBy = "room")
    private Friend relationship;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "publicKeyId")
    private RSAKey publicKey;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "privateKeyId")
    private RSAKey privateKey;

    public RSAKey getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(RSAKey publicKey) {
        this.publicKey = publicKey;
    }

    public RSAKey getPrivateKey() {
        return privateKey;
    }

    public void setPrivateKey(RSAKey privateKey) {
        this.privateKey = privateKey;
    }

    public Friend getRelationship() {
        return relationship;
    }

    public void setRelationship(Friend relationship) {
        this.relationship = relationship;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public Set<UserRoom> getUserRooms() {
        return userRooms;
    }

    public void setUserRooms(Set<UserRoom> userRooms) {
        this.userRooms = userRooms;
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

    public RoomType getRoomType() {
        return roomType;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
    }


}
