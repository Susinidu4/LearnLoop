package com.learn_loop_backend.backend.service.comments_likes_notification_management;



import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.VideoComments;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.VideoLikes;
import com.learn_loop_backend.backend.model.PostsAndInteraction.Video;
import com.learn_loop_backend.backend.repository.PostsAndInteraction.VideoRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class VideoCommentAndLikedService {

    @Autowired
    private VideoRepository videoRepository;

    public Optional<Video> getPostById(String id) {
        return videoRepository.findById(id);
    }

    // create comment
    public Video addComment(VideoComments comment, String postId) {
        Optional<Video> postOptional = videoRepository.findById(postId);
        if (postOptional.isPresent()) {
            Video video = postOptional.get();

            // Generate ID for the comment
            if (comment.getId() == null || comment.getId().isEmpty()) {
                comment.setId(new ObjectId().toHexString());
            }

            List<VideoComments> comments = video.getComments();
            if (comments == null) {
                comments = new ArrayList<>();
                video.setComments(comments);
            }
            comments.add(comment);

            return videoRepository.save(video);
        }
        return null;
    }

    // delete comment by commentId and videoId
    public Video deleteComment(String commentId, String postId) {
        Video video = videoRepository.findById(postId).orElse(null);
        if (video != null) {
            // Find the comment by ID and remove it from the post's comment list
            video.getComments().removeIf(comment -> comment.getId().equals(commentId));

            // Save the updated post
            return videoRepository.save(video);
        }
        return null;
    }

    // update comment
    public Video updateComment(String postId, String commentId, String newContent) {
        Optional<Video> videoOptional = videoRepository.findById(postId);
        if (videoOptional.isPresent()) {
            Video video = videoOptional.get();
            List<VideoComments> comments = video.getComments();

            if (comments != null) {
                for (VideoComments comment : comments) {
                    if (comment.getId() != null && comment.getId().equals(commentId)) {
                        comment.setContent(newContent);
                        comment.setCommentedAt(new Date()); // Optional: Update timestamp
                        break; // Stop loop once updated
                    }
                }
                return videoRepository.save(video); // Save the updated post
            }
        }
        return null;
    }

    //create like
    public Video likePost(VideoLikes like, String postId) {
        Optional<Video> videoOptional = videoRepository.findById(postId);
        if (videoOptional.isPresent()) {
            Video video = videoOptional.get();
            List<VideoLikes> likes = video.getLikes();
            likes.add(like);
            video.setLikes(likes);
            return videoRepository.save(video);
        }
        return null;
    }

    // delete like
    public Video unlikePost(String userId, String postId) {
        Optional<Video> videoOptional = videoRepository.findById(postId);
        if (videoOptional.isPresent()) {
            Video video = videoOptional.get();
            List<VideoLikes> likes = video.getLikes();
            likes.removeIf(like -> like.getUserId().equals(userId));
            video.setLikes(likes);
            return videoRepository.save(video);
        }
        return null;
    }
}
