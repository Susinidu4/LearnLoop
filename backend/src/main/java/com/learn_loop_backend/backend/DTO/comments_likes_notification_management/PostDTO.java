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
}