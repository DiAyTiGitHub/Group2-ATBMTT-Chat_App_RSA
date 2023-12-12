package com.chatapp.chat.controller;

import com.chatapp.chat.model.RoomDTO;
import com.chatapp.chat.model.SeachObject;
import com.chatapp.chat.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<RoomDTO>> searchRoom(@RequestBody SeachObject seachObject) {
        if (seachObject == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        List<RoomDTO> res = roomService.searchRoom(seachObject);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<List<RoomDTO>>(res, HttpStatus.OK);
    }
}
