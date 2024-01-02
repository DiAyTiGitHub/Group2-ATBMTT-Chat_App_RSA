package com.chatapp.chat.service;

import com.chatapp.chat.entity.Friend;
import com.chatapp.chat.model.FriendDTO;

import java.util.UUID;

public interface FriendService {
    public FriendDTO sendFriendRequest(UUID receiverId);

    public FriendDTO acceptFriendRequest(UUID relationshipId);

    public void unfriend(UUID userId);

    public FriendDTO getRelationshipByFriendId(UUID friendId);

    public Friend getRelationshipEntityByFriendId(UUID friendId);
}
