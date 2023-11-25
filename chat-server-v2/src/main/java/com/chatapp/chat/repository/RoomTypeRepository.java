package com.chatapp.chat.repository;

import com.chatapp.chat.entity.RoomType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

@Repository
public interface RoomTypeRepository extends CrudRepository<RoomType, UUID> {
    @Query("from RoomType entity where entity.name = ?1")
    public RoomType findByName(String name);
}
