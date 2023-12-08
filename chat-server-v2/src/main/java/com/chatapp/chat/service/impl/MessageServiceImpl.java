package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.Message;
import com.chatapp.chat.entity.MessageType;
import com.chatapp.chat.entity.Room;
import com.chatapp.chat.entity.User;
import com.chatapp.chat.model.MessageDTO;
import com.chatapp.chat.repository.MessageRepository;
import com.chatapp.chat.repository.RoomRepository;
import com.chatapp.chat.service.MessageService;
import com.chatapp.chat.service.MessageTypeService;
import com.chatapp.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private MessageTypeService messageTypeService;

    @Override

    public MessageDTO createMessage(MessageDTO dto) {
        if (dto == null) return null;
        Room roomEntity = roomRepository.findById(dto.getRoom().getId()).orElse(null);
        if (roomEntity == null) return null;
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;
        MessageType messageType = messageTypeService.getMessageTypeEntityByName("chat");
        if (messageType == null) return null;

        Message messageEntity = new Message();
        messageEntity.setMessageType(messageType);
        messageEntity.setContent(dto.getContent());
        messageEntity.setRoom(roomEntity);
        messageEntity.setUser(currentUser);
        messageEntity.setSendDate(new Date());

        return new MessageDTO(messageRepository.saveAndFlush(messageEntity));
    }

    @Override
    public List<MessageDTO> findTop10PreviousByMileStone(MessageDTO mileStone) {

        List<MessageDTO> data = messageRepository.findTop10ByRoomAndSendDateBeforeOrderBySendDateDesc(mileStone.getRoom().getId(), mileStone.getSendDate(), PageRequest.of(0, 10));
        List<MessageDTO> res = new ArrayList<>();
        for (int i = data.size() - 1; i >= 0; i--) {
            res.add(data.get(i));
        }
        return res;
    }

    @Override
    public Set<MessageDTO> getAllMessagesByRoomId(UUID roomId) {

        return messageRepository.getAllMessagesByRoomId(roomId);
    }
}
