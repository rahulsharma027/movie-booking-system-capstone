package com.moviebooking.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "movies")
@Data
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String genre;

    @Column(nullable = false)
    private String language;

    @Column(name = "imdb_url")
    private String imdbUrl;

    @Column(nullable = false)
    private Integer duration;

    private String director;

    @Column(columnDefinition = "TEXT")
    private String cast;

    @Column(name = "poster_url")
    private String posterUrl;

    @Column(name = "trailer_url")
    private String trailerUrl;

    private BigDecimal rating;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
