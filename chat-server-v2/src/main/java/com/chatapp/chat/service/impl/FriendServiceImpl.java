package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.Friend;
import com.chatapp.chat.entity.User;
import com.chatapp.chat.model.FriendDTO;
import com.chatapp.chat.repository.FriendRepository;
import com.chatapp.chat.repository.UserRepository;
import com.chatapp.chat.service.FriendService;
import com.chatapp.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class FriendServiceImpl implements FriendService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FriendRepository friendRepository;

    @Override
    public FriendDTO sendFriendRequest(UUID receiverId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = auth.getName();
        if (currentUserName == null) return null;
        User currentUser = userRepository.findByUsername(currentUserName);
        if (currentUser == null) return null;

        User requestReceiver = userRepository.findById(receiverId).orElse(null);
        if (requestReceiver == null) return null;

        Friend relationship = new Friend();
        relationship.setReceiver(requestReceiver);
        relationship.setRequestSender(currentUser);
        relationship.setLastModifyDate(new Date());
        relationship.setState(false);

        Friend pendingRelationship = friendRepository.save(relationship);

        if (pendingRelationship != null) return new FriendDTO(pendingRelationship);
        return null;
    }

    @Override
    public FriendDTO acceptFriendRequest(UUID relationshipId) {
        //get relationship to accept
        Friend relationship = friendRepository.findById(relationshipId).orElse(null);
        if (relationship == null) return null;

        //get current user
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = auth.getName();
        if (currentUserName == null) return null;
        User currentUser = userRepository.findByUsername(currentUserName);
        if (currentUser == null) return null;

        if(currentUser.getUsername().equals(relationship.getReceiver().getUsername())){
            relationship.setState(true);

            //create new room for private chat

            Friend updatedRelationship = friendRepository.save(relationship);
            return new FriendDTO(updatedRelationship);
        }

        return null;
    }
}
