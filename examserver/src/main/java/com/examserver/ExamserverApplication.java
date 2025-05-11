package com.examserver;

import com.examserver.helper.UserFoundException;
import com.examserver.models.Role;
import com.examserver.models.User;
import com.examserver.models.UserRole;
import com.examserver.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);

	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("starting code..");

//		try {
//			User user=new User();
//			user.setFirstName("Umesh");
//			user.setLastName("Tiwari");
//			user.setUsername("umesh2");
//			user.setPassword(this.bCryptPasswordEncoder.encode("abc"));
//			user.setEmail("ume@gmail.com");
//			user.setProfile("profile.png");
//
//			Role role=new Role();
//			role.setRoleId(55L);
//			role.setRoleName("ADMIN");
//
//			Set<UserRole> userRoleSet=new HashSet<>();
//			UserRole userRole=new UserRole();
//			userRole.setRole(role);
//			userRole.setUser(user);
//
//			userRoleSet.add(userRole);
//
//			User user1 = this.userService.createUser(user, userRoleSet);
//			System.out.println(user1.getUsername());
//		}
//		catch (UserFoundException e) {
//			e.printStackTrace();
//		}
	}
}
