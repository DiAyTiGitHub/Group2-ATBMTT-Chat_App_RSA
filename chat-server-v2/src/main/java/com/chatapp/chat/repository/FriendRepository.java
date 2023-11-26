package com.chatapp.chat.repository;

import com.chatapp.chat.entity.Friend;
import com.chatapp.chat.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FriendRepository extends CrudRepository<Friend, UUID> {
    @Query("from Friend entity where (entity.receiver.id = :currentUserId and entity.requestSender.id = :friendId) or (entity.receiver.id = :friendId  and entity.requestSender.id = :currentUserId)")
    public Friend getRelationShipBy2Id(@Param("currentUserId") UUID currentUserId, @Param("friendId") UUID friendId);
}
