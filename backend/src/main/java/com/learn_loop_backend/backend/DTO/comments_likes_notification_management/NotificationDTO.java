package com.learn_loop_backend.backend.DTO.comments_likes_notification_management;

import java.time.LocalDateTime;

public class NotificationDTO {
    private String postId;
    private String receiverUserId;
    private String senderUserId;
    private String type;
    private String message;
    private String status;
    private LocalDateTime createdAt;

    public NotificationDTO() {}

    public NotificationDTO(String postId, String receiverUserId, String senderUserId, String type,
                           String message, String status, LocalDateTime createdAt) {
        this.postId = postId;
        this.receiverUserId = receiverUserId;
        this.senderUserId = senderUserId;
        this.type = type;
        this.message = message;
        this.status = status;
        this.createdAt = createdAt;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getReceiverUserId() {
        return receiverUserId;
    }

    public void setReceiverUserId(String receiverUserId) {
        this.receiverUserId = receiverUserId;
    }

    public String getSenderUserId() {
        return senderUserId;
    }

    public void setSenderUserId(String senderUserId) {
        this.senderUserId = senderUserId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
