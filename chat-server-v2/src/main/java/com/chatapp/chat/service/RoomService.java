package com.chatapp.chat.service;

import com.chatapp.chat.entity.Room;
import com.chatapp.chat.model.MessageDTO;
import com.chatapp.chat.model.RoomDTO;
import com.chatapp.chat.model.UserDTO;

import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;

public interface RoomService {
    public Set<UserDTO> getAllJoinedUsersByRoomId(UUID roomId);

    public RoomDTO createRoom(RoomDTO dto);

    public RoomDTO updateRoom(RoomDTO dto);

    public void deleteRoom(UUID roomId);

    public Set<MessageDTO> pagingLatestMessage(UUID earliestMessageId);

    public RoomDTO getRoomById(UUID roomId);

    public Room createRoomEntity(RoomDTO dto);

    public RoomDTO handleAddJoinedUserIntoRoomDTO(Room room);
}
