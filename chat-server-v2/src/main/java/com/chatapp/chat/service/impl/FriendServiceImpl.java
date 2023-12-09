package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.*;
import com.chatapp.chat.model.*;
import com.chatapp.chat.repository.FriendRepository;
import com.chatapp.chat.repository.RoomRepository;
import com.chatapp.chat.repository.UserRoomRepository;
import com.chatapp.chat.service.*;
import org.springframework.beans.factory.annotation.Autowired;
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

        if (pendingRelationship != null) return new FriendDTO(pendingRelationship);
        return null;
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


            Friend updatedRelationship = friendRepository.save(relationship);
            if (updatedRelationship == null) return null;
            return new FriendDTO(updatedRelationship);
        }

        return null;
    }

    @Override
    public void unfriend(UUID userId) {
        Friend relationship = this.getRelationshipEntityByFriendId(userId);

        if (relationship == null) return;

        friendRepository.delete(relationship);

        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return;
        User friendUser = userService.getUserEntityById(userId);
        if (friendUser == null) return;

        Set<UserRoom> userRoomsOfCurrentUser = currentUser.getUserRooms();
        Room willDeleteRoom = null;
        for (UserRoom userRoom : userRoomsOfCurrentUser) {
            Room currentRoom = userRoom.getRoom();
            if (currentRoom.getUserRooms().size() == 2) {
                for (UserRoom joinedUserRoom : currentRoom.getUserRooms()) {
                    User inUseUser = joinedUserRoom.getUser();
                    if (inUseUser.getId().compareTo(friendUser.getId()) == 0) {
                        willDeleteRoom = currentRoom;
                        break;
                    }
                }
            }
            if (willDeleteRoom != null) break;
        }

        if (willDeleteRoom == null) return;
        UserRoom userRoom1 = userRoomRepository.findByUserIdAndRoomId(currentUser.getId(), willDeleteRoom.getId());
        UserRoom userRoom2 = userRoomRepository.findByUserIdAndRoomId(friendUser.getId(), willDeleteRoom.getId());

        userRoomRepository.delete(userRoom1);
        userRoomRepository.delete(userRoom2);

        roomRepository.delete(willDeleteRoom);
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
