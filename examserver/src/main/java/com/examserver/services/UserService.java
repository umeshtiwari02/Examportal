package com.examserver.services;

import com.examserver.models.User;
import com.examserver.models.UserRole;

import java.util.Set;

public interface UserService {

    // creating user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    // get user by username
    public User getUser(String name);

    // delete user by id
    public void deleteUser(Long userId);

    // update user by username
    public User updateUser(User user);
}
