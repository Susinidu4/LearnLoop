package com.learn_loop_backend.backend.DTO.comments_likes_notification_management;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Data
public class PostDTO {
    private String userId;
    private String description;
    private String category;
    private List<MultipartFile> mediaFiles;

    public PostDTO(String userId, String description, String category, List<MultipartFile> mediaFiles) {
        this.userId = userId;
        this.description = description;
        this.category = category;
        this.mediaFiles = mediaFiles;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<MultipartFile> getMediaFiles() {
        return mediaFiles;
    }

    public void setMediaFiles(List<MultipartFile> mediaFiles) {
        this.mediaFiles = mediaFiles;
    }
}