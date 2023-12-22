package com.chatapp.chat.model;

import java.util.UUID;

public class NewGroupChat {
    private UUID id;

    private String name;
    private UUID joinUserIds[];

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UUID[] getJoinUserIds() {
        return joinUserIds;
    }

    public void setJoinUserIds(UUID[] joinUserIds) {
        this.joinUserIds = joinUserIds;
    }
}
