package com.chatapp.chat.service.impl;

import com.chatapp.chat.entity.User;
import com.chatapp.chat.model.UserDTO;
import com.chatapp.chat.repository.UserRepository;
import com.chatapp.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO getCurrentLoginUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getCredentials());
        System.out.println(auth.getDetails());
        System.out.println(auth.getPrincipal());

        return null;
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
}
