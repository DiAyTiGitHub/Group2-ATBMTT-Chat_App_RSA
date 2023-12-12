package com.chatapp.chat.repository;

import com.chatapp.chat.entity.UserRoom;
import com.chatapp.chat.model.RoomDTO;
import com.chatapp.chat.model.UserRoomDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface UserRoomRepository extends CrudRepository<UserRoom, UUID> {
    @Query("select userRoom from UserRoom userRoom where userRoom.user.id = ?1 and userRoom.room.id = ?2")
    public UserRoom findByUserIdAndRoomId(UUID userId, UUID roomId);

    @Query("select new com.chatapp.chat.model.UserRoomDTO(entity) from UserRoom entity where (entity.room.name like %?1% or entity.user.username like %?1% or entity.user.fullname like %?1% or entity.nickName like %?1%)")
    public List<UserRoomDTO> searchRoomByKeyword(String keyword);

}
