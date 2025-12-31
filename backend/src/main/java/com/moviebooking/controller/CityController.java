package com.moviebooking.controller;

import com.moviebooking.model.City;
import com.moviebooking.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "http://localhost:4200")
public class CityController {

    @Autowired
    private CityRepository cityRepository;

    @GetMapping
    public ResponseEntity<List<City>> getAllCities() {
        List<City> cities = cityRepository.findAll();
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/active")
    public ResponseEntity<List<City>> getActiveCities() {
        List<City> cities = cityRepository.findByIsActiveTrue();
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCityById(@PathVariable Long id) {
        return cityRepository.findById(id)
                .map(city -> ResponseEntity.ok((Object) city))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body((Object) createErrorResponse("City not found")));
    }

    @PostMapping
    public ResponseEntity<?> createCity(@RequestBody City city) {
        try {
            if (cityRepository.existsByName(city.getName())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(createErrorResponse("City already exists"));
            }
            City savedCity = cityRepository.save(city);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Error creating city: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCity(@PathVariable Long id, @RequestBody City cityDetails) {
        return cityRepository.findById(id)
                .map(city -> {
                    city.setName(cityDetails.getName());
                    city.setState(cityDetails.getState());
                    city.setIsActive(cityDetails.getIsActive());
                    City updatedCity = cityRepository.save(city);
                    return ResponseEntity.ok((Object) updatedCity);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body((Object) createErrorResponse("City not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCity(@PathVariable Long id) {
        return cityRepository.findById(id)
                .map(city -> {
                    cityRepository.delete(city);
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "City deleted successfully");
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(createErrorResponse("City not found")));
    }

    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<Object> toggleCityStatus(@PathVariable Long id) {
        return cityRepository.findById(id)
                .map(city -> {
                    city.setIsActive(!city.getIsActive());
                    City updatedCity = cityRepository.save(city);
                    return ResponseEntity.ok((Object) updatedCity);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body((Object) createErrorResponse("City not found")));
    }

    private Map<String, String> createErrorResponse(String message) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        return error;
    }
}
