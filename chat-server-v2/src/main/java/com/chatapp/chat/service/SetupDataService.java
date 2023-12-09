package com.chatapp.chat.service;

import com.chatapp.chat.entity.MessageType;
import com.chatapp.chat.entity.Room;
import com.chatapp.chat.entity.RoomType;
import com.chatapp.chat.model.MessageTypeDTO;
import com.chatapp.chat.model.RoomTypeDTO;
import com.chatapp.chat.repository.MessageTypeRepository;
import com.chatapp.chat.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SetupDataService {
    @Autowired
    private RoomTypeService roomTypeService;
    @Autowired
    private MessageTypeService messageTypeService;
    @Autowired
    private MessageTypeRepository messageTypeRepository;
    @Autowired
    private RoomTypeRepository roomTypeRepository;

    public void setupData() {
        setupMessageType();
        setupRoomType();
    }

    private void setupRoomType(){
        RoomType privates = roomTypeService.getRoomTypeEntityByName("private");
        if (privates == null){
            RoomTypeDTO dto = new RoomTypeDTO();
            dto.setCode("001");
            dto.setName("private");
            dto.setDescription("private room is for 2 people chatting");
            roomTypeService.createRoomType(dto);
        }

        RoomType pub = roomTypeService.getRoomTypeEntityByName("public");
        if (pub == null){
            RoomTypeDTO dto = new RoomTypeDTO();
            dto.setCode("002");
            dto.setName("public");
            dto.setDescription("public room is for multiple people chatting");
            roomTypeService.createRoomType(dto);
        }

        RoomType group = roomTypeService.getRoomTypeEntityByName("group");
        if(group == null){
            RoomTypeDTO dto = new RoomTypeDTO();
            dto.setCode("003");
            dto.setName("group");
            dto.setDescription("is private room chat for at least 3 people");
            roomTypeService.createRoomType(dto);
        }
    }

    private void setupMessageType(){
        MessageType joined = messageTypeService.getMessageTypeEntityByName("join");
        if (joined == null){
            MessageTypeDTO dto = new MessageTypeDTO();
            dto.setCode("001");
            dto.setName("join");
            dto.setDescription("new user joined conversation");
            messageTypeService.createMessageType(dto);
        }

        MessageType left = messageTypeService.getMessageTypeEntityByName("left");
        if (left == null){
            MessageTypeDTO dto = new MessageTypeDTO();
            dto.setCode("002");
            dto.setName("left");
            dto.setDescription("an user had left the conversation");
            messageTypeService.createMessageType(dto);
        }

        MessageType chat = messageTypeService.getMessageTypeEntityByName("chat");
        if (chat == null){
            MessageTypeDTO dto = new MessageTypeDTO();
            dto.setCode("003");
            dto.setName("chat");
            dto.setDescription("a common message in the conversation");
            messageTypeService.createMessageType(dto);
        }

        MessageType notification = messageTypeService.getMessageTypeEntityByName("notification");
        if (notification == null){
            MessageTypeDTO dto = new MessageTypeDTO();
            dto.setCode("004");
            dto.setName("notification");
            dto.setDescription("is a notification");
            messageTypeService.createMessageType(dto);
        }
    }
}
