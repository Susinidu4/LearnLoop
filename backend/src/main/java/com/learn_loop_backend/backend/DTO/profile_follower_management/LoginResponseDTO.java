package com.learn_loop_backend.backend.DTO.profile_follower_management;

import java.time.LocalDate;

public class LoginResponseDTO {

    private String token;
    private LocalDate date;
    private String error;
    private String message;

    public LoginResponseDTO(String token, LocalDate date, String error, String message) {
        this.token = token;
        this.date = date;
        this.error = error;
        this.message = message;
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

    public LoginResponseDTO(String token, LocalDate date) {
        this.token = token;
        this.date = date;
    }



    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
