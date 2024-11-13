package com.example.vehiclerepair.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vehiclerepair.model.Vehicle;
import com.example.vehiclerepair.repository.UserRepository;
import com.example.vehiclerepair.repository.VehicleRepository;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(Long vehicleId) {
        return vehicleRepository.findById(vehicleId).orElse(null);
    }
    public List<Vehicle> getVehiclesByUserEmail(String userEmail) {
        return vehicleRepository.findByUserEmail(userEmail);
    }
    
    public Vehicle saveVehicle(Vehicle vehicle) {
        if (vehicle.getVehicleNumber() == null || vehicle.getVehicleNumber().trim().isEmpty()) {
            throw new IllegalArgumentException("Vehicle number is required");
        }
        if (vehicle.getUserEmail() == null || vehicle.getUserEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("User email is required");
        }

        // Validate that the user exists
        if (!userRepository.existsByEmail(vehicle.getUserEmail())) {
            throw new IllegalArgumentException("User with the provided email does not exist");
        }

        return vehicleRepository.save(vehicle);
    }

    public Vehicle createVehicle(Vehicle vehicle) {
        if (vehicle.getVehicleNumber() == null || vehicle.getVehicleNumber().trim().isEmpty()) {
            throw new IllegalArgumentException("Vehicle number is required");
        }
        if (vehicle.getUserEmail() == null || vehicle.getUserEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("User email is required");
        }

        // Validate that the user exists
        if (!userRepository.existsByEmail(vehicle.getUserEmail())) {
            throw new IllegalArgumentException("User with the provided email does not exist");
        }

        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Long vehicleId) {
        vehicleRepository.deleteById(vehicleId);
    }
}
