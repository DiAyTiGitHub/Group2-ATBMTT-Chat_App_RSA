package com.chatapp.chat.model;

import com.chatapp.chat.entity.User;

import java.util.Date;
import java.util.UUID;

public class UserDTO {
    private UUID id;
    private String code;
    private String username;
    private String fullname;
    private String password;
    private String address;
    private Boolean gender; // 0 - Female, 1 - Male
    private Date birthDate;
    private String avatar;

    public UserDTO() {
    }

    public UserDTO(User entity) {
        super();
        this.id = entity.getId();
        this.code = entity.getCode();
        this.username = entity.getUsername();
        this.gender = entity.getGender();
        this.birthDate = entity.getBirthDate();
        this.address = entity.getAddress();
        this.fullname = entity.getFullname();
        this.avatar = entity.getAvatar();
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

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}