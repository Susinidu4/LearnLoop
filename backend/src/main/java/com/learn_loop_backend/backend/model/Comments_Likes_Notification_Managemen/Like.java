package com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen;

import lombok.Data;
import java.util.Date;

@Data
public class Like {
    private String userId;
    private Date likedAt;
}