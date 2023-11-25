package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.RoomType;
import com.chatapp.chat.model.RoomTypeDTO;
import com.chatapp.chat.repository.RoomTypeRepository;
import com.chatapp.chat.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomTypeServiceImpl implements RoomTypeService {
    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Override
    public Set<RoomTypeDTO> getAllRoomTypes() {
        List<RoomType> entities = (ArrayList<RoomType>) roomTypeRepository.findAll();
        Set<RoomTypeDTO> res = new HashSet<>();
        for (RoomType entity : entities) {
            res.add(new RoomTypeDTO(entity));
        }
        return res;
    }

    @Override
    public RoomTypeDTO createRoomType(RoomTypeDTO dto) {
        if (dto == null)
            return null;
        RoomType entity = new RoomType();

        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());

        RoomType responseEntity = roomTypeRepository.save(entity);
        if (responseEntity == null) return null;
        return new RoomTypeDTO(responseEntity);
    }

    @Override
    public RoomTypeDTO updateRoomType(RoomTypeDTO dto) {
        if (dto == null)
            return null;

        RoomType entity = roomTypeRepository.findById(dto.getId()).orElse(null);
        if (entity == null) return null;

        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());

        RoomType responseEntity = roomTypeRepository.save(entity);
        if (responseEntity == null) return null;
        return new RoomTypeDTO(responseEntity);
    }

    @Override
    public void deleteRoomType(UUID roomTypeId) {
        RoomType entity = roomTypeRepository.findById(roomTypeId).orElse(null);
        if (entity == null) return;
        roomTypeRepository.delete(entity);
    }

    @Override
    public RoomTypeDTO getRoomTypeById(UUID roomTypeId) {
        RoomType entity = roomTypeRepository.findById(roomTypeId).orElse(null);
        if (entity == null) return null;
        return new RoomTypeDTO(entity);
    }

    @Override
    public RoomType getRoomTypeEntityByName(String roomTypeName) {
        return roomTypeRepository.findByName(roomTypeName);
    }

    @Override
    public RoomType getRoomTypeEntityById(UUID roomTypeId) {
        return roomTypeRepository.findById(roomTypeId).orElse(null);
    }
}
