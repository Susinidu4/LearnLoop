package com.learn_loop_backend.backend.model.PostsAndInteraction;

import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Comment;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Like;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "posts")
@Data
public class Post {
    @Id
    private String id;
    private String userId;
    private String description;
    private String category;
    private List<String> mediaUrls; // URLs of uploaded media files
    private Date createdAt;
    private Date updatedAt;
    private List<Like> likes = new ArrayList<>();  // Initialize here
    private List<Comment> comments = new ArrayList<>();  // Initialize here

    public Post(String userId, String description, String category, List<String> mediaUrls, Date createdAt, Date updatedAt) {
        this.userId = userId;
        this.description = description;
        this.category = category;
        this.mediaUrls = mediaUrls;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Post() {
        this.likes = new ArrayList<>();
        this.comments = new ArrayList<>();
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

    public List<String> getMediaUrls() {
        return mediaUrls;
    }

    public void setMediaUrls(List<String> mediaUrls) {
        this.mediaUrls = mediaUrls;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Like> getLikes() {
        return likes;
    }

    public void setLikes(List<Like> likes) {
        this.likes = likes;
    }
}