package com.learn_loop_backend.backend.service.comments_likes_notification_management;

import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Comment;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Like;
import com.learn_loop_backend.backend.model.PostsAndInteraction.Post;
import com.learn_loop_backend.backend.repository.PostsAndInteraction.PostAndInteractionRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentAndLikedService {

    @Autowired
    private PostAndInteractionRepository postRepository;

    public Optional<Post> getPostById(String id) {
        return postRepository.findById(id);
    }

    // create comment
    public Post addComment(Comment comment, String postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();

            // Generate ID for the comment
            if (comment.getId() == null || comment.getId().isEmpty()) {
                comment.setId(new ObjectId().toHexString());
            }

            List<Comment> comments = post.getComments();
            if (comments == null) {
                comments = new ArrayList<>();
                post.setComments(comments);
            }
            comments.add(comment);

            return postRepository.save(post);
        }
        return null;
    }

    // delete comment by commentId and postId
    public Post deleteComment(String commentId, String postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            // Find the comment by ID and remove it from the post's comment list
            post.getComments().removeIf(comment -> comment.getId().equals(commentId));

            // Save the updated post
            return postRepository.save(post);
        }
        return null;
    }

    // update comment
    public Post updateComment(String postId, String commentId, String newContent) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            List<Comment> comments = post.getComments();

            if (comments != null) {
                for (Comment comment : comments) {
                    if (comment.getId() != null && comment.getId().equals(commentId)) {
                        comment.setContent(newContent);
                        comment.setCommentedAt(new Date()); // Optional: Update timestamp
                        break; // Stop loop once updated
                    }
                }
                return postRepository.save(post); // Save the updated post
            }
        }
        return null;
    }

    //create like
    public Post likePost(Like like, String postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            List<Like> likes = post.getLikes();
            likes.add(like);
            post.setLikes(likes);
            return postRepository.save(post);
        }
        return null;
    }

    // delete like
    public Post unlikePost(String userId, String postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            List<Like> likes = post.getLikes();
            likes.removeIf(like -> like.getUserId().equals(userId));
            post.setLikes(likes);
            return postRepository.save(post);
        }
        return null;
    }

}
