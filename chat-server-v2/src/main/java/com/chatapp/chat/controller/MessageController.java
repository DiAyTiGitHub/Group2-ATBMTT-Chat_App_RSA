package com.chatapp.chat.controller;

import com.chatapp.chat.model.MessageDTO;
import com.chatapp.chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/message")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping
    public MessageDTO createMessageInRoom(@RequestBody MessageDTO dto) {
        return messageService.createMessage(dto);
    }

    @PostMapping("/mileStone")
    public List<MessageDTO> findTop10PreviousByMileStone(@RequestBody MessageDTO dto) {
        return messageService.findTop10PreviousByMileStone(dto);
    }

    @GetMapping("/{roomId}")
    public Set<MessageDTO> getAllMessagesByRoomId(@PathVariable UUID roomId) {
        return messageService.getAllMessagesByRoomId(roomId);
    }
}
