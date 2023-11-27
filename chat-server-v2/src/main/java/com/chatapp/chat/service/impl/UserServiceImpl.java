package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.Friend;
import com.chatapp.chat.entity.Room;
import com.chatapp.chat.entity.User;
import com.chatapp.chat.entity.UserRoom;
import com.chatapp.chat.model.FriendDTO;
import com.chatapp.chat.model.RoomDTO;
import com.chatapp.chat.model.UserDTO;
import com.chatapp.chat.repository.UserRepository;
import com.chatapp.chat.service.RoomService;
import com.chatapp.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomService roomService;

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
    public TreeSet<RoomDTO> getAllJoinedRooms() {
        User currentUser = getCurrentLoginUserEntity();
        if (currentUser == null)
            return null;
        Set<UserRoom> userRooms = currentUser.getUserRooms();
        if (userRooms == null) return null;
        TreeSet<RoomDTO> rooms = new TreeSet<>(new Comparator<RoomDTO>() {
            @Override
            public int compare(RoomDTO o1, RoomDTO o2) {
                return 0;
            }
        });

        for (UserRoom userRoom : userRooms) {
            Room room = userRoom.getRoom();
            rooms.add(roomService.handleAddJoinedUserIntoRoomDTO(room));
        }

        return rooms;
    }

    @Override
    public TreeSet<RoomDTO> getAllPrivateRooms() {
        User currentUser = getCurrentLoginUserEntity();
        if (currentUser == null)
            return null;

        Set<UserRoom> userRooms = currentUser.getUserRooms();
        if (userRooms == null) return null;
        TreeSet<RoomDTO> rooms = new TreeSet<>(new Comparator<RoomDTO>() {
            @Override
            public int compare(RoomDTO o1, RoomDTO o2) {
                return 0;
            }
        });

        for (UserRoom userRoom : userRooms) {
            Room room = userRoom.getRoom();
            if (room.getRoomType().getName().trim().toLowerCase().equals("private")){
                rooms.add(roomService.handleAddJoinedUserIntoRoomDTO(room));
            }
        }

        return rooms;
    }

    @Override
    public TreeSet<RoomDTO> getAllPublicRooms() {
        User currentUser = getCurrentLoginUserEntity();
        if (currentUser == null)
            return null;

        Set<UserRoom> userRooms = currentUser.getUserRooms();
        if (userRooms == null) return null;
        TreeSet<RoomDTO> rooms = new TreeSet<>(new Comparator<RoomDTO>() {
            @Override
            public int compare(RoomDTO o1, RoomDTO o2) {
                return 0;
            }
        });

        for (UserRoom userRoom : userRooms) {
            Room room = userRoom.getRoom();
            if (room.getRoomType().getName().trim().toLowerCase().equals("public")){
                rooms.add(roomService.handleAddJoinedUserIntoRoomDTO(room));
            }
        }

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
        if(currentUser == null) return null;

        Set<FriendDTO> res = new TreeSet<FriendDTO>(
                Collections.reverseOrder(new Comparator<FriendDTO>() {
                    @Override
                    public int compare(FriendDTO o1, FriendDTO o2) {
                        return (o1.getLastModifyDate().compareTo(o2.getLastModifyDate()));
                    }
                })
        );

        for(Friend relationship : currentUser.getFriendFromReceive()){
            res.add(new FriendDTO(relationship));
        }

        return res;
    }

    @Override
    public Set<FriendDTO> getPendingFriendRequests() {
        User currentUser = getCurrentLoginUserEntity();
        if(currentUser == null) return null;

        Set<FriendDTO> res = new TreeSet<FriendDTO>(
                Collections.reverseOrder(new Comparator<FriendDTO>() {
                    @Override
                    public int compare(FriendDTO o1, FriendDTO o2) {
                        return (o1.getLastModifyDate().compareTo(o2.getLastModifyDate()));
                    }
                })
        );

        for(Friend relationship : currentUser.getFriendFromRequest()){
            res.add(new FriendDTO(relationship));
        }

        return res;
    }
}
