package com.chatapp.chat.controller;

import com.chatapp.chat.model.RoomDTO;
import com.chatapp.chat.model.RoomTypeDTO;
import com.chatapp.chat.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/roomType")
public class RoomTypeController {
    @Autowired
    private RoomTypeService roomTypeService;

    @GetMapping("/{roomTypeId}")
    public ResponseEntity<RoomTypeDTO> getRoomTypeById(@PathVariable UUID roomTypeId) {
        RoomTypeDTO res = roomTypeService.getRoomTypeById(roomTypeId);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<RoomTypeDTO>(res, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Set<RoomTypeDTO>> getAllRoomType() {
        Set<RoomTypeDTO> res = roomTypeService.getAllRoomTypes();
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<RoomTypeDTO>>(res, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RoomTypeDTO> createRoomType(@RequestBody RoomTypeDTO dto) {
        RoomTypeDTO res = roomTypeService.createRoomType(dto);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<RoomTypeDTO>(res, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<RoomTypeDTO> updateRoomType(@RequestBody RoomTypeDTO dto) {
        RoomTypeDTO res = roomTypeService.updateRoomType(dto);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<RoomTypeDTO>(res, HttpStatus.OK);
    }
}
