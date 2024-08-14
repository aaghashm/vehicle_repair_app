package com.example.vehiclerepair.controller;

import java.util.Collections;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vehiclerepair.model.User;
import com.example.vehiclerepair.service.AdminService;
import com.example.vehiclerepair.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private AdminService adminService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        logger.info("SignUp request received with user: {}", user.getEmail());

        try {
            userService.registerUser(user);
            return new ResponseEntity<>("User signed up successfully", HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Sign Up Failed: {}", e.getMessage());
            return new ResponseEntity<>("Sign Up Failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login/user")
    public ResponseEntity<?> userLogin(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        String token = userService.loginUser(email, password);
        if (token != null) {
            return ResponseEntity.ok().body(Collections.singletonMap("user", Map.of(
                    "token", token,
                    "email", email, // Return email
                    "userType", "user" // Set userType as 'user'
            )));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Invalid credentials"));
        }
    }

    @PostMapping("/login/admin")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        String token = adminService.loginAdmin(email, password);
        if (token != null) {
            return ResponseEntity.ok().body(Collections.singletonMap("user", Map.of(
                    "token", token,
                    "email", email, // Return email
                    "userType", "admin" // Set userType as 'admin'
            )));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Invalid credentials"));
        }
    }

}
