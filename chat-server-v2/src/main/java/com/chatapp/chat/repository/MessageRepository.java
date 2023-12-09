package com.chatapp.chat.repository;

import com.chatapp.chat.entity.Message;
import com.chatapp.chat.model.MessageDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository

public interface MessageRepository extends JpaRepository<Message, UUID> {
    @Query(value = "select new com.chatapp.chat.model.MessageDTO(m) from Message m where m.room.id = ?1 and m.sendDate < ?2 order by m.sendDate desc ")
    List<MessageDTO> findTop10ByRoomAndSendDateBeforeOrderBySendDateDesc(UUID roomId, Date sendDate, Pageable pageable);

    @Query("select new com.chatapp.chat.model.MessageDTO(m) from Message m where m.room.id = ?1 order by m.sendDate desc ")
    public Set<MessageDTO> getAllMessagesByRoomId(UUID roomId);

    @Query(value = "select new com.chatapp.chat.model.MessageDTO(m) from Message m where m.room.id = ?1 order by m.sendDate desc ")
    List<MessageDTO> get20LatestMessagesByRoomId(UUID roomId, Pageable pageable);

    @Query(value = "select new com.chatapp.chat.model.MessageDTO(m) from Message m where m.user.id = ?1 and m.messageType.name like 'notification' order by m.sendDate desc ")
    List<MessageDTO> getTop20LatestNotifications(UUID userId, Pageable pageable);

    @Query(value = "select new com.chatapp.chat.model.MessageDTO(m) from Message m where m.user.id = ?1 and m.messageType.name like 'notification' order by m.sendDate desc ")
    List<MessageDTO> getAllNotificationsByUserId(UUID userId);
}
