package com.examserver.repositories;

import com.examserver.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

//    User updateUserByUsername(Long userId, User user);
}
