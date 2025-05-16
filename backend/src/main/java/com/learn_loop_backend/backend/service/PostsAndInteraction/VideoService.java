package com.learn_loop_backend.backend.service.PostsAndInteraction;

import com.cloudinary.utils.ObjectUtils;
import com.learn_loop_backend.backend.model.PostsAndInteraction.Video;
import com.learn_loop_backend.backend.repository.PostsAndInteraction.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.Cloudinary;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class VideoService {

    private final Cloudinary cloudinary;
    private final VideoRepository videoRepository;

    @Autowired
    public VideoService(Cloudinary cloudinary, VideoRepository videoRepository) {
        this.cloudinary = cloudinary;
        this.videoRepository = videoRepository;
    }

    public Video uploadVideo(MultipartFile file, String title, String userId) throws IOException {
        // Upload to Cloudinary
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "video",
                        "folder", "videos",
                        "public_id", title + "_" + System.currentTimeMillis()
                ));

        // Create Video entity
        Video video = new Video();
        video.setTitle(title);
        video.setPublicId((String) uploadResult.get("public_id"));
        video.setUrl((String) uploadResult.get("secure_url"));
        video.setFormat((String) uploadResult.get("format"));

        // Fix the bytes conversion
        Object bytesObj = uploadResult.get("bytes");
        long bytes;
        if (bytesObj instanceof Integer) {
            bytes = ((Integer) bytesObj).longValue();
        } else {
            bytes = (Long) bytesObj;
        }
        video.setBytes(bytes);

        video.setUserId(userId);

        // Save to MongoDB
        return videoRepository.save(video);
    }

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    public List<Video> getUserVideos(String userId) {
        return videoRepository.findByUserId(userId);
    }

    public void deleteVideo(String videoId) throws IOException {
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("Video not found"));

        // Delete from Cloudinary
        cloudinary.uploader().destroy(video.getPublicId(),
                ObjectUtils.asMap("resource_type", "video"));

        // Delete from MongoDB
        videoRepository.delete(video);
    }

    public Video updateVideoTitle(String videoId, String newTitle) {
        Video video = videoRepository.findById(videoId)  // Removed userId check
                .orElseThrow(() -> new RuntimeException("Video not found"));

        video.setTitle(newTitle);
        return videoRepository.save(video);
    }
}