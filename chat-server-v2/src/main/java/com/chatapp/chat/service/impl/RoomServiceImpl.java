package com.chatapp.chat.service.impl;

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
        if (dto == null) return null;

        Room entity = roomRepository.findById(dto.getId()).orElse(null);
        if (entity == null) return null;

        entity.setCode(dto.getCode());
        entity.setAvatar(dto.getAvatar());
        entity.setColor(dto.getColor());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCreateDate(new Date());
        if (dto.getRoomType() != null && dto.getRoomType().getId() != entity.getRoomType().getId()) {
            RoomType roomType = roomTypeService.getRoomTypeEntityById(dto.getRoomType().getId());
            if (roomType == null) roomType = roomTypeService.getRoomTypeEntityByName(dto.getRoomType().getName());
            if (roomType != null) entity.setRoomType(roomType);
        }

        Room responseEntity = roomRepository.save(entity);

        return new RoomDTO(responseEntity);
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
    public String uploadRoomAvatar(MultipartFile fileUpload, UUID roomId) {
        LocalDateTime myObj = LocalDateTime.now();
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;
        Room needUpdateRoom = roomRepository.findById(roomId).orElse(null);
        if (needUpdateRoom == null) return null;

        try {
            Path pathImg = Paths.get(uploadDir);

            InputStream inputStream = fileUpload.getInputStream();
            String ext = FilenameUtils.getExtension(fileUpload.getOriginalFilename());
            DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyyHHmmss");

            String formattedDate = myObj.format(myFormatObj);
            String nameFile = currentUser.getUsername() + "_" + formattedDate + "." + ext;
            Files.copy(inputStream, pathImg.resolve(nameFile),
                    StandardCopyOption.REPLACE_EXISTING);

            needUpdateRoom.setAvatar(nameFile);
            Room res = roomRepository.save(needUpdateRoom);

            return uploadDir + "/" + res.getAvatar();
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
            for (User userIn : joiningUsers) {
                simpMessagingTemplate.convertAndSendToUser(userIn.getId().toString(), "/privateMessage", messageDTO);
            }
        }

        return responseDto;
    }

    @Override
    public RoomDTO unjoinGroupChat(UUID groupChatId) {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;
        Room unjoinRoom = roomRepository.findById(groupChatId).orElse(null);
        if (unjoinRoom == null) return null;
        UserRoom userRoom = userRoomRepository.findByUserIdAndRoomId(currentUser.getId(), unjoinRoom.getId());
        if (userRoom == null) return null;
        userRoomService.deleteUserRoom(userRoom.getId());
        unjoinRoom = roomRepository.findById(groupChatId).orElse(null);
        return new RoomDTO(unjoinRoom);
    }
}
