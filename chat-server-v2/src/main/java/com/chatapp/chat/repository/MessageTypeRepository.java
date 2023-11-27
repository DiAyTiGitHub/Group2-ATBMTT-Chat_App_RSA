package com.chatapp.chat.repository;

import com.chatapp.chat.entity.MessageType;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface MessageTypeRepository extends CrudRepository<MessageType, UUID> {
    public MessageType findByName(String name);
}
