package com.moviebooking.controller;

import com.moviebooking.entity.Movie;
import com.moviebooking.repository.MovieRepository;
import com.moviebooking.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:4200")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMovieById(@PathVariable Long id) {
        Movie movie = movieRepository.findById(id).orElse(null);
        if (movie == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(movie);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam String query) {
        return ResponseEntity.ok(movieRepository.searchMovies(query));
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Movie>> getMoviesByGenre(@PathVariable String genre) {
        return ResponseEntity.ok(movieRepository.findByGenre(genre));
    }

    @PostMapping
    public ResponseEntity<?> createMovie(@RequestHeader("Authorization") String authHeader,
                                        @RequestBody Movie movie) {
        if (!isAdmin(authHeader)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        Movie savedMovie = movieRepository.save(movie);
        return ResponseEntity.ok(savedMovie);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMovie(@RequestHeader("Authorization") String authHeader,
                                        @PathVariable Long id,
                                        @RequestBody Movie movieDetails) {
        if (!isAdmin(authHeader)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        Movie movie = movieRepository.findById(id).orElse(null);
        if (movie == null) {
            return ResponseEntity.notFound().build();
        }

        movie.setTitle(movieDetails.getTitle());
        movie.setDescription(movieDetails.getDescription());
        movie.setGenre(movieDetails.getGenre());
        movie.setDuration(movieDetails.getDuration());
        movie.setLanguage(movieDetails.getLanguage());
        movie.setReleaseDate(movieDetails.getReleaseDate());
        movie.setRating(movieDetails.getRating());
        movie.setPosterUrl(movieDetails.getPosterUrl());

        Movie updatedMovie = movieRepository.save(movie);
        return ResponseEntity.ok(updatedMovie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovie(@RequestHeader("Authorization") String authHeader,
                                        @PathVariable Long id) {
        if (!isAdmin(authHeader)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        if (!movieRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        movieRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Movie deleted successfully"));
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
