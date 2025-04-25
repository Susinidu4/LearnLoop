package com.learn_loop_backend.backend.DTO.comments_likes_notification_management;

import lombok.Data;

@Data
public class LikeDTO {
    private String userId;
    private String postId;
}