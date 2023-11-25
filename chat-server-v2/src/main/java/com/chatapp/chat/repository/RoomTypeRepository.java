package com.chatapp.chat.repository;

import com.chatapp.chat.entity.RoomType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RoomTypeRepository extends CrudRepository<RoomType, UUID> {
}
