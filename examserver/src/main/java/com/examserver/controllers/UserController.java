package com.examserver.controllers;

import com.examserver.models.Role;
import com.examserver.models.User;
import com.examserver.models.UserRole;
import com.examserver.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserService userService;

    // creating user
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {

        user.setProfile("default.png");

        // Encoding password with BCryptPasswordEncoder
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

        Set<UserRole> roles=new HashSet<>();

        Role role=new Role();
        role.setRoleId(90L);
        role.setRoleName("NORMAL");

        UserRole userRole=new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);
        return this.userService.createUser(user, roles);
    }

    // getting user by username
    @GetMapping("/{username}")
    public User getUser(@PathVariable String username)
    {
        return this.userService.getUser(username);
    }

    // delete the user by userId
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId)
    {
        this.userService.deleteUser(userId);
    }

    // update user by userId
    @PutMapping("/{userId}")
    public User updateUser(@RequestBody User user)
    {
        return this.userService.updateUser(user);
    }

}
