package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.MessageType;
import com.chatapp.chat.entity.RoomType;
import com.chatapp.chat.model.MessageTypeDTO;
import com.chatapp.chat.repository.MessageTypeRepository;
import com.chatapp.chat.service.MessageTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MessageTypeServiceImpl implements MessageTypeService {
    @Autowired
    private MessageTypeRepository messageTypeRepository;

    @Override
    public Set<MessageTypeDTO> getAllMessageTypes() {
        List<MessageType> entities = (ArrayList<MessageType>) messageTypeRepository.findAll();
        Set<MessageTypeDTO> res = new HashSet<>();
        for (MessageType entity : entities) {
            res.add(new MessageTypeDTO(entity));
        }
        return res;
    }

    @Override
    public MessageTypeDTO createMessageType(MessageTypeDTO dto) {
        if (dto == null)
            return null;
        MessageType entity = new MessageType();

        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());

        MessageType responseEntity = messageTypeRepository.save(entity);
        if (responseEntity == null) return null;
        return new MessageTypeDTO(responseEntity);
    }

    @Override
    public MessageTypeDTO updateMessageType(MessageTypeDTO dto) {
        if (dto == null)
            return null;

        MessageType entity = messageTypeRepository.findById(dto.getId()).orElse(null);
        if (entity == null) return null;

        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());

        MessageType responseEntity = messageTypeRepository.save(entity);
        if (responseEntity == null) return null;
        return new MessageTypeDTO(responseEntity);
    }

    @Override
    public void deleteMessageType(UUID MessageTypeId) {
        MessageType entity = messageTypeRepository.findById(MessageTypeId).orElse(null);
        if (entity == null) return;
        messageTypeRepository.delete(entity);
    }

    @Override
    public MessageTypeDTO getMessageTypeById(UUID MessageTypeId) {
        MessageType entity = messageTypeRepository.findById(MessageTypeId).orElse(null);
        if (entity == null) return null;
        return new MessageTypeDTO(entity);
    }
}
