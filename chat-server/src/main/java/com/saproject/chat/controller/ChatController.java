package com.saproject.chat.controller;

import com.saproject.chat.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

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

}
