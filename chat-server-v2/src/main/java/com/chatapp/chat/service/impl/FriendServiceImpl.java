package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.*;
import com.chatapp.chat.model.*;
import com.chatapp.chat.repository.FriendRepository;
import com.chatapp.chat.repository.RoomRepository;
import com.chatapp.chat.repository.UserRoomRepository;
import com.chatapp.chat.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FriendServiceImpl implements FriendService {
    @Autowired
    private UserService userService;

    @Autowired
    private FriendRepository friendRepository;

    @Autowired
    private RoomService roomService;

    @Autowired
    private UserRoomService userRoomService;

    @Autowired
    private RoomTypeService roomTypeService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRoomRepository userRoomRepository;

    @Autowired
    private SetupDataService setupDataService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private MessageTypeService messageTypeService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public FriendDTO sendFriendRequest(UUID receiverId) {
        //get current user
        User currentUser = userService.getCurrentLoginUserEntity();

        User requestReceiver = userService.getUserEntityById(receiverId);
        if (requestReceiver == null) return null;

        Friend relationship = new Friend();
        relationship.setReceiver(requestReceiver);
        relationship.setRequestSender(currentUser);
        relationship.setLastModifyDate(new Date());
        relationship.setState(false);

        Friend pendingRelationship = friendRepository.save(relationship);

        if (pendingRelationship == null)
            return null;

        //notify receiver that they have received an add friend request
        MessageDTO notification = new MessageDTO();
        notification.setUser(new UserDTO(requestReceiver));
        notification.setContent(currentUser.getUsername() + " sended you an add friend request!");
        notification = messageService.handlerForNotification(notification);
        messageService.sendMessageTo("/notification", notification);

        return new FriendDTO(pendingRelationship);
    }

    @Override
    public FriendDTO acceptFriendRequest(UUID relationshipId) {
        //get relationship to accept
        Friend relationship = friendRepository.findById(relationshipId).orElse(null);
        if (relationship == null) return null;

        //get current user
        User currentUser = userService.getCurrentLoginUserEntity();

        if (currentUser.getUsername().equals(relationship.getReceiver().getUsername())) {
            relationship.setState(true);

            //create new room for private chat
            RoomDTO roomDto = new RoomDTO();
            RoomType roomTypeEntity = roomTypeService.getRoomTypeEntityByName("private");
            if (roomTypeEntity == null) setupDataService.setupData();
            roomTypeEntity = roomTypeService.getRoomTypeEntityByName("private");
            if (roomTypeEntity != null) {
                RoomTypeDTO roomTypeDto = new RoomTypeDTO(roomTypeEntity);
                roomDto.setRoomType(roomTypeDto);
            }
            roomDto.setCreateDate(new Date());
            Room room = roomService.createRoomEntity(roomDto);
            room = roomRepository.save(room);
            roomDto = new RoomDTO(room);

            //create 2 records for tbl_user_room
            UserRoomDTO urSenderDto = new UserRoomDTO();
            urSenderDto.setRoom(roomDto);
            urSenderDto.setUser(new UserDTO(relationship.getRequestSender()));
            urSenderDto.setNickName(relationship.getRequestSender().getUsername());
            urSenderDto.setRole("member");

            UserRoom urSender = userRoomService.createUserRoomEntity(urSenderDto);
            userRoomRepository.save(urSender);

            UserRoomDTO urReceiverDto = new UserRoomDTO();
            urReceiverDto.setRoom(roomDto);
            urReceiverDto.setUser(new UserDTO(relationship.getReceiver()));
            urReceiverDto.setNickName(relationship.getReceiver().getUsername());
            urReceiverDto.setRole("member");

            UserRoom urReceiver = userRoomService.createUserRoomEntity(urReceiverDto);
            userRoomRepository.save(urReceiver);

            // create room for private chatting
            relationship.setRoom(room);

            Friend updatedRelationship = friendRepository.save(relationship);
            if (updatedRelationship == null) return null;

            //notify receiver that they have received an add friend request
            room = roomRepository.findById(room.getId()).orElse(null);
            MessageDTO notification = new MessageDTO();
            notification.setUser(new UserDTO(relationship.getRequestSender()));
            RoomDTO roomInMessage = new RoomDTO(room);
            notification.setRoom(roomInMessage);
            notification.setMessageType(new MessageTypeDTO(messageTypeService.getMessageTypeEntityByName("notification")));
            notification.setContent(currentUser.getUsername() + " accepted your add friend request!");
            notification = messageService.handlerForNotification(notification);
            messageService.sendMessageTo("/notification", notification);
            roomInMessage.setParticipants(roomService.getAllJoinedUsersByRoomId(roomInMessage.getId()));
            notification.setRoom(roomInMessage);

            for (UserDTO userDto : roomInMessage.getParticipants()) {
                simpMessagingTemplate.convertAndSendToUser(userDto.getId().toString(), "/privateMessage", notification);
            }

            return new FriendDTO(updatedRelationship);
        }

        return null;
    }

    @Override
    public void unfriend(UUID userId) {
        Friend relationship = this.getRelationshipEntityByFriendId(userId);

        if (relationship == null) return;

        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return;
        User friendUser = userService.getUserEntityById(userId);
        if (friendUser == null) return;

        if (relationship.getRoom() == null) return;
        Room willDeleteRoom = roomRepository.findById(relationship.getRoom().getId()).orElse(null);
        if (willDeleteRoom == null) return;

//        UserRoom userRoom1 = userRoomRepository.findByUserIdAndRoomId(currentUser.getId(), willDeleteRoom.getId());
//        UserRoom userRoom2 = userRoomRepository.findByUserIdAndRoomId(friendUser.getId(), willDeleteRoom.getId());
//
//        userRoomRepository.delete(userRoom1);
//        userRoomRepository.delete(userRoom2);

//        roomRepository.delete(willDeleteRoom);

        friendRepository.delete(relationship);

    }

    @Override
    public FriendDTO getRelationshipByFriendId(UUID friendId) {
        Friend relationship = this.getRelationshipEntityByFriendId(friendId);

        if (relationship == null) return null;
        return new FriendDTO(relationship);
    }

    @Override
    public Friend getRelationshipEntityByFriendId(UUID friendId) {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        User friend = userService.getUserEntityById(friendId);
        if (friend == null) return null;

        List<Friend> relationships = friendRepository.getRelationShipBy2Id(currentUser.getId(), friend.getId());
        if (relationships == null || relationships.size() == 0) return null;
        return relationships.get(0);
    }
}
