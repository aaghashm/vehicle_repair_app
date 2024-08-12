package com.example.vehiclerepair.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VehicleID")
    private Long id;

    @Column(name = "VehicleNumber", nullable = false, length = 50)
    private String vehicleNumber;

    @Column(name = "VehicleType", nullable = false, length = 50)
    private String vehicleType;

    @Column(name = "YearOfBuying", nullable = false)
    private int yearOfBuying;

    @Column(name = "TotalKm", nullable = false)
    private int totalKm;

    @Column(name = "UserEmail", nullable = false, length = 100)
    private String userEmail;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public int getYearOfBuying() {
        return yearOfBuying;
    }

    public void setYearOfBuying(int yearOfBuying) {
        this.yearOfBuying = yearOfBuying;
    }

    public int getTotalKm() {
        return totalKm;
    }

    public void setTotalKm(int totalKm) {
        this.totalKm = totalKm;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
