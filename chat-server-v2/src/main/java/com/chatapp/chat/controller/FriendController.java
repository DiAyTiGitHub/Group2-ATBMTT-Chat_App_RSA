package com.chatapp.chat.controller;

import com.chatapp.chat.model.FriendDTO;
import com.chatapp.chat.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Controller
@CrossOrigin
@RequestMapping("/api/friend")
public class FriendController {
    @Autowired
    private FriendService friendService;

    @PostMapping(value = "/request/{receiverId}")
    public ResponseEntity<FriendDTO> sendFriendRequest(@PathVariable UUID receiverId) {
        FriendDTO relationship = friendService.sendFriendRequest(receiverId);
        if (relationship == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<FriendDTO>(relationship, HttpStatus.OK);
    }

    @PutMapping(value = "/accept/{relationshipId}")
    public ResponseEntity<FriendDTO> acceptFriendRequest(@PathVariable UUID relationshipId) {
        FriendDTO relationship = friendService.acceptFriendRequest(relationshipId);
        if (relationship == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<FriendDTO>(relationship, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public UUID unfriendUser(@PathVariable UUID userId) {
        friendService.unfriend(userId);
        return userId;
    }

    @GetMapping("/relationship/{friendId}")
    public ResponseEntity<FriendDTO> getRelationshipByFriendId(@PathVariable UUID friendId) {
        FriendDTO relationship = friendService.getRelationshipByFriendId(friendId);
        if (relationship == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<FriendDTO>(relationship, HttpStatus.OK);
    }


}
