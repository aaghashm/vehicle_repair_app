package com.example.vehiclerepair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vehiclerepair.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    // Add custom queries if needed
    Admin findByEmail(String email);
}
