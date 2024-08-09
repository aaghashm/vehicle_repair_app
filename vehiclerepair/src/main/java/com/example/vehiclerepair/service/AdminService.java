package com.example.vehiclerepair.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vehiclerepair.model.Admin;
import com.example.vehiclerepair.repository.AdminRepository;
import com.example.vehiclerepair.security.JwtUtil;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Optional<Admin> findAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public Admin findAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    public String loginAdmin(String email, String password) {
        Admin admin = adminRepository.findByEmail(email);
        // Removed password check
        if (admin != null) {
            return jwtUtil.generateToken(email);
        }
        return null;
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}
