package com.learn_loop_backend.backend.controller.comments_likes_notification_management;

import com.learn_loop_backend.backend.DTO.comments_likes_notification_management.CommentDTO;
import com.learn_loop_backend.backend.DTO.comments_likes_notification_management.LikeDTO;
import com.learn_loop_backend.backend.DTO.comments_likes_notification_management.PostDTO;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Comment;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Like;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Post;
import com.learn_loop_backend.backend.service.comments_likes_notification_management.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostDTO postDTO) {
        try {
            Post post = postService.createPost(postDTO);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(postService.getPostsByUserId(userId));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Post>> getPostsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(postService.getPostsByCategory(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable String id, @RequestBody PostDTO postDTO) {
        try {
            Post post = postService.updatePost(id, postDTO);
            if (post != null) {
                return ResponseEntity.ok(post);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    // create cooment
    @PostMapping("/{postId}/comments")
    public ResponseEntity<Post> addComment(@PathVariable String postId, @RequestBody CommentDTO commentDTO) {
        Comment comment = new Comment();
        comment.setUserId(commentDTO.getUserId());
        comment.setContent(commentDTO.getContent());
        comment.setCommentedAt(new Date());

        Post post = postService.addComment(comment, postId);
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

        Post updatedPost = postService.updateComment(postId, commentId, commentDTO.getContent());
        if (updatedPost != null) {
            return ResponseEntity.ok(updatedPost);
        }
        return ResponseEntity.notFound().build();
    }

    //view all the comments
    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable String postId) {
        return ResponseEntity.ok(postService.getPostById(postId)
                .map(Post::getComments)
                .orElse(null));
    }

    // delete comment by commentId and postId
    @DeleteMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Post> deleteComment(@PathVariable String postId, @PathVariable String commentId) {
        try {
            Post post = postService.deleteComment(commentId, postId);
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

        Post post = postService.likePost(like, postId);
        if (post != null) {
            return ResponseEntity.ok(post);
        }
        return ResponseEntity.notFound().build();
    }

    //delete like
    @DeleteMapping("/{postId}/likes/{userId}")
    public ResponseEntity<Post> unlikePost(@PathVariable String postId, @PathVariable String userId) {
        Post post = postService.unlikePost(userId, postId);
        if (post != null) {
            return ResponseEntity.ok(post);
        }
        return ResponseEntity.notFound().build();
    }
}