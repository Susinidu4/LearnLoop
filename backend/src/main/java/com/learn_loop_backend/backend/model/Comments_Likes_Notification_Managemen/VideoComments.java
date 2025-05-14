package com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen;


import lombok.Data;

import java.util.Date;

@Data
public class VideoComments {

    private String id;
    private String userId;
    private String content;
    private Date commentedAt;

    public VideoComments(String userId, String content, Date commentedAt) {
        this.userId = userId;
        this.content = content;
        this.commentedAt = commentedAt;
    }

    public VideoComments() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCommentedAt() {
        return commentedAt;
    }

    public void setCommentedAt(Date commentedAt) {
        this.commentedAt = commentedAt;
    }
}
