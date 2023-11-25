package com.chatapp.chat.controller;

import com.chatapp.chat.entity.User;
import com.chatapp.chat.model.UserDTO;
import com.chatapp.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping(value = "/currentLoginUser")
    public ResponseEntity<UserDTO> getCurrentLoginUser() {
        UserDTO currentUser = userService.getCurrentLoginUser();
        if (currentUser != null)
            return new ResponseEntity<UserDTO>(currentUser, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable UUID userId) {
        UserDTO user = userService.getUserById(userId);
        if (user != null)
            return new ResponseEntity<UserDTO>(user, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }


}
