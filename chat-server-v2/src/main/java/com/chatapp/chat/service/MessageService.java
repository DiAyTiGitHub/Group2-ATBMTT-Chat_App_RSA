package com.chatapp.chat.service;

import com.chatapp.chat.model.MessageDTO;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface MessageService {
    public MessageDTO createMessage(MessageDTO dto);

    public List<MessageDTO> findTop10PreviousByMileStone(MessageDTO mileStone);

    public Set<MessageDTO> getAllMessagesByRoomId(UUID roomId);

    public List<MessageDTO> get20LatestMessagesByRoomId(UUID roomId);

    public MessageDTO handlerForNotification(MessageDTO dto);
}
