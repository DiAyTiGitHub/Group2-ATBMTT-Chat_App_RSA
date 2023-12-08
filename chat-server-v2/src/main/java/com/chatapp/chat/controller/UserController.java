package com.chatapp.chat.controller;

import com.chatapp.chat.model.*;
import com.chatapp.chat.service.UserService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;
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

    @GetMapping(value = "/friends")
    public ResponseEntity<Set<UserDTO>> getAllFriends() {
        Set<UserDTO> friends = userService.getAllFiends();
        if (friends == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<UserDTO>>(friends, HttpStatus.OK);
    }

    @GetMapping("/joinedRoom")
    public ResponseEntity<Set<RoomDTO>> getAllJoinedRooms() {
        Set<RoomDTO> rooms = userService.getAllJoinedRooms();
        if (rooms == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<RoomDTO>>(rooms, HttpStatus.OK);
    }

    @GetMapping("/privateRooms")
    public ResponseEntity<Set<RoomDTO>> getAllPrivateRooms() {
        Set<RoomDTO> rooms = userService.getAllPrivateRooms();
        if (rooms == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<RoomDTO>>(rooms, HttpStatus.OK);
    }

    @GetMapping("/publicRooms")
    public ResponseEntity<Set<RoomDTO>> getAllPublicRooms() {
        Set<RoomDTO> rooms = userService.getAllPublicRooms();
        if (rooms == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<RoomDTO>>(rooms, HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<Set<UserDTO>> searchUsers(@RequestBody SeachObject seachObject) {
        Set<UserDTO> users = userService.searchUsers(seachObject.getKeyword());
        if (users == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<UserDTO>>(users, HttpStatus.OK);
    }

    @PostMapping("/searchExcludeSelf")
    public ResponseEntity<Set<UserDTO>> searchUsersExcludeSelf(@RequestBody SeachObject seachObject) {
        Set<UserDTO> users = userService.searchUsersExcludeSelf(seachObject.getKeyword());
        if (users == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<UserDTO>>(users, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Set<UserDTO>> getAllUsers() {
        Set<UserDTO> rooms = userService.getAllUsers();
        if (rooms == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<UserDTO>>(rooms, HttpStatus.OK);
    }

    @GetMapping("/addFriendRequests")
    public ResponseEntity<Set<FriendDTO>> getAddFriendRequests() {
        Set<FriendDTO> res = userService.getAddFriendRequests();
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<FriendDTO>>(res, HttpStatus.OK);
    }

    @GetMapping("/pendingFriendRequests")
    public ResponseEntity<Set<FriendDTO>> getPendingFriendRequests() {
        Set<FriendDTO> res = userService.getPendingFriendRequests();
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<FriendDTO>>(res, HttpStatus.OK);
    }

    @Value("${app.upload.dir}") // Configured in application.properties or application.yml
    private String uploadDir;


    @PostMapping("/avatar")
    public ResponseEntity<String> uploadAvatar(@RequestParam("fileUpload") MultipartFile fileUpload) {
        LocalDateTime myObj = LocalDateTime.now();
        UserDTO loginUser = userService.getCurrentLoginUser();

        try {
            Path pathImg = Paths.get(uploadDir);

            InputStream inputStream = fileUpload.getInputStream();
            String ext = FilenameUtils.getExtension(fileUpload.getOriginalFilename());
            DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyyHHmmss");

            String formattedDate = myObj.format(myFormatObj);
            String nameFile = loginUser.getUsername() + "_" + formattedDate + "." + ext;
            Files.copy(inputStream, pathImg.resolve(nameFile),
                    StandardCopyOption.REPLACE_EXISTING);
            loginUser.setAvatar(nameFile);
            UserDTO res = userService.updateUserInfo(loginUser);
            return new ResponseEntity<String>(res.getAvatar(), HttpStatus.OK);

        } catch (Exception e) {
            System.err.println(e);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
}
