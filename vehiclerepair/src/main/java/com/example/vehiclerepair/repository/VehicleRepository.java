package com.example.vehiclerepair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vehiclerepair.model.Vehicle;
import java.util.List;
@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByUserEmail(String userEmail);
}
