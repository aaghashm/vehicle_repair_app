package com.example.vehiclerepair.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.vehiclerepair.model.User;
import com.example.vehiclerepair.service.AdminService;
import com.example.vehiclerepair.service.UserService;

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
            // Log the exception
            logger.error("Sign Up Failed: {}", e.getMessage());
            return new ResponseEntity<>("Sign Up Failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login/user")
    public String userLogin(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        String token = userService.loginUser(email, password);
        if (token != null) {
            return "Bearer " + token;
        } else {
            return "Invalid credentials";
        }
    }

    @PostMapping("/login/admin")
    public String adminLogin(@RequestParam String email, @RequestParam String password) {
        String token = adminService.loginAdmin(email, password);
        if (token != null) {
            return "Bearer " + token;
        } else {
            return "Invalid credentials";
        }
    }
}
