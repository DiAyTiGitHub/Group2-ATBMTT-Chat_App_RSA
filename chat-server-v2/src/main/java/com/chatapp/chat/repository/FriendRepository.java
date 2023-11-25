package com.chatapp.chat.repository;

import com.chatapp.chat.entity.Friend;
import com.chatapp.chat.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FriendRepository extends CrudRepository<Friend, UUID> {
}
