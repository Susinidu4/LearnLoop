package com.learn_loop_backend.backend.controller.comments_likes_notification_management;


import com.learn_loop_backend.backend.DTO.comments_likes_notification_management.CommentDTO;
import com.learn_loop_backend.backend.DTO.comments_likes_notification_management.LikeDTO;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Comment;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Like;
import com.learn_loop_backend.backend.model.PostsAndInteraction.Post;
import com.learn_loop_backend.backend.service.comments_likes_notification_management.CommentAndLikedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/post")
public class CommentsAndLikesController {

    @Autowired
    private CommentAndLikedService commentAndLikedService;

    // create cooment
    @PostMapping("/{postId}/comments")
    public ResponseEntity<Post> addComment(@PathVariable String postId, @RequestBody CommentDTO commentDTO) {
        Comment comment = new Comment();
        comment.setUserId(commentDTO.getUserId());
        comment.setContent(commentDTO.getContent());
        comment.setCommentedAt(new Date());

        Post post = commentAndLikedService.addComment(comment, postId);
        if (post != null) {
            return ResponseEntity.ok(post);
        }
        return ResponseEntity.notFound().build();
    }

    //update comment
    @PutMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Post> updateComment(
            @PathVariable String postId,
            @PathVariable String commentId,
            @RequestBody CommentDTO commentDTO) {

        Post updatedPost = commentAndLikedService.updateComment(postId, commentId, commentDTO.getContent());
        if (updatedPost != null) {
            return ResponseEntity.ok(updatedPost);
        }
        return ResponseEntity.notFound().build();
    }

    //view all the comments
    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable String postId) {
        return ResponseEntity.ok(commentAndLikedService.getPostById(postId)
                .map(Post::getComments)
                .orElse(null));
    }

    // delete comment by commentId and postId
    @DeleteMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Post> deleteComment(@PathVariable String postId, @PathVariable String commentId) {
        try {
            Post post = commentAndLikedService.deleteComment(commentId, postId);
            if (post != null) {
                return ResponseEntity.ok(post);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    //create like
    @PostMapping("/{postId}/likes")
    public ResponseEntity<Post> likePost(@PathVariable String postId, @RequestBody LikeDTO likeDTO) {
        Like like = new Like();
        like.setUserId(likeDTO.getUserId());
        like.setLikedAt(new Date());

        Post post = commentAndLikedService.likePost(like, postId);
        if (post != null) {
            return ResponseEntity.ok(post);
        }
        return ResponseEntity.notFound().build();
    }

    //delete like
    @DeleteMapping("/{postId}/likes/{userId}")
    public ResponseEntity<Post> unlikePost(@PathVariable String postId, @PathVariable String userId) {
        Post post = commentAndLikedService.unlikePost(userId, postId);
        if (post != null) {
            return ResponseEntity.ok(post);
        }
        return ResponseEntity.notFound().build();
    }

}
