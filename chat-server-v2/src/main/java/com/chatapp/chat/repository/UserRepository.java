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

    @Query("Select new com.chatapp.chat.model.UserDTO(entity) from User entity where entity.username like ?1 or entity.fullname like ?1 or entity.address like ?1 or entity.code like ?1")
    public Set<UserDTO> searchUsers(String searchString);
}