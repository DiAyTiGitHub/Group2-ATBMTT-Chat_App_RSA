package com.chatapp.chat.service;

import com.chatapp.chat.entity.UserRoom;
import com.chatapp.chat.model.UserRoomDTO;

import java.util.UUID;

public interface UserRoomService {
    public UserRoomDTO createUserRoom(UserRoomDTO dto);

    public UserRoom createUserRoomEntity(UserRoomDTO dto);

    public UserRoomDTO updateUserRoom(UserRoomDTO dto);

    public void deleteUserRoom(UUID userRoomId);
}
