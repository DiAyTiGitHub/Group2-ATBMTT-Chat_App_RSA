package com.chatapp.chat.service;

import com.chatapp.chat.model.UserDTO;

import java.util.Set;
import java.util.UUID;

public interface UserService {
    public UserDTO getCurrentLoginUser();

    public UserDTO getUserById(UUID userId);

    public UserDTO getUserByName(String userName);

    public Set<UserDTO> getAllFiends();
}
