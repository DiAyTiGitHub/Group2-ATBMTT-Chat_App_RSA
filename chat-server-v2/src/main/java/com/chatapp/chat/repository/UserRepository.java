package com.chatapp.chat.repository;

import com.chatapp.chat.entity.User;
import com.chatapp.chat.model.UserDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {
    public User findByUsername(String username);

    @Query("SELECT new com.chatapp.chat.model.UserDTO(entity) FROM User entity WHERE " +
            "entity.username LIKE %?1% OR " +
            "entity.fullname LIKE %?1% OR " +
            "entity.address LIKE %?1% OR " +
            "entity.code LIKE %?1%")
    public Set<UserDTO> searchUsers(String searchString);
}