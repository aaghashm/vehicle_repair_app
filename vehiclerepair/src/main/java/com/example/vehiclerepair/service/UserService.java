package com.example.vehiclerepair.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.vehiclerepair.model.User;
import com.example.vehiclerepair.repository.UserRepository;
import com.example.vehiclerepair.security.CustomUserDetails;
import com.example.vehiclerepair.security.JwtUtil;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new CustomUserDetails(user); // Return a CustomUserDetails object
    }

    public void registerUser(User user) {
        // Removed password encoding
        userRepository.save(user);
    }

    public String loginUser(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        // Skipped password checking
        if (user != null) {
            return jwtUtil.generateToken(email);
        }
        return null;
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null); // Use .orElse(null) to handle Optional
    }

    public User updateUser(Long id, User user) {
        // Retrieve the existing user
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update fields as needed
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        // Update other fields here

        // Save the updated user
        return userRepository.save(existingUser);
    }
    public UserDetails findByEmailUD(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new CustomUserDetails(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
