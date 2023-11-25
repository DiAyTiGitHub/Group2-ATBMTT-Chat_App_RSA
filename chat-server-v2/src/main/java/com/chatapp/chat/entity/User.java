package com.chatapp.chat.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "tbl_user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type = "uuid-char")
    @Column(name = "id", unique = true, nullable = false)
    private UUID id;
    @Column
    private String code;
    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String fullname;
    @Column
    @JsonIgnore
    private String password;
    @Column
    private String address;
    @Column
    private Boolean gender; // 0 - Female, 1 - Male
    @Column
    private Date birthDate;
    @Column
    private String avatar;
    @OneToMany(mappedBy = "user")
    private Set<Message> messages;

    @OneToMany(mappedBy = "requestSender")
    private Set<Friend> friendFromRequest; // a new relationship is formed when this user is the person who sends a friend request

    @OneToMany(mappedBy = "receiver")
    private Set<Friend> friendFromReceive; // a new relationship is formed when this user is the person who accepts a friend request

    @OneToMany(mappedBy = "user")
    private Set<UserRoom> userRooms;

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public Set<Friend> getFriendFromRequest() {
        return friendFromRequest;
    }

    public void setFriendFromRequest(Set<Friend> friendFromRequest) {
        this.friendFromRequest = friendFromRequest;
    }

    public Set<Friend> getFriendFromReceive() {
        return friendFromReceive;
    }

    public void setFriendFromReceive(Set<Friend> friendFromReceive) {
        this.friendFromReceive = friendFromReceive;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
}
