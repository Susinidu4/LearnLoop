package com.learn_loop_backend.backend.model.PostsAndInteraction;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "videos")
public class Video {
    @Id
    private String id;
    private String title;
    private String publicId;
    private String url;
    private String format;
    private long bytes;
    private Date createdAt;
    private String userId; // If you have user authentication

    // Constructors
    public Video() {}

    public Video(String title, String publicId, String url, String format, long bytes) {
        this.title = title;
        this.publicId = publicId;
        this.url = url;
        this.format = format;
        this.bytes = bytes;
        this.createdAt = new Date();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getFormat() { return format; }
    public void setFormat(String format) { this.format = format; }
    public long getBytes() { return bytes; }
    public void setBytes(long bytes) { this.bytes = bytes; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}