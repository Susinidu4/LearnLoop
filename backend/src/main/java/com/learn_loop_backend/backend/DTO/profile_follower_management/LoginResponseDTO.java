package com.learn_loop_backend.backend.DTO.profile_follower_management;

import java.time.LocalDate;

public class LoginResponseDTO {
    private String token;
    private LocalDate expiresAt;
    private String error;
    private String message;
    private UserDTO user;  // Add this field for user details

    // Modify constructor to include user
    public LoginResponseDTO(String token, LocalDate expiresAt, String error, String message, UserDTO user) {
        this.token = token;
        this.expiresAt = expiresAt;
        this.error = error;
        this.message = message;
        this.user = user;
    }


    // Add getter and setter for user
    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDate getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDate expiresAt) {
        this.expiresAt = expiresAt;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    // Other getters and setters...
}