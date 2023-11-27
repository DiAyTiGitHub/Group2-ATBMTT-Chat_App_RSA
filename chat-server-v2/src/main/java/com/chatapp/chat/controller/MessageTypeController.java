package com.chatapp.chat.controller;

import com.chatapp.chat.model.MessageTypeDTO;
import com.chatapp.chat.service.MessageTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/messageType")
public class MessageTypeController {
    @Autowired
    private MessageTypeService messageTypeService;

    @GetMapping("/{messageTypeId}")
    public ResponseEntity<MessageTypeDTO> getMessageTypeById(@PathVariable UUID messageTypeId) {
        MessageTypeDTO res = messageTypeService.getMessageTypeById(messageTypeId);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<MessageTypeDTO>(res, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Set<MessageTypeDTO>> getAllMessageType() {
        Set<MessageTypeDTO> res = messageTypeService.getAllMessageTypes();
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<MessageTypeDTO>>(res, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MessageTypeDTO> createMessageType(@RequestBody MessageTypeDTO dto) {
        MessageTypeDTO res = messageTypeService.createMessageType(dto);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<MessageTypeDTO>(res, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<MessageTypeDTO> updateMessageType(@RequestBody MessageTypeDTO dto) {
        MessageTypeDTO res = messageTypeService.updateMessageType(dto);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<MessageTypeDTO>(res, HttpStatus.OK);
    }

    @DeleteMapping("/{messageTypeId}")
    public void deleteMessageType(@PathVariable UUID messageTypeId){
        messageTypeService.deleteMessageType(messageTypeId);
    }
}
