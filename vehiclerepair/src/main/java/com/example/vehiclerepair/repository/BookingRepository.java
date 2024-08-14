package com.example.vehiclerepair.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vehiclerepair.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser_Email(String email);

    List<Booking> findByCity(String city);

    List<Booking> findByIsCompleted(boolean isCompleted);
}