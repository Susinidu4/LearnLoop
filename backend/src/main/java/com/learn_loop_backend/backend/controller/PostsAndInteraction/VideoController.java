package com.learn_loop_backend.backend.controller.PostsAndInteraction;


import com.learn_loop_backend.backend.model.PostsAndInteraction.Video;
import com.learn_loop_backend.backend.service.PostsAndInteraction.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoService videoService;

    @Autowired
    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadVideo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestHeader("X-User-Id") String userId) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
            }

            if (title == null || title.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Title is required"));
            }

            Video video = videoService.uploadVideo(file, title, userId);
            return ResponseEntity.ok(video);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to upload video: " + e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Video>> getAllVideos() {
        List<Video> videos = videoService.getAllVideos();
        return ResponseEntity.ok(videos);
    }

    @GetMapping
    public ResponseEntity<List<Video>> getUserVideos(@RequestHeader("X-User-Id") String userId) {
        List<Video> videos = videoService.getUserVideos(userId);
        return ResponseEntity.ok(videos);
    }

    @DeleteMapping("/{videoId}")
    public ResponseEntity<Void> deleteVideo(
            @PathVariable String videoId,
            @RequestHeader("X-User-Id") String userId) throws IOException {
        videoService.deleteVideo(videoId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{videoId}/title")
    public ResponseEntity<?> updateVideoTitle(
            @PathVariable String videoId,
            @RequestParam String newTitle) {  // Removed userId parameter
        try {
            if (newTitle == null || newTitle.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Title cannot be empty"));
            }

            Video updatedVideo = videoService.updateVideoTitle(videoId, newTitle);
            return ResponseEntity.ok(updatedVideo);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}