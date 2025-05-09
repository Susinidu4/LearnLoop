package com.learn_loop_backend.backend.DTO.comments_likes_notification_management;

import lombok.Data;

@Data
public class CommentDTO {
    private String userId;
    private String postId;
    private String content;

    public CommentDTO(String userId, String postId, String content) {
        this.userId = userId;
        this.postId = postId;
        this.content = content;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

