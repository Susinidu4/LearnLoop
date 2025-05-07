package com.learn_loop_backend.backend.DTO.profile_follower_management;

public class ProfileDTO {
    private String id;
    private String imageUrl;

    // Constructors, Getters and Setters
    public ProfileDTO() {}

    public ProfileDTO(String id, String imageUrl) {
        this.id = id;
        this.imageUrl = imageUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}