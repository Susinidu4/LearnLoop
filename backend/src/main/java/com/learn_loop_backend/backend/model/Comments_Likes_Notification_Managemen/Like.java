package com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen;

import lombok.Data;
import java.util.Date;

@Data
public class Like {
    private String userId;
    private Date likedAt;

    public Like(String userId, Date likedAt) {
        this.userId = userId;
        this.likedAt = likedAt;
    }

    public Like() {

    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getLikedAt() {
        return likedAt;
    }

    public void setLikedAt(Date likedAt) {
        this.likedAt = likedAt;
    }
}