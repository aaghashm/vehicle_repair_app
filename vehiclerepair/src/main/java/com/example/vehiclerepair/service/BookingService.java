package com.example.vehiclerepair.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vehiclerepair.model.Booking;
import com.example.vehiclerepair.repository.BookingRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> getBookingsByUserEmail(String email) {
        return bookingRepository.findByUser_Email(email);
    }

    public List<Booking> getBookingsByCity(String city) {
        return bookingRepository.findByCity(city);
    }

    public List<Booking> getBookingsByStatus(boolean isCompleted) {
        return bookingRepository.findByIsCompleted(isCompleted);
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, Booking bookingDetails) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();
            booking.setUser(bookingDetails.getUser());
            booking.setVehicleType(bookingDetails.getVehicleType());
            booking.setBrand(bookingDetails.getBrand());
            booking.setProblemDescription(bookingDetails.getProblemDescription());
            booking.setCity(bookingDetails.getCity());
            booking.setCompleted(bookingDetails.isCompleted());
            return bookingRepository.save(booking);
        }
        return null; // or throw an exception
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
