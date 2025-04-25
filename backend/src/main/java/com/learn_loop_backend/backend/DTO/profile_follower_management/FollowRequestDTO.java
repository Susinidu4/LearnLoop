package com.learn_loop_backend.backend.DTO.profile_follower_management;

public class FollowRequestDTO {
    private String followerId;
    private String followingId;

    // getters and setters
    public String getFollowerId() {
        return followerId;
    }

    public void setFollowerId(String followerId) {
        this.followerId = followerId;
    }

    public String getFollowingId() {
        return followingId;
    }

    public void setFollowingId(String followingId) {
        this.followingId = followingId;
    }
}
