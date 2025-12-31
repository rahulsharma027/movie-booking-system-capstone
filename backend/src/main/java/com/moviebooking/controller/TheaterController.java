package com.moviebooking.controller;

import com.moviebooking.entity.Theater;
import com.moviebooking.repository.TheaterRepository;
import com.moviebooking.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/theaters")
@CrossOrigin(origins = "http://localhost:4200")
public class TheaterController {

    @Autowired
    private TheaterRepository theaterRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<Theater>> getAllTheaters() {
        return ResponseEntity.ok(theaterRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTheaterById(@PathVariable Long id) {
        Theater theater = theaterRepository.findById(id).orElse(null);
        if (theater == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(theater);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Theater>> getTheatersByCity(@PathVariable String city) {
        return ResponseEntity.ok(theaterRepository.findByCity(city));
    }

    @PostMapping
    public ResponseEntity<?> createTheater(@RequestHeader("Authorization") String authHeader,
                                          @RequestBody Theater theater) {
        if (!isAdmin(authHeader)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        Theater savedTheater = theaterRepository.save(theater);
        return ResponseEntity.ok(savedTheater);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTheater(@RequestHeader("Authorization") String authHeader,
                                          @PathVariable Long id,
                                          @RequestBody Theater theaterDetails) {
        if (!isAdmin(authHeader)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        Theater theater = theaterRepository.findById(id).orElse(null);
        if (theater == null) {
            return ResponseEntity.notFound().build();
        }

        theater.setName(theaterDetails.getName());
        theater.setCity(theaterDetails.getCity());
        theater.setAddress(theaterDetails.getAddress());
        theater.setCapacity(theaterDetails.getCapacity());

        Theater updatedTheater = theaterRepository.save(theater);
        return ResponseEntity.ok(updatedTheater);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTheater(@RequestHeader("Authorization") String authHeader,
                                          @PathVariable Long id) {
        if (!isAdmin(authHeader)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        if (!theaterRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        theaterRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Theater deleted successfully"));
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
