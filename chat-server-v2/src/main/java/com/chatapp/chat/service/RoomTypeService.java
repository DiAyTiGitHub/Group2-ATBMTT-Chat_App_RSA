package com.chatapp.chat.service;

import com.chatapp.chat.entity.RoomType;
import com.chatapp.chat.model.RoomTypeDTO;

import java.util.Set;
import java.util.UUID;

public interface RoomTypeService {
    public Set<RoomTypeDTO> getAllRoomTypes();

    public RoomTypeDTO createRoomType(RoomTypeDTO dto);

    public RoomTypeDTO updateRoomType(RoomTypeDTO dto);

    public void deleteRoomType(UUID roomTypeId);

    public RoomTypeDTO getRoomTypeById(UUID roomTypeId);

    public RoomType getRoomTypeEntityByName(String roomTypeName);

}