package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.Room;
import com.chatapp.chat.entity.RoomType;
import com.chatapp.chat.entity.User;
import com.chatapp.chat.entity.UserRoom;
import com.chatapp.chat.model.MessageDTO;
import com.chatapp.chat.model.RoomDTO;
import com.chatapp.chat.model.UserDTO;
import com.chatapp.chat.repository.RoomRepository;
import com.chatapp.chat.service.RoomService;
import com.chatapp.chat.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomTypeService roomTypeService;

    @Override
    public Set<UserDTO> getAllJoinedUsersByRoomId(UUID roomId) {
        Room entity = roomRepository.findById(roomId).orElse(null);
        if (entity == null)
            return null;
        Set<UserRoom> userRooms = entity.getUserRooms();
        TreeSet<UserDTO> joinedUsers = new TreeSet<>(new Comparator<UserDTO>() {
            @Override
            public int compare(UserDTO o1, UserDTO o2) {
                return o1.getUsername().compareTo(o2.getUsername());
            }
        });

        for (UserRoom userRoom : userRooms) {
            User joinedUser = userRoom.getUser();
            joinedUsers.add(new UserDTO(joinedUser));
        }

        return joinedUsers;
    }

    @Override
    public RoomDTO createRoom(RoomDTO dto) {
        if (dto == null) return null;

        Room res = createRoomEntity(dto);

        if (res == null)
            return null;
        return new RoomDTO(res);
    }

    @Override
    public RoomDTO updateRoom(RoomDTO dto) {
        if (dto == null) return null;

        Room entity = roomRepository.findById(dto.getId()).orElse(null);
        if (entity == null) return null;

        entity.setCode(dto.getCode());
        entity.setAvatar(dto.getAvatar());
        entity.setColor(dto.getColor());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCreateDate(new Date());
        if (dto.getRoomType() != null && dto.getRoomType().getId() != entity.getRoomType().getId()) {
            RoomType roomType = roomTypeService.getRoomTypeEntityById(dto.getRoomType().getId());
            if (roomType == null) roomType = roomTypeService.getRoomTypeEntityByName(dto.getRoomType().getName());
            if (roomType != null) entity.setRoomType(roomType);
        }

        Room responseEntity = roomRepository.save(entity);

        return new RoomDTO(responseEntity);
    }

    @Override
    public void deleteRoom(UUID roomId) {
        Room entity = roomRepository.findById(roomId).orElse(null);
        if (entity == null) return;
        roomRepository.delete(entity);
    }

    @Override
    public Set<MessageDTO> pagingLatestMessage(UUID earliestMessageId) {
        return null;
    }

    @Override
    public RoomDTO getRoomById(UUID roomId) {
        Room entity = roomRepository.findById(roomId).orElse(null);
        if (entity == null) return null;
        return new RoomDTO(entity);
    }

    @Override
    public Room createRoomEntity(RoomDTO dto) {
        if (dto == null) return null;

        Room entity = new Room();
        entity.setCode(dto.getCode());
        entity.setAvatar(dto.getAvatar());
        entity.setColor(dto.getColor());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCreateDate(new Date());
        if (dto.getRoomType() != null) {
            RoomType roomType = roomTypeService.getRoomTypeEntityById(dto.getRoomType().getId());
            if (roomType == null) roomType = roomTypeService.getRoomTypeEntityByName(dto.getRoomType().getName());
            if (roomType != null) entity.setRoomType(roomType);
        }

        Room responseEntity = roomRepository.save(entity);

        return responseEntity;
    }
}
