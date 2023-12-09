package com.chatapp.chat.controller;

import com.chatapp.chat.model.MessageDTO;
import com.chatapp.chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.chatapp.chat.model.Message;

import java.util.List;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private MessageService messageService;

    @MessageMapping("/public-message")
    @SendTo("/chatroom/public")
    public Message recievePublicMessage(@Payload Message message) {
        System.out.println("Message from public chat: " + message.toString());
        return message;
    }

    @MessageMapping("/notification")
    public ResponseEntity<MessageDTO> receiveNotification(@Payload MessageDTO message) {
        if (message == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        message = messageService.handlerForNotification(message);
        simpMessagingTemplate.convertAndSendToUser(message.getUser().getId().toString(), "/notification", message);
        return new ResponseEntity<MessageDTO>(message, HttpStatus.OK);
    }

    @MessageMapping("/room")
    public ResponseEntity<MessageDTO> spreadMessageToRoomId(@Payload MessageDTO message) {
        MessageDTO res = messageService.createMessage(message);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        simpMessagingTemplate.convertAndSendToUser(message.getRoom().getId().toString(), "/room", message);
        return new ResponseEntity<MessageDTO>(res, HttpStatus.OK);
    }

}
