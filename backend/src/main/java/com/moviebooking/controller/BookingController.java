package com.moviebooking.controller;

import com.moviebooking.entity.Booking;
import com.moviebooking.entity.Show;
import com.moviebooking.entity.User;
import com.moviebooking.repository.BookingRepository;
import com.moviebooking.repository.ShowRepository;
import com.moviebooking.repository.UserRepository;
import com.moviebooking.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<?> getAllBookings(@RequestHeader("Authorization") String authHeader) {
        if (!isAdmin(authHeader)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        return ResponseEntity.ok(bookingRepository.findAll());
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyBookings(@RequestHeader("Authorization") String authHeader) {
        String username = getUsernameFromToken(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<Booking> bookings = bookingRepository.findByUserId(user.getId());
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@RequestHeader("Authorization") String authHeader,
                                           @PathVariable Long id) {
        String username = getUsernameFromToken(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }

        User user = userRepository.findByUsername(username).orElse(null);
        if (!isAdmin(authHeader) && !booking.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        return ResponseEntity.ok(booking);
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestHeader("Authorization") String authHeader,
                                          @RequestBody Map<String, Object> bookingRequest) {
        String username = getUsernameFromToken(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        Long showId = Long.valueOf(bookingRequest.get("showId").toString());
        int numberOfSeats = Integer.parseInt(bookingRequest.get("numberOfSeats").toString());

        Show show = showRepository.findById(showId).orElse(null);
        if (show == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Show not found"));
        }

        if (show.getAvailableSeats() < numberOfSeats) {
            return ResponseEntity.badRequest().body(Map.of("message", "Not enough seats available"));
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setShow(show);
        booking.setSeatsBooked(numberOfSeats);
        booking.setTotalAmount(show.getPrice().multiply(BigDecimal.valueOf(numberOfSeats)));
        booking.setBookingDate(LocalDateTime.now());
        booking.setBookingReference("BK" + System.currentTimeMillis());
        booking.setStatus(Booking.Status.CONFIRMED);

        show.setAvailableSeats(show.getAvailableSeats() - numberOfSeats);
        showRepository.save(show);

        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@RequestHeader("Authorization") String authHeader,
                                          @PathVariable Long id) {
        String username = getUsernameFromToken(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }

        User user = userRepository.findByUsername(username).orElse(null);
        if (!isAdmin(authHeader) && !booking.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        if (booking.getStatus() == Booking.Status.CANCELLED) {
            return ResponseEntity.badRequest().body(Map.of("message", "Booking already cancelled"));
        }

        booking.setStatus(Booking.Status.CANCELLED);
        
        Show show = booking.getShow();
        show.setAvailableSeats(show.getAvailableSeats() + booking.getSeatsBooked());
        showRepository.save(show);

        bookingRepository.save(booking);
        return ResponseEntity.ok(Map.of("message", "Booking cancelled successfully"));
    }

    private String getUsernameFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        String token = authHeader.substring(7);
        try {
            return jwtUtil.getUsernameFromToken(token);
        } catch (Exception e) {
            return null;
        }
    }

    private boolean isAdmin(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return false;
        }
        String token = authHeader.substring(7);
        try {
            String role = jwtUtil.getRoleFromToken(token);
            return "ADMIN".equals(role);
        } catch (Exception e) {
            return false;
        }
    }
}
