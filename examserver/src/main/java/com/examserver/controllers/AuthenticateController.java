package com.examserver.controllers;

import com.examserver.config.JwtUtil;
import com.examserver.models.JwtRequest;
import com.examserver.models.JwtResponse;
import com.examserver.models.User;
import com.examserver.repositories.UserRepository;
import com.examserver.services.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin
public class AuthenticateController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());

            UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());
            String token = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new JwtResponse(token));
        } catch (BadCredentialsException e) {
            throw new Exception("Invalid credentials", e);
        }
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Invalid credentials", e);
        }
    }

    // Return the details of current user.
    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("");
        }
        User user = (User) this.userDetailsService.loadUserByUsername(principal.getName());
        return ResponseEntity.ok(user);
    }

    // verifying password
    @PutMapping("/verify-password/{oldPassword}")
    public boolean verifyPassword(@PathVariable String oldPassword, @RequestBody User user) {
        return bCryptPasswordEncoder.matches(oldPassword, user.getPassword());
    }

    // update-password
    @PutMapping("/update-password/{newPassword}")
    public void updatePassword(@PathVariable String newPassword, @RequestBody User user) {
        String newBcryptPassword = bCryptPasswordEncoder.encode(newPassword);

        user.setPassword(newBcryptPassword);

        userRepository.save(user);
    }
}
