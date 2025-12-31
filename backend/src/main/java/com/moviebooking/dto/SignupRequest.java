package com.moviebooking.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private String fullName;
    private String phone;
}
