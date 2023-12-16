package com.chatapp.chat.repository;

import com.chatapp.chat.entity.RSAKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RSAKeyRepository extends JpaRepository<RSAKey, UUID> {
}
