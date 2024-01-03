package com.chatapp.chat.service.impl;

import com.chatapp.chat.controller.UserController;
import com.chatapp.chat.entity.*;
import com.chatapp.chat.entity.Message;
import com.chatapp.chat.model.*;
import com.chatapp.chat.repository.RSAKeyRepository;
import com.chatapp.chat.repository.RoomRepository;
import com.chatapp.chat.repository.UserRoomRepository;
import com.chatapp.chat.service.*;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.PublicKey;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomTypeService roomTypeService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRoomRepository userRoomRepository;

    @Autowired
    private MessageService messageService;

    @Autowired
    private RSAKeyRepository rsaKeyRepository;

    @Autowired
    private UserRoomService userRoomService;

    @Autowired
    private MessageTypeService messageTypeService;

    @Autowired
    private SetupDataService setupDataService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private RoomService roomService;

    @Override
    public Set<UserDTO> getAllJoinedUsersByRoomId(UUID roomId) {
        Room entity = roomRepository.findById(roomId).orElse(null);
        if (entity == null)
            return null;
        Set<UserRoom> userRooms = entity.getUserRooms();
        TreeSet<UserDTO> joinedUsers = new TreeSet<>(new Comparator<UserDTO>() {
            @Override
            public int compare(UserDTO o1, UserDTO o2) {
                return o1.getUsername().compareTo(o2.getUsername());
            }
        });

        for (UserRoom userRoom : userRooms) {
            User joinedUser = userRoom.getUser();
            joinedUsers.add(new UserDTO(joinedUser));
        }

        return joinedUsers;
    }

    @Override
    public RoomDTO createRoom(RoomDTO dto) {
        if (dto == null) return null;

        Room res = createRoomEntity(dto);

        if (res == null)
            return null;
        return new RoomDTO(res);
    }

    @Override
    public RoomDTO updateRoom(RoomDTO dto) {
        if (!isInRoomChat(dto.getId())) return null;

        if (dto == null) return null;
        if (!isInRoomChat(dto.getId())) return null;

        Room entity = roomRepository.findById(dto.getId()).orElse(null);
        if (entity == null) return null;

        if (dto.getCode() != null)
            entity.setCode(dto.getCode());

        boolean isUpdateAvatar = false;
        if (dto.getAvatar() != null) {
            entity.setAvatar(dto.getAvatar());
            isUpdateAvatar = true;
        }

        boolean isUpdateColor = false;
        if (dto.getColor() != null) {
            isUpdateColor = true;
            entity.setColor(dto.getColor());
        }

        boolean isUpdateName = false;
        if (dto.getName() != null) {
            isUpdateName = true;
            entity.setName(dto.getName());
        }

        boolean isUpdateDescription = false;
        if (dto.getDescription() != null) {
            isUpdateDescription = true;
            entity.setDescription(dto.getDescription());
        }

        if (dto.getRoomType() != null && dto.getRoomType().getId() != entity.getRoomType().getId()) {
            RoomType roomType = roomTypeService.getRoomTypeEntityById(dto.getRoomType().getId());
            if (roomType == null) roomType = roomTypeService.getRoomTypeEntityByName(dto.getRoomType().getName());
            if (roomType != null) entity.setRoomType(roomType);
        }

        Room responseEntity = roomRepository.save(entity);
        RoomDTO responseDto = new RoomDTO(responseEntity);

        MessageDTO notification = new MessageDTO();
        UserDTO currentUser = userService.getCurrentLoginUser();
        if (isUpdateDescription)
            notification.setContent(currentUser.getUsername() + " updated this conversation's description");
        else if (isUpdateAvatar)
            notification.setContent(currentUser.getUsername() + " updated this conversation's avatar");
        else if (isUpdateColor)
            notification.setContent(currentUser.getUsername() + " updated this conversation's color");
        else if (isUpdateName)
            notification.setContent(currentUser.getUsername() + " updated this conversation's name");

        notification.setUser(currentUser);
        notification.setMessageType(messageTypeService.getMessageTypeByName("notification"));
        notification.setRoom(responseDto);

        messageService.sendPrivateMessage(notification);

        return responseDto;
    }

    @Override
    public void deleteRoom(UUID roomId) {
        Room entity = roomRepository.findById(roomId).orElse(null);
        if (entity == null) return;
        roomRepository.delete(entity);
    }

    @Override
    public Set<MessageDTO> pagingLatestMessage(UUID earliestMessageId) {
        return null;
    }

    @Override
    public RoomDTO getRoomById(UUID roomId) {
        Room entity = roomRepository.findById(roomId).orElse(null);
        if (entity == null) return null;
        return new RoomDTO(entity);
    }

    @Override
    public Room createRoomEntity(RoomDTO dto) {
        if (dto == null) return null;

        Room entity = new Room();
        entity.setCode(dto.getCode());
        entity.setAvatar(dto.getAvatar());
        entity.setColor(dto.getColor());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCreateDate(new Date());
        if (dto.getRoomType() != null) {
            RoomType roomType = roomTypeService.getRoomTypeEntityById(dto.getRoomType().getId());
            if (roomType == null) roomType = roomTypeService.getRoomTypeEntityByName(dto.getRoomType().getName());
            if (roomType != null) entity.setRoomType(roomType);
        }

        //generate public and private key for new room
        RSAAlgorithmService rsaService = new RSAAlgorithmService();
        RSAKey publicKey = rsaService.getPublicKey();
        RSAKey privateKey = rsaService.getPrivateKey();

        RSAKey responsePublicKey = rsaKeyRepository.save(publicKey);
        entity.setPublicKey(responsePublicKey);

        RSAKey responsePrivateKey = rsaKeyRepository.save(privateKey);
        entity.setPrivateKey(responsePrivateKey);

        Room responseEntity = roomRepository.save(entity);

        return responseEntity;
    }

    @Override
    public RoomDTO handleAddJoinedUserIntoRoomDTO(Room room) {
        RoomDTO data = new RoomDTO(room);
        data.setParticipants(this.getAllJoinedUsersByRoomId(data.getId()));
        return data;
    }

    @Override
    public List<RoomDTO> searchRoom(SeachObject seachObject) {
        User currenUser = userService.getCurrentLoginUserEntity();
        if (currenUser == null) return null;
        List<UserRoomDTO> userRooms = userRoomRepository.searchRoomByKeyword(seachObject.getKeyword().toLowerCase().trim());

        if (userRooms == null) return null;
        List<RoomDTO> rooms = new ArrayList<>();

        Set<UUID> storedRoomIds = new HashSet<>();

        for (UserRoomDTO userRoom : userRooms) {
            Room room = roomRepository.findById(userRoom.getRoom().getId()).orElse(null);
            if (room == null) continue;
            if (storedRoomIds.contains(room.getId())) continue;
            storedRoomIds.add(room.getId());
            RoomDTO roomDto = handleAddJoinedUserIntoRoomDTO(room);
            boolean containsCurrentUser = false;
            for (UserDTO userDto : roomDto.getParticipants()) {
                if (userDto.getId().equals(currenUser.getId())) {
                    containsCurrentUser = true;
                    break;
                }
            }
            if (!containsCurrentUser) continue;
            List<MessageDTO> messages = messageService.get20LatestMessagesByRoomId(roomDto.getId());

            RSAKey publicKey = currenUser.getPublicKey();
            for (MessageDTO message : messages) {
                if (message.getMessageType().getName().equals("chat")) {
                    String encryptedMessage = messageService.handleEncryptMessage(message.getContent(), new RSAKeyDTO(publicKey));
                    message.setContent(encryptedMessage);
                }
            }

            roomDto.setMessages(messages);
            rooms.add(roomDto);
        }

        UserServiceImpl.sortRoomDTOInLastestMessagesOrder(rooms);

        return rooms;
    }

    @Value("${app.upload.dir}") // Configured in application.properties or application.yml
    private String uploadDir;

    @Override
    public boolean isInRoomChat(UUID roomId) {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return false;
        Room room = roomRepository.findById(roomId).orElse(null);
        if (room == null) return false;

        for (UserRoom userRoom : room.getUserRooms()) {
            if (userRoom.getUser().getId().equals(currentUser.getId())) return true;
        }

        return false;
    }

    @Override
    public String uploadRoomAvatar(MultipartFile fileUpload, UUID roomId) {
        if (!isInRoomChat(roomId)) return null;

        LocalDateTime myObj = LocalDateTime.now();
        UserDTO loginUser = userService.getCurrentLoginUser();
        if (loginUser == null) return null;

        try {
            Path pathImg = Paths.get(uploadDir);

            InputStream inputStream = fileUpload.getInputStream();
            String ext = FilenameUtils.getExtension(fileUpload.getOriginalFilename());
            DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyyHHmmss");

            String formattedDate = myObj.format(myFormatObj);
            String nameFile = loginUser.getUsername() + "_" + formattedDate + "." + ext;
            Files.copy(inputStream, pathImg.resolve(nameFile),
                    StandardCopyOption.REPLACE_EXISTING);

            String url = MvcUriComponentsBuilder
                    .fromMethodName(UserController.class, "getFile", nameFile).build().toString();

            Room needUpdateRoom = roomRepository.findById(roomId).orElse(null);
            if (needUpdateRoom == null) return null;

            needUpdateRoom.setAvatar(nameFile);
            Room res = roomRepository.save(needUpdateRoom);

            if (res == null) return null;

            MessageDTO notification = new MessageDTO();
            UserDTO currentUser = userService.getCurrentLoginUser();
            notification.setContent(currentUser.getUsername() + " updated this conversation's avatar");
            notification.setUser(currentUser);
            notification.setMessageType(messageTypeService.getMessageTypeByName("notification"));
            notification.setRoom(new RoomDTO(res));

            messageService.sendPrivateMessage(notification);

            return res.getAvatar();
        } catch (Exception e) {
            System.err.println(e);
            return null;
        }
    }

    @Override
    public RoomDTO createGroupChat(NewGroupChat newGroupChat) {
        if (newGroupChat == null) return null;
        UUID joinUserIds[] = newGroupChat.getJoinUserIds();
        if (joinUserIds == null) return null;
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;
        List<User> joiningUsers = new ArrayList<>();
        joiningUsers.add(currentUser);
        for (UUID joinUserId : joinUserIds) {
            User joinUser = userService.getUserEntityById(joinUserId);
            if (joinUser == null) return null;
            joiningUsers.add(joinUser);
        }
        Room roomChat = createRoomEntity(new RoomDTO());
        Set<UserRoom> userRooms = new HashSet<>();

        UserRoomDTO creatorURDto = new UserRoomDTO();
        creatorURDto.setRoom(new RoomDTO(roomChat));
        creatorURDto.setUser(new UserDTO(currentUser));
        creatorURDto.setRole("Admin");
        UserRoom creatorUserRoom = userRoomService.createUserRoomEntity(creatorURDto);
        userRooms.add(creatorUserRoom);

        for (User user : joiningUsers) {
            if (user.getId().equals(currentUser.getId())) continue;
            UserRoomDTO urDto = new UserRoomDTO();
            urDto.setRoom(new RoomDTO(roomChat));
            urDto.setUser(new UserDTO(user));
            UserRoom userRoom = userRoomService.createUserRoomEntity(urDto);
            userRooms.add(userRoom);
        }

        roomChat.setName("You and other " + joinUserIds.length + " people");
        if (newGroupChat.getName() != null && newGroupChat.getName().length() > 0)
            roomChat.setName(newGroupChat.getName());

        roomChat.setUserRooms(userRooms);
        RoomType roomType = roomTypeService.getRoomTypeEntityByName("group");
        roomChat.setRoomType(roomType);

        //chatRoom is finally created done in database
        Room response = roomRepository.save(roomChat);
        if (response == null)
            return null;

        MessageTypeDTO messageTypeDTO = messageTypeService.getMessageTypeByName("join");
        if (messageTypeDTO == null) setupDataService.setupData();
        messageTypeDTO = messageTypeService.getMessageTypeByName("join");
        if (messageTypeDTO == null) return null;

        RoomDTO responseDto = new RoomDTO(response);
        responseDto.setParticipants(roomService.getAllJoinedUsersByRoomId(responseDto.getId()));

        List<MessageDTO> spreadMessages = new ArrayList<>();

        //send message that creator had created this conversation
        MessageDTO creatorMessageDto = new MessageDTO();
        creatorMessageDto.setMessageType(messageTypeDTO);
        creatorMessageDto.setRoom(responseDto);
        creatorMessageDto.setUser(new UserDTO(currentUser));
        creatorMessageDto.setContent(currentUser.getUsername() + " created this conversation");
        MessageDTO creatorMessageRes = messageService.createMessageAttachedUser(creatorMessageDto);
//        simpMessagingTemplate.convertAndSendToUser(currentUser.getId().toString(), "/privateMessage", creatorMessageRes);
        spreadMessages.add(creatorMessageRes);

        for (User user : joiningUsers) {
            if (currentUser.getId().equals(user.getId())) continue;
            //send message each user had joined this conversation
            MessageDTO messageDto = new MessageDTO();
            messageDto.setMessageType(messageTypeDTO);
            messageDto.setRoom(responseDto);
            messageDto.setUser(new UserDTO(user));
            messageDto.setContent(user.getUsername() + " joined");
            MessageDTO messageRes = messageService.createMessageAttachedUser(messageDto);
//            simpMessagingTemplate.convertAndSendToUser(user.getId().toString(), "/privateMessage", messageRes);
            spreadMessages.add(messageRes);
        }

        responseDto.setMessages(spreadMessages);
        for (MessageDTO messageDTO : spreadMessages) {
            messageDTO.getRoom().setParticipants(roomService.getAllJoinedUsersByRoomId(messageDTO.getRoom().getId()));
            for (User userIn : joiningUsers) {
                simpMessagingTemplate.convertAndSendToUser(userIn.getId().toString(), "/privateMessage", messageDTO);
            }
        }

        return responseDto;
    }

    @Override
    public RoomDTO unjoinGroupChat(UUID groupChatId) {
        if (!isInRoomChat(groupChatId)) return null;

        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;
        Room unjoinRoom = roomRepository.findById(groupChatId).orElse(null);
        if (unjoinRoom == null) return null;
        UserRoom userRoom = userRoomRepository.findByUserIdAndRoomId(currentUser.getId(), unjoinRoom.getId());
        if (userRoom == null) return null;

        unjoinRoom = roomRepository.findById(groupChatId).orElse(null);
        RoomDTO res = new RoomDTO(unjoinRoom);
        res.setParticipants(getAllJoinedUsersByRoomId(res.getId()));
        //notify other users that an user had left this conversation
        MessageDTO leftMessageDto = new MessageDTO();
        leftMessageDto.setRoom(res);
        leftMessageDto.setContent(currentUser.getUsername() + " left this conversation");
        leftMessageDto.setUser(new UserDTO(currentUser));
        leftMessageDto.setMessageType(messageTypeService.getMessageTypeByName("left"));
        messageService.sendPrivateMessage(leftMessageDto);

        userRoomService.deleteUserRoom(userRoom.getId());

        return res;
    }

    @Override
    public RoomDTO addUserIntoGroupChat(UUID userId, UUID roomId) {
        if (!isInRoomChat(roomId)) return null;

        if (userId == null || roomId == null) return null;
        UserDTO currentLoginUser = userService.getCurrentLoginUser();
        if (currentLoginUser == null) return null;
        User newUser = userService.getUserEntityById(userId);
        if (newUser == null) return null;
        Room addedRoom = roomRepository.findById(roomId).orElse(null);
        if (addedRoom == null) return null;

        //handle add user into room by declare new userroom entity
        UserRoom newUserRoom = new UserRoom();
        newUserRoom.setRole("Member");
        newUserRoom.setNickName(newUser.getUsername());
        newUserRoom.setRoom(addedRoom);
        newUserRoom.setUser(newUser);

        UserRoom resEntity = userRoomRepository.save(newUserRoom);

        Room updatedRoom = roomRepository.findById(resEntity.getRoom().getId()).orElse(null);
        if (updatedRoom == null)
            return null;

        RoomDTO response = new RoomDTO(updatedRoom);

        //notify other users that an user had joined this conversation
        MessageDTO joinMessageDto = new MessageDTO();
        joinMessageDto.setRoom(response);
        joinMessageDto.setContent(currentLoginUser.getUsername() + " added " + newUser.getUsername() + " to this conversation");
        joinMessageDto.setUser(new UserDTO(newUser));
        joinMessageDto.setMessageType(messageTypeService.getMessageTypeByName("join"));
        messageService.sendPrivateMessage(joinMessageDto);

        response.setParticipants(getAllJoinedUsersByRoomId(updatedRoom.getId()));
        return response;
    }

    @Override
    public Set<UserDTO> getListFriendNotInRoom(UUID roomId) {
        if (!isInRoomChat(roomId)) return null;

        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        Room room = roomRepository.findById(roomId).orElse(null);
        if (room == null) return null;

        Set<UserDTO> joinedUsers = roomService.getAllJoinedUsersByRoomId(roomId);
        Set<UUID> joinedUserIds = new HashSet<>();
        for (UserDTO joinedUser : joinedUsers) {
            joinedUserIds.add(joinedUser.getId());
        }
        Set<UserDTO> friendList = userService.getAllUsers();
        Set<UserDTO> res = new HashSet<>();

        for (UserDTO friendDto : friendList) {
            if (!joinedUserIds.contains(friendDto.getId())) res.add(friendDto);
        }

        return res;
    }

    @Override
    public RoomDTO addMultipleUsersIntoGroupChat(UUID[] userIds, UUID roomId) {
        if (userIds == null) return null;
        for (UUID userId : userIds) {
            addUserIntoGroupChat(userId, roomId);
        }

        Room updatedRoom = roomRepository.findById(roomId).orElse(null);
        if (updatedRoom == null)
            return null;

        RoomDTO response = new RoomDTO(updatedRoom);
        response.setParticipants(getAllJoinedUsersByRoomId(updatedRoom.getId()));
        return response;
    }
}
