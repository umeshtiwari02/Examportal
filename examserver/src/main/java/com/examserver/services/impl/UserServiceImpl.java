package com.examserver.services.impl;

import com.examserver.helper.UserFoundException;
import com.examserver.models.User;
import com.examserver.models.UserRole;
import com.examserver.repositories.RoleRepository;
import com.examserver.repositories.UserRepository;
import com.examserver.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User local = this.userRepository.findByUsername(user.getUsername());
        if (local != null) {
            System.out.println("User is already there!!");
            throw new UserFoundException();
        } else {
            // user create
            for (UserRole ur:userRoles) {
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
        }
        return local;
    }

    // getting user by username
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    // delete use by userId
    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    // update user by username
    @Override
    public User updateUser(User user) {
        return this.userRepository.save(user);
    }
}
