package com.chatapp.chat.controller;

import com.chatapp.chat.model.NewGroupChat;
import com.chatapp.chat.model.RoomDTO;
import com.chatapp.chat.model.SeachObject;
import com.chatapp.chat.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/room")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomDTO> getRoomById(@PathVariable UUID roomId) {
        RoomDTO res = roomService.getRoomById(roomId);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<RoomDTO>(res, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<RoomDTO> updateRoom(@RequestBody RoomDTO dto) {
        RoomDTO res = roomService.updateRoom(dto);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<RoomDTO>(res, HttpStatus.OK);
    }

    @DeleteMapping("/{roomId}")
    public void deleteRoom(@PathVariable UUID roomId) {
        roomService.deleteRoom(roomId);
    }

    @PostMapping("/search")
    public ResponseEntity<List<RoomDTO>> searchJoinedRooms(@RequestBody SeachObject seachObject) {
        if (seachObject == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        List<RoomDTO> res = roomService.searchRoom(seachObject);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<List<RoomDTO>>(res, HttpStatus.OK);
    }
    @PostMapping("/avatar/{roomId}")
    public ResponseEntity<String> updloadRoomAvatar(@RequestParam("fileUpload") MultipartFile fileUpload, @PathVariable UUID roomId) {
        String res = roomService.uploadRoomAvatar(fileUpload, roomId);
        if (res != null) return new ResponseEntity<String>(res, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/group")
    public ResponseEntity<RoomDTO> createGroupChat(@RequestBody NewGroupChat newGroupChat) {
        if (newGroupChat == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        if (newGroupChat.getJoinUserIds().length < 2) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        RoomDTO createdRoom = roomService.createGroupChat(newGroupChat);
        if (createdRoom != null) return new ResponseEntity<RoomDTO>(createdRoom, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/group/{roomId}")
    public ResponseEntity<RoomDTO> unjoinAnGroupChat(@PathVariable UUID roomId) {
        RoomDTO res = roomService.unjoinGroupChat(roomId);
        if (res != null) return new ResponseEntity<RoomDTO>(res, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/group/{userId}/{roomId}")
    public ResponseEntity<RoomDTO> addUserIntoGroupChat(@PathVariable UUID userId, @PathVariable UUID roomId){
        RoomDTO res = roomService.addUserIntoGroupChat(userId, roomId);
        if (res != null) return new ResponseEntity<RoomDTO>(res, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
}
