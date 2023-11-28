package com.chatapp.chat.controller;

import com.chatapp.chat.model.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.chatapp.chat.model.Message;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/public-message")
    @SendTo("/chatroom/public")
    public Message recievePublicMessage(@Payload Message message) {
        System.out.println("Message from public chat: "+message.toString());
        return message;
    }

    @MessageMapping("/private-message")
    public Message recievePrivateMessage(@Payload Message message) {
        System.out.println("Mesage: "+ message);
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message);
        System.out.println(message.toString());
        return message;
    }

    @MessageMapping("/room")
    public MessageDTO spreadMessageToRoomId(@Payload MessageDTO message){
        simpMessagingTemplate.convertAndSendToUser(message.getRoom().getId().toString(), "/room", message);
        System.out.println("Mesage: "+ message);
        System.out.println(message.toString());
        return message;
    }

}
