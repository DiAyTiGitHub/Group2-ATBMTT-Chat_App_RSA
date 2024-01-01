package com.chatapp.chat.service;

import com.chatapp.chat.entity.Room;
import com.chatapp.chat.model.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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

    public List<RoomDTO> searchRoom(SeachObject seachObject);

    public String uploadRoomAvatar(MultipartFile fileUpload, UUID roomId);

    public RoomDTO createGroupChat(NewGroupChat newGroupChat);

    public RoomDTO unjoinGroupChat(UUID groupChatId);

    public RoomDTO addUserIntoGroupChat(UUID userId, UUID roomId);
}
