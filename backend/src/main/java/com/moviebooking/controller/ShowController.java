package com.moviebooking.controller;

import com.moviebooking.entity.Show;
import com.moviebooking.repository.ShowRepository;
import com.moviebooking.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shows")
@CrossOrigin(origins = "http://localhost:4200")
public class ShowController {

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<Show>> getAllShows() {
        return ResponseEntity.ok(showRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShowById(@PathVariable Long id) {
        Show show = showRepository.findById(id).orElse(null);
        if (show == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(show);
    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<Show>> getShowsByMovie(@PathVariable Long movieId) {
        return ResponseEntity.ok(showRepository.findByMovieId(movieId));
    }

    @GetMapping("/theater/{theaterId}")
    public ResponseEntity<List<Show>> getShowsByTheater(@PathVariable Long theaterId) {
        return ResponseEntity.ok(showRepository.findByTheaterId(theaterId));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Show>> getShowsByDate(@PathVariable String date) {
        LocalDate showDate = LocalDate.parse(date);
        return ResponseEntity.ok(showRepository.findByShowDate(showDate));
    }

    @PostMapping
    public ResponseEntity<?> createShow(@RequestHeader("Authorization") String authHeader,
                                       @RequestBody Show show) {
        if (!isAdmin(authHeader)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        Show savedShow = showRepository.save(show);
        return ResponseEntity.ok(savedShow);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateShow(@RequestHeader("Authorization") String authHeader,
                                       @PathVariable Long id,
                                       @RequestBody Show showDetails) {
        if (!isAdmin(authHeader)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        Show show = showRepository.findById(id).orElse(null);
        if (show == null) {
            return ResponseEntity.notFound().build();
        }

        show.setMovie(showDetails.getMovie());
        show.setTheater(showDetails.getTheater());
        show.setShowDate(showDetails.getShowDate());
        show.setShowTime(showDetails.getShowTime());
        show.setPrice(showDetails.getPrice());
        show.setAvailableSeats(showDetails.getAvailableSeats());

        Show updatedShow = showRepository.save(show);
        return ResponseEntity.ok(updatedShow);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShow(@RequestHeader("Authorization") String authHeader,
                                       @PathVariable Long id) {
        if (!isAdmin(authHeader)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        if (!showRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        showRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Show deleted successfully"));
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
