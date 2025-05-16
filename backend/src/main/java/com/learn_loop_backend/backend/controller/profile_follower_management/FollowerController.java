package com.learn_loop_backend.backend.controller.profile_follower_management;

import com.learn_loop_backend.backend.DTO.profile_follower_management.FollowRequestDTO;
import com.learn_loop_backend.backend.model.profile_follower_management.Followers;
import com.learn_loop_backend.backend.service.profile_follower_management.FollowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/followers")
public class FollowerController {

    @Autowired
    private FollowerService followerService;

    // Follow a user
    @PostMapping
    public ResponseEntity<Followers> followUser(@RequestBody FollowRequestDTO followRequestDTO) {
        Followers followers = followerService.followUser(followRequestDTO);
        return ResponseEntity.ok(followers);
    }

    // Get all followers of a user
    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<Followers>> getFollowers(@PathVariable String userId) {
        List<Followers> followers = followerService.getFollowersOfUser(userId);
        return ResponseEntity.ok(followers);
    }

    // Get all users a person is following
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<Followers>> getFollowing(@PathVariable String userId) {
        List<Followers> following = followerService.getFollowingByUser(userId);
        return ResponseEntity.ok(following);
    }

    // Check if a user is following another user
    @GetMapping("/check")
    public ResponseEntity<Boolean> isFollowing(
            @RequestParam String followerId,
            @RequestParam String followingId) {
        boolean isFollowing = followerService.isFollowing(followerId, followingId);
        return ResponseEntity.ok(isFollowing);
    }

    // Unfollow a user
    @DeleteMapping
    public ResponseEntity<Void> unfollowUser(
            @RequestParam String followerId,
            @RequestParam String followingId) {
        followerService.unfollowUser(followerId, followingId);
        return ResponseEntity.noContent().build();
    }

    // Update follow relationship (rarely needed)
    @PutMapping("/{id}")
    public ResponseEntity<Followers> updateFollowRelationship(
            @PathVariable String id,
            @RequestBody FollowRequestDTO followRequestDTO) {
        Followers updated = followerService.updateFollowRelationship(id, followRequestDTO);
        return ResponseEntity.ok(updated);
    }
}