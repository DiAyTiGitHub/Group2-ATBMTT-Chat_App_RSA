package com.chatapp.chat.controller;

import com.chatapp.chat.model.MessageDTO;
import com.chatapp.chat.model.MessageTypeDTO;
import com.chatapp.chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
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
    public ResponseEntity<MessageDTO> createMessageInRoom(@RequestBody MessageDTO dto) {
        MessageDTO res = messageService.createMessage(dto);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<MessageDTO>(res, HttpStatus.OK);
    }

    @GetMapping("/mileStone")
    public ResponseEntity<List<MessageDTO>> getTop10PreviousByMileStone(@RequestBody MessageDTO dto) {
        List<MessageDTO> res = messageService.findTop10PreviousByMileStone(dto);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<List<MessageDTO>>(res, HttpStatus.OK);
    }

    @GetMapping("/latest/{roomId}")
    public ResponseEntity<List<MessageDTO>> get20LatestMessages(@PathVariable UUID roomId) {
        List<MessageDTO> res = messageService.get20LatestMessagesByRoomId(roomId);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<List<MessageDTO>>(res, HttpStatus.OK);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<Set<MessageDTO>> getAllMessagesByRoomId(@PathVariable UUID roomId) {
        Set<MessageDTO> res = messageService.getAllMessagesByRoomId(roomId);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<MessageDTO>>(res, HttpStatus.OK);
    }

}
