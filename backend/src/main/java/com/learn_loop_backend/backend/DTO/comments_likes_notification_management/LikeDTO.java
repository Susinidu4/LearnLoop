package com.learn_loop_backend.backend.DTO.comments_likes_notification_management;

import lombok.Data;

@Data
public class LikeDTO {
    private String userId;
    private String postId;

    public LikeDTO(String postId, String userId) {
        this.postId = postId;
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }
}