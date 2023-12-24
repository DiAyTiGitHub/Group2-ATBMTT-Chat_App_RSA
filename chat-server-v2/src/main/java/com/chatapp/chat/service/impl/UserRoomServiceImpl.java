package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.Room;
import com.chatapp.chat.entity.User;
import com.chatapp.chat.entity.UserRoom;
import com.chatapp.chat.model.UserRoomDTO;
import com.chatapp.chat.repository.RoomRepository;
import com.chatapp.chat.repository.UserRepository;
import com.chatapp.chat.repository.UserRoomRepository;
import com.chatapp.chat.service.UserRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserRoomServiceImpl implements UserRoomService {
    @Autowired
    private UserRoomRepository userRoomRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public UserRoom createUserRoomEntity(UserRoomDTO dto) {
        if (dto == null || dto.getUser() == null || dto.getRoom() == null) return null;
        UserRoom entity = new UserRoom();
        User user = userRepository.findById(dto.getUser().getId()).orElse(null);
        if (user == null) return null;
        Room room = roomRepository.findById(dto.getRoom().getId()).orElse(null);
        if (room == null) return null;
        entity.setUser(user);
        entity.setRoom(room);
        entity.setRole("Member");
        if (dto.getRole() != null && !dto.getRole().trim().equals("")) entity.setRole(dto.getRole());
        entity.setNickName(user.getUsername());

        UserRoom responseEntity = userRoomRepository.save(entity);
        return responseEntity;
    }

    @Override
    public UserRoomDTO createUserRoom(UserRoomDTO dto) {
        UserRoom responseEntity = createUserRoomEntity(dto);
        return new UserRoomDTO(responseEntity);
    }

    @Override
    public UserRoomDTO updateUserRoom(UserRoomDTO dto) {
        if (dto == null) return null;
        UserRoom entity = userRoomRepository.findById(dto.getId()).orElse(null);
        if (entity == null) return null;
        UserRoom newEntity = createUserRoomEntity(dto);
        newEntity.setId(entity.getId());
        entity = newEntity;
        UserRoom response = userRoomRepository.save(entity);
        if (response == null) return null;
        return new UserRoomDTO(response);
    }

    @Override
    public void deleteUserRoom(UUID userRoomId) {
        UserRoom entity = userRoomRepository.findById(userRoomId).orElse(null);
        if (entity == null) return;
        userRoomRepository.delete(entity);
    }
}
