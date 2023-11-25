package com.chatapp.chat.service;

import com.chatapp.chat.model.MessageTypeDTO;

import java.util.Set;
import java.util.UUID;

public interface MessageTypeService {
    public Set<MessageTypeDTO> getAllMessageTypes();

    public MessageTypeDTO createMessageType(MessageTypeDTO dto);

    public MessageTypeDTO updateMessageType(MessageTypeDTO dto);

    public void deleteMessageType(UUID MessageTypeId);

    public MessageTypeDTO getMessageTypeById(UUID MessageTypeId);

}