package com.moviebooking.controller;

import com.moviebooking.entity.Booking;
import com.moviebooking.entity.User;
import com.moviebooking.entity.Show;
import com.moviebooking.repository.BookingRepository;
import com.moviebooking.repository.UserRepository;
import com.moviebooking.repository.ShowRepository;
import com.moviebooking.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        String username = getUsernameFromToken(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> profile = new HashMap<>();
        profile.put("id", user.getId());
        profile.put("username", user.getUsername());
        profile.put("email", user.getEmail());
        profile.put("fullName", user.getFullName());
        profile.put("phone", user.getPhone());
        profile.put("role", user.getRole().name());
        profile.put("theme", user.getTheme());

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String authHeader,
                                          @RequestBody Map<String, String> updates) {
        String username = getUsernameFromToken(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        if (updates.containsKey("fullName")) {
            user.setFullName(updates.get("fullName"));
        }
        if (updates.containsKey("email")) {
            if (!user.getEmail().equals(updates.get("email")) &&
                userRepository.existsByEmail(updates.get("email"))) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
            }
            user.setEmail(updates.get("email"));
        }
        if (updates.containsKey("phone")) {
            user.setPhone(updates.get("phone"));
        }

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
    }

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String authHeader,
                                           @RequestBody Map<String, String> request) {
        String username = getUsernameFromToken(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");

        if (!user.getPassword().equals(currentPassword)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Current password is incorrect"));
        }

        user.setPassword(newPassword);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    }

    @PutMapping("/theme")
    public ResponseEntity<?> updateTheme(@RequestHeader("Authorization") String authHeader,
                                        @RequestBody Map<String, String> request) {
        String username = getUsernameFromToken(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        String theme = request.get("theme");
        if (!"light".equals(theme) && !"dark".equals(theme) && !"cinephile".equals(theme)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid theme. Must be 'light', 'dark', or 'cinephile'"));
        }

        user.setTheme(theme);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Theme updated successfully", "theme", theme));
    }

    @GetMapping("/bookings")
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

    // Admin endpoints
    @GetMapping("/admin/users")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String authHeader) {
        String username = getUsernameFromToken(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        User admin = userRepository.findByUsername(username).orElse(null);
        if (admin == null || admin.getRole().name().equals("USER")) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        List<User> users = userRepository.findAll();
        List<Map<String, Object>> userList = users.stream().map(user -> {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("username", user.getUsername());
            userMap.put("email", user.getEmail());
            userMap.put("fullName", user.getFullName());
            userMap.put("phone", user.getPhone());
            userMap.put("role", user.getRole().name());
            userMap.put("theme", user.getTheme());
            userMap.put("bookingsCount", bookingRepository.findByUserId(user.getId()).size());
            return userMap;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(userList);
    }

    @GetMapping("/admin/users/{userId}/bookings")
    public ResponseEntity<?> getUserBookings(@RequestHeader("Authorization") String authHeader,
                                            @PathVariable Long userId) {
        String username = getUsernameFromToken(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        User admin = userRepository.findByUsername(username).orElse(null);
        if (admin == null || admin.getRole().name().equals("USER")) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/admin/gift-ticket")
    public ResponseEntity<?> giftTicket(@RequestHeader("Authorization") String authHeader,
                                       @RequestBody Map<String, Object> giftData) {
        String username = getUsernameFromToken(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        User admin = userRepository.findByUsername(username).orElse(null);
        if (admin == null || admin.getRole().name().equals("USER")) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        try {
            Long userId = Long.parseLong(giftData.get("userId").toString());
            Long showId = Long.parseLong(giftData.get("showId").toString());
            int seats = Integer.parseInt(giftData.get("seats").toString());
            String message = giftData.get("message").toString();

            User user = userRepository.findById(userId).orElse(null);
            Show show = showRepository.findById(showId).orElse(null);

            if (user == null || show == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid user or show"));
            }

            if (show.getAvailableSeats() < seats) {
                return ResponseEntity.badRequest().body(Map.of("message", "Not enough available seats"));
            }

            Booking booking = new Booking();
            booking.setUser(user);
            booking.setShow(show);
            booking.setSeatsBooked(seats);
            booking.setTotalAmount(BigDecimal.ZERO); // Gift ticket - no charge
            booking.setBookingDate(LocalDateTime.now());
            booking.setBookingReference("GIFT-" + System.currentTimeMillis());
            booking.setStatus(Booking.Status.CONFIRMED);

            show.setAvailableSeats(show.getAvailableSeats() - seats);
            showRepository.save(show);

            Booking savedBooking = bookingRepository.save(booking);

            return ResponseEntity.ok(Map.of(
                "message", "Gift ticket sent successfully",
                "booking", savedBooking
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid gift data: " + e.getMessage()));
        }
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
}
