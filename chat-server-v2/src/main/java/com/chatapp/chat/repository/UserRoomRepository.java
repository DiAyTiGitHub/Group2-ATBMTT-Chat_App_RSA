package com.chatapp.chat.repository;

import com.chatapp.chat.entity.UserRoom;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface UserRoomRepository extends CrudRepository<UserRoom, UUID> {
}
