package com.chatapp.chat.service;

import com.chatapp.chat.entity.User;
import com.chatapp.chat.model.FriendDTO;
import com.chatapp.chat.model.RoomDTO;
import com.chatapp.chat.model.UserDTO;

import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;

public interface UserService {
    public UserDTO getCurrentLoginUser();

    public UserDTO getUserById(UUID userId);

    public UserDTO getUserByName(String userName);

    public Set<UserDTO> getAllFiends();

    public Set<FriendDTO> getAddFriendRequests();

    public Set<FriendDTO> getPendingFriendRequests();

    public TreeSet<RoomDTO> getAllJoinedRooms();

    public TreeSet<RoomDTO> getAllPrivateRooms();

    public TreeSet<RoomDTO> getAllPublicRooms();

    public User getCurrentLoginUserEntity();

    public User getUserEntityById(UUID userId);

    public Set<UserDTO> searchUsers(String searchString);

    public Set<UserDTO> getAllUsers();

    public Set<UserDTO> searchUsersExcludeSelf(String searchString);

    public UserDTO updateUserInfo(UserDTO dto);
}
