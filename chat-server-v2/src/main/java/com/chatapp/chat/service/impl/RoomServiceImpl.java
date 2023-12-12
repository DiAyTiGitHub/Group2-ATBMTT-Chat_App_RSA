package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.Room;
import com.chatapp.chat.entity.RoomType;
import com.chatapp.chat.entity.User;
import com.chatapp.chat.entity.UserRoom;
import com.chatapp.chat.model.*;
import com.chatapp.chat.repository.RoomRepository;
import com.chatapp.chat.repository.UserRoomRepository;
import com.chatapp.chat.service.MessageService;
import com.chatapp.chat.service.RoomService;
import com.chatapp.chat.service.RoomTypeService;
import com.chatapp.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomTypeService roomTypeService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRoomRepository userRoomRepository;

    @Autowired
    private MessageService messageService;

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

    @Override
    public RoomDTO handleAddJoinedUserIntoRoomDTO(Room room) {
        RoomDTO data = new RoomDTO(room);
        data.setParticipants(this.getAllJoinedUsersByRoomId(data.getId()));
        return data;
    }

    @Override
    public List<RoomDTO> searchRoom(SeachObject seachObject) {
        User currenUser = userService.getCurrentLoginUserEntity();
        if (currenUser == null) return null;
        List<UserRoomDTO> userRooms = userRoomRepository.searchRoomByKeyword(seachObject.getKeyword().toLowerCase().trim());

        if (userRooms == null) return null;
        List<RoomDTO> rooms = new ArrayList<>();

        Set<UUID> storedRoomIds = new HashSet<>();

        for (UserRoomDTO userRoom : userRooms) {
            Room room = roomRepository.findById(userRoom.getRoom().getId()).orElse(null);
            if (room == null) continue;
            if (storedRoomIds.contains(room.getId())) continue;
            storedRoomIds.add(room.getId());
            RoomDTO roomDto = handleAddJoinedUserIntoRoomDTO(room);
            boolean containsCurrentUser = false;
            for (UserDTO userDto : roomDto.getParticipants()) {
                if (userDto.getId().equals(currenUser.getId())) {
                    containsCurrentUser = true;
                    break;
                }
            }
            if (!containsCurrentUser) continue;
            List<MessageDTO> messages = messageService.get20LatestMessagesByRoomId(roomDto.getId());
            roomDto.setMessages(messages);
            rooms.add(roomDto);
        }

        UserServiceImpl.sortRoomDTOInLastestMessagesOrder(rooms);

        return rooms;
    }
}
