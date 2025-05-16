package com.learn_loop_backend.backend.controller.comments_likes_notification_management;


import com.learn_loop_backend.backend.DTO.comments_likes_notification_management.CommentDTO;
import com.learn_loop_backend.backend.DTO.comments_likes_notification_management.LikeDTO;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.VideoComments;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.VideoLikes;
import com.learn_loop_backend.backend.model.PostsAndInteraction.Video;
import com.learn_loop_backend.backend.service.comments_likes_notification_management.VideoCommentAndLikedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/video")
public class VideoCommentsAndLikesController {

    @Autowired
    private VideoCommentAndLikedService videoCommentAndLikedService;

    // create comment
    @PostMapping("/{postId}/comments")
    public ResponseEntity<Video> addComment(@PathVariable String postId, @RequestBody CommentDTO commentDTO) {
        VideoComments comment = new VideoComments();
        comment.setUserId(commentDTO.getUserId());
        comment.setContent(commentDTO.getContent());
        comment.setCommentedAt(new Date());

        Video video = videoCommentAndLikedService.addComment(comment, postId);
        if (video != null) {
            return ResponseEntity.ok(video);
        }
        return ResponseEntity.notFound().build();
    }

    //update comment
    @PutMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Video> updateComment(
            @PathVariable String postId,
            @PathVariable String commentId,
            @RequestBody CommentDTO commentDTO) {

        Video updateVideo = videoCommentAndLikedService.updateComment(postId, commentId, commentDTO.getContent());
        if (updateVideo != null) {
            return ResponseEntity.ok(updateVideo);
        }
        return ResponseEntity.notFound().build();
    }

    //view all the comments
    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<VideoComments>> getAllComments(@PathVariable String postId) {
        return ResponseEntity.ok(videoCommentAndLikedService.getPostById(postId)
                .map(Video::getComments)
                .orElse(null));
    }

    // delete comment by commentId and postId
    @DeleteMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Video> deleteComment(@PathVariable String postId, @PathVariable String commentId) {
        try {
            Video video = videoCommentAndLikedService.deleteComment(commentId, postId);
            if (video != null) {
                return ResponseEntity.ok(video);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


    //create like
    @PostMapping("/{postId}/likes")
    public ResponseEntity<Video> likePost(@PathVariable String postId, @RequestBody LikeDTO likeDTO) {
        VideoLikes like = new VideoLikes();
        like.setUserId(likeDTO.getUserId());
        like.setLikedAt(new Date());

        Video video = videoCommentAndLikedService.likePost(like, postId);
        if (video != null) {
            return ResponseEntity.ok(video);
        }
        return ResponseEntity.notFound().build();
    }

    //delete like
    @DeleteMapping("/{postId}/likes/{userId}")
    public ResponseEntity<Video> unlikePost(@PathVariable String postId, @PathVariable String userId) {
        Video video = videoCommentAndLikedService.unlikePost(userId, postId);
        if (video != null) {
            return ResponseEntity.ok(video);
        }
        return ResponseEntity.notFound().build();
    }


}
