package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.*;
import com.chatapp.chat.model.MessageDTO;
import com.chatapp.chat.model.MessageTypeDTO;
import com.chatapp.chat.model.UserDTO;
import com.chatapp.chat.repository.MessageRepository;
import com.chatapp.chat.repository.RoomRepository;
import com.chatapp.chat.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    @Autowired
    private SetupDataService setupDataService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private RoomService roomService;

    @Override

    public MessageDTO createMessage(MessageDTO dto) {
        if (dto == null) return null;
        Room roomEntity = roomRepository.findById(dto.getRoom().getId()).orElse(null);
        if (roomEntity == null) return null;
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;
        MessageType messageType = messageTypeService.getMessageTypeEntityByName("chat");
        if (messageType == null) setupDataService.setupData();
        messageType = messageTypeService.getMessageTypeEntityByName("chat");
        if (messageType == null) return null;
        if (dto.getMessageType() != null)
            messageType = messageTypeService.getMessageTypeEntityByName(dto.getMessageType().getName());

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

    @Override
    public List<MessageDTO> get20LatestMessagesByRoomId(UUID roomId) {
        List<MessageDTO> data = messageRepository.get20LatestMessagesByRoomId(roomId, PageRequest.of(0, 20));
        List<MessageDTO> res = new ArrayList<>();
        for (int i = data.size() - 1; i >= 0; i--) {
            res.add(data.get(i));
        }
        return res;
    }

    @Override
    public MessageDTO handlerForNotification(MessageDTO dto) {
        MessageType typeEntity = messageTypeService.getMessageTypeEntityByName("notification");
        if (typeEntity == null) setupDataService.setupData();
        typeEntity = messageTypeService.getMessageTypeEntityByName("notification");
        if (typeEntity == null) return null;
        User userEntity = userService.getUserEntityById(dto.getUser().getId());
        if (userEntity == null) return null;

        Message message = new Message();
        message.setSendDate(new Date());
        message.setUser(userEntity);
        message.setMessageType(typeEntity);
        message.setContent(dto.getContent());

        if (dto.getRoom() != null) {
            Room roomEntity = roomRepository.findById(dto.getRoom().getId()).orElse(null);
            if (roomEntity != null) {
                message.setRoom(roomEntity);
            }
        }

        Message res = messageRepository.saveAndFlush(message);

        return new MessageDTO(res);
    }

    @Override
    public void sendMessageTo(String destination, MessageDTO dto) {
        simpMessagingTemplate.convertAndSendToUser(dto.getUser().getId().toString(), destination, dto);
    }

    @Override
    public MessageDTO sendPrivateMessage(MessageDTO messageDTO) {
        if (messageDTO == null) return null;
        if (messageDTO.getUser() == null) return null;
        User currentUser = userService.getUserEntityById(messageDTO.getUser().getId());
        if (currentUser == null) return null;
        Room roomEntity = roomRepository.findById(messageDTO.getRoom().getId()).orElse(null);
        if (roomEntity == null) return null;
        Message messageEntity = new Message();
        messageEntity.setRoom(roomEntity);
        messageEntity.setContent(messageDTO.getContent());
        if (messageDTO.getMessageType() == null) return null;
        MessageType messageTypeEntity = messageTypeService.getMessageTypeEntityByName(messageDTO.getMessageType().getName());
        if (messageTypeEntity == null) {
            setupDataService.setupData();
        }
        messageTypeEntity = messageTypeService.getMessageTypeEntityByName(messageDTO.getMessageType().getName());
        if (messageTypeEntity == null) return null;
        messageEntity.setMessageType(messageTypeEntity);
        messageEntity.setSendDate(new Date());
        messageEntity.setUser(currentUser);
        Message res = messageRepository.saveAndFlush(messageEntity);

        List<MessageDTO> latestMessages = get20LatestMessagesByRoomId(res.getRoom().getId());

        MessageDTO resDto = new MessageDTO(res);
        if (resDto == null) return null;
        resDto.getRoom().setMessages(latestMessages);

        Set<UserRoom> userRooms = roomEntity.getUserRooms();
        List<User> users = new ArrayList<>();
        for (UserRoom ur : userRooms) {
            users.add(ur.getUser());
        }

        for (User user : users) {
            if (currentUser.getId() != user.getId())
                simpMessagingTemplate.convertAndSendToUser(user.getId().toString(), "/privateMessage", resDto);
        }

        return resDto;
    }
}
