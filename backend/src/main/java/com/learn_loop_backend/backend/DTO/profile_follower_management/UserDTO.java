package com.learn_loop_backend.backend.DTO.profile_follower_management;




public class UserDTO {

    private String id;
    private String name;
    private String email;

    public UserDTO(String id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;

    }

    public UserDTO() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Add this to your existing UserDTO class
    private ProfileDTO profile;

    // Add getter and setter
    public ProfileDTO getProfile() {
        return profile;
    }

    public void setProfile(ProfileDTO profile) {
        this.profile = profile;
    }


}
