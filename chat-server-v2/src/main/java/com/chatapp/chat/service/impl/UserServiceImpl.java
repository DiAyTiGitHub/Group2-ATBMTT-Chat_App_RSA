package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.*;
import com.chatapp.chat.model.*;
import com.chatapp.chat.repository.MessageRepository;
import com.chatapp.chat.repository.RSAKeyRepository;
import com.chatapp.chat.repository.UserRepository;
import com.chatapp.chat.service.MessageService;
import com.chatapp.chat.service.RoomService;
import com.chatapp.chat.service.UserService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomService roomService;
    @Autowired
    private MessageService messageService;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private RSAKeyRepository rsaKeyRepository;

    @Override
    public UserDTO getCurrentLoginUser() {
        User currentUser = getCurrentLoginUserEntity();
        if (currentUser == null)
            return null;
        return new UserDTO(currentUser);
    }

    @Override
    public UserDTO getUserById(UUID userId) {
        User entity = userRepository.findById(userId).orElse(null);
        if (entity != null) return new UserDTO(entity);
        return null;
    }

    @Override
    public UserDTO getUserByName(String userName) {
        User entity = userRepository.findByUsername(userName);
        if (entity == null) return null;
        return new UserDTO(entity);
    }

    @Override
    public Set<UserDTO> getAllFiends() {
        User currentUser = getCurrentLoginUserEntity();

        Set<User> friends = new HashSet<User>();
        for (Friend relationship : currentUser.getFriendFromRequest()) {
            if (relationship.getState()) {
                User requestReceiver = relationship.getReceiver();
                friends.add(requestReceiver);
            }
        }
        for (Friend relationship : currentUser.getFriendFromReceive()) {
            if (relationship.getState()) {
                User requestSender = relationship.getRequestSender();
                friends.add(requestSender);
            }
        }

        Set<UserDTO> friendList = new HashSet<UserDTO>();
        for (User friend : friends) {
            friendList.add(new UserDTO(friend));
        }

        return friendList;
    }

    @Override
    public List<RoomDTO> getAllJoinedRooms() {
        User currentUser = getCurrentLoginUserEntity();
        if (currentUser == null)
            return null;
        Set<UserRoom> userRooms = currentUser.getUserRooms();
        if (userRooms == null) return null;
        List<RoomDTO> rooms = new ArrayList<>();

        for (UserRoom userRoom : userRooms) {
            Room room = userRoom.getRoom();
            RoomDTO roomDto = roomService.handleAddJoinedUserIntoRoomDTO(room);
            List<MessageDTO> messages = messageService.get20LatestMessagesByRoomId(roomDto.getId());
            roomDto.setMessages(messages);
            rooms.add(roomDto);
        }

        sortRoomDTOInLastestMessagesOrder(rooms);

        return rooms;
    }

    public static void sortRoomDTOInLastestMessagesOrder(List<RoomDTO> rooms) {
        Collections.sort(rooms, new Comparator<RoomDTO>() {
            @Override
            public int compare(RoomDTO o1, RoomDTO o2) {
                if (o1.getMessages().size() == 0) return 1;
                if (o2.getMessages().size() == 0) return -1;
                Date lastMessageRoom1 = o1.getMessages().get(o1.getMessages().size() - 1).getSendDate();
                Date lastMessageRoom2 = o2.getMessages().get(o2.getMessages().size() - 1).getSendDate();
                int compareRes = lastMessageRoom1.compareTo(lastMessageRoom2);
                if (compareRes == -1) return 1;
                if (compareRes == 1) return -1;
                return 0;
            }
        });
    }

    @Override
    public List<RoomDTO> getAllPrivateRooms() {
        User currentUser = getCurrentLoginUserEntity();
        if (currentUser == null)
            return null;

        Set<UserRoom> userRooms = currentUser.getUserRooms();
        if (userRooms == null) return null;
        List<RoomDTO> rooms = new ArrayList<>();

        for (UserRoom userRoom : userRooms) {
            Room room = userRoom.getRoom();
            if (room.getRoomType().getName().trim().toLowerCase().equals("private")) {
                RoomDTO roomDto = roomService.handleAddJoinedUserIntoRoomDTO(room);
                List<MessageDTO> messages = messageService.get20LatestMessagesByRoomId(roomDto.getId());
                roomDto.setMessages(messages);
                rooms.add(roomDto);
            }
        }

        sortRoomDTOInLastestMessagesOrder(rooms);

        return rooms;
    }

    @Override
    public List<RoomDTO> getAllPublicRooms() {
        User currentUser = getCurrentLoginUserEntity();
        if (currentUser == null)
            return null;

        Set<UserRoom> userRooms = currentUser.getUserRooms();
        if (userRooms == null) return null;
        List<RoomDTO> rooms = new ArrayList<>();

        for (UserRoom userRoom : userRooms) {
            Room room = userRoom.getRoom();
            if (room.getRoomType().getName().trim().toLowerCase().equals("public")) {
                RoomDTO roomDto = roomService.handleAddJoinedUserIntoRoomDTO(room);
                List<MessageDTO> messages = messageService.get20LatestMessagesByRoomId(roomDto.getId());
                roomDto.setMessages(messages);
                rooms.add(roomDto);
            }
        }

        sortRoomDTOInLastestMessagesOrder(rooms);


        return rooms;
    }

    @Override
    public User getCurrentLoginUserEntity() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String currentUserName = auth.getName();
        if (currentUserName == null) return null;
        User currentUser = userRepository.findByUsername(currentUserName);

        return currentUser;
    }

    @Override
    public User getUserEntityById(UUID userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public Set<UserDTO> searchUsers(String searchString) {
        searchString = insertPercentageBetweenCharacters(searchString);
        Set<UserDTO> users = userRepository.searchUsers(searchString);
        return users;
    }

    private String insertPercentageBetweenCharacters(String input) {
        if (input == null || input.isEmpty()) {
            return input; // Return unchanged for empty or null input
        }

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < input.length(); i++) {
            result.append(input.charAt(i));
            if (i < input.length() - 1) {
                result.append('%');
            }
        }

        return result.toString();
    }

    @Override
    public Set<UserDTO> getAllUsers() {
        List<User> entities = (List<User>) userRepository.findAll();
        Set<UserDTO> res = new HashSet<>();
        for (User entity : entities) {
            res.add((new UserDTO(entity)));
        }
        return res;
    }

    @Override
    public Set<UserDTO> searchUsersExcludeSelf(String searchString) {
        User currentUser = getCurrentLoginUserEntity();
        searchString = insertPercentageBetweenCharacters(searchString);
        Set<UserDTO> users = userRepository.searchUsersExclude(searchString, currentUser.getId());
        return users;
    }

    @Override
    public Set<FriendDTO> getAddFriendRequests() {
        User currentUser = getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        Set<FriendDTO> res = new TreeSet<FriendDTO>(
                Collections.reverseOrder(new Comparator<FriendDTO>() {
                    @Override
                    public int compare(FriendDTO o1, FriendDTO o2) {
                        return (o1.getLastModifyDate().compareTo(o2.getLastModifyDate()));
                    }
                })
        );

        for (Friend relationship : currentUser.getFriendFromReceive()) {
            if (relationship.getState() == false) {
                res.add(new FriendDTO(relationship));
            }
        }

        return res;
    }

    @Override
    public Set<FriendDTO> getPendingFriendRequests() {
        User currentUser = getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        Set<FriendDTO> res = new TreeSet<FriendDTO>(
                Collections.reverseOrder(new Comparator<FriendDTO>() {
                    @Override
                    public int compare(FriendDTO o1, FriendDTO o2) {
                        return (o1.getLastModifyDate().compareTo(o2.getLastModifyDate()));
                    }
                })
        );

        for (Friend relationship : currentUser.getFriendFromRequest()) {
            if (relationship.getState() == false) {
                res.add(new FriendDTO(relationship));
            }
        }

        return res;
    }

    @Override
    public UserDTO updateUserInfo(UserDTO dto) {
        if (dto == null) return null;
        User entity = getCurrentLoginUserEntity();
        if (entity == null) return null;
        entity.setAvatar(dto.getAvatar());
        entity.setAddress(dto.getAddress());
        entity.setBirthDate(dto.getBirthDate());
        entity.setFullname(dto.getFullname());
        entity.setGender(dto.getGender());
        return new UserDTO(userRepository.save(entity));
    }

    @Value("${app.upload.dir}") // Configured in application.properties or application.yml
    private String uploadDir;

    @Override
    public String uploadAvatar(MultipartFile fileUpload) {
        LocalDateTime myObj = LocalDateTime.now();
        UserDTO loginUser = getCurrentLoginUser();

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
            UserDTO res = updateUserInfo(loginUser);
            if (res == null) return null;
            return uploadDir + res.getAvatar();
        } catch (Exception e) {
            System.err.println(e);
            return null;
        }
    }

    @Override
    public List<MessageDTO> getTop20LatestNotifications() {
        User currentUser = getCurrentLoginUserEntity();
        if (currentUser == null) return null;
        List<MessageDTO> data = messageRepository.getTop20LatestNotifications(currentUser.getId(), PageRequest.of(0, 20));
        return data;
    }

    @Override
    public List<MessageDTO> getAllNotifications() {
        User currentUser = getCurrentLoginUserEntity();
        if (currentUser == null) return null;
        List<MessageDTO> data = messageRepository.getAllNotificationsByUserId(currentUser.getId());
        return data;
    }

    @Override
    public RSAKeyDTO updateUserPublicKey(RSAKeyDTO publicKeyDto) {
        User currentUser = getCurrentLoginUserEntity();
        if (currentUser == null) return null;
        RSAKey publicKey = currentUser.getPublicKey();
        if (publicKey == null) publicKey = new RSAKey();
        publicKey.setE(publicKeyDto.getE());
        publicKey.setN(publicKeyDto.getN());
        RSAKey res = rsaKeyRepository.save(publicKey);
        if (res == null) return null;
        currentUser.setPublicKey(res);
        User responseUser = userRepository.save(currentUser);
        if (responseUser == null) return null;
        return new RSAKeyDTO(res);
    }
}
