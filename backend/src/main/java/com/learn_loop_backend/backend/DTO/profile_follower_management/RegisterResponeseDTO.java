package com.learn_loop_backend.backend.DTO.profile_follower_management;

public class RegisterResponeseDTO {

    private String message;
    private String error;

    public RegisterResponeseDTO(String error, String message) {
        this.error = error;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public void setMessage(String message) {
        this.message = message;
    }


}
