package com.example.vehiclerepair.controller;

import java.util.List;
import java.util.Optional;

// import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.vehiclerepair.model.Booking;
import com.example.vehiclerepair.model.User;
import com.example.vehiclerepair.repository.BookingRepository;
import com.example.vehiclerepair.repository.UserRepository;
import com.example.vehiclerepair.service.BookingService;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user")
    public List<Booking> getBookingsByUserEmail(@RequestParam String email) {
        return bookingService.getBookingsByUserEmail(email);
    }

    @GetMapping("/city")
    public List<Booking> getBookingsByCity(@RequestParam String city) {
        return bookingService.getBookingsByCity(city);
    }

    @GetMapping("/status")
    public List<Booking> getBookingsByStatus(@RequestParam boolean isCompleted) {
        return bookingService.getBookingsByStatus(isCompleted);
    }

    @PostMapping
    public ResponseEntity<String> createBooking(@RequestBody Booking booking) {
        Optional<User> optionalUser = userRepository.findByEmail(booking.getUser().getEmail());

        if (optionalUser.isPresent()) {
            booking.setUser(optionalUser.get());
            bookingRepository.save(booking);
            return ResponseEntity.ok("Booking created successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking bookingDetails) {
        Booking updatedBooking = bookingService.updateBooking(id, bookingDetails);
        if (updatedBooking != null) {
            return ResponseEntity.ok(updatedBooking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}
