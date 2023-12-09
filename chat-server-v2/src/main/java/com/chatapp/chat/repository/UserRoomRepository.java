package com.chatapp.chat.repository;

import com.chatapp.chat.entity.UserRoom;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface UserRoomRepository extends CrudRepository<UserRoom, UUID> {
    @Query("select userRoom from UserRoom userRoom where userRoom.user.id = ?1 and userRoom.room.id = ?2")
    public UserRoom findByUserIdAndRoomId(UUID userId, UUID roomId);
}
