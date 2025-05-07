package com.learn_loop_backend.backend.service.profile_follower_management;

import com.learn_loop_backend.backend.DTO.profile_follower_management.FollowRequestDTO;
import com.learn_loop_backend.backend.model.profile_follower_management.Followers;
import com.learn_loop_backend.backend.repository.profile_follower_management.FollowerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FollowerService {

    @Autowired
    private FollowerRepository followerRepository;

    // CREATE - Follow a user
    public Followers followUser(FollowRequestDTO followRequestDTO) {
        // Check if the follow relationship already exists
        boolean alreadyExists = followerRepository.existsByFollowerIdAndFollowINGId(
                followRequestDTO.getFollowerId(),
                followRequestDTO.getFollowingId()
        );

        if (alreadyExists) {
            throw new RuntimeException("User is already following this profile");
        }

        Followers followers = new Followers(
                followRequestDTO.getFollowerId(),
                followRequestDTO.getFollowingId()
        );

        return followerRepository.save(followers);
    }

    // RETRIEVE - Get all followers of a user
    public List<Followers> getFollowersOfUser(String userId) {
        return followerRepository.findByFollowINGId(userId);
    }

    // RETRIEVE - Get all users a person is following
    public List<Followers> getFollowingByUser(String userId) {
        return followerRepository.findByFollowerId(userId);
    }

    // RETRIEVE - Check if a specific follow relationship exists
    public boolean isFollowing(String followerId, String followingId) {
        return followerRepository.existsByFollowerIdAndFollowINGId(followerId, followingId);
    }

    // DELETE - Unfollow a user
    public void unfollowUser(String followerId, String followingId) {
        Optional<Followers> followRelationship = followerRepository.findByFollowerIdAndFollowINGId(followerId, followingId);

        if (followRelationship.isPresent()) {
            followerRepository.delete(followRelationship.get());
        } else {
            throw new RuntimeException("Follow relationship not found");
        }
    }

    // UPDATE - Not typically needed for simple follow relationships, but here's an example if needed
    public Followers updateFollowRelationship(String id, FollowRequestDTO followRequestDTO) {
        Optional<Followers> existing = followerRepository.findById(id);

        if (existing.isPresent()) {
            Followers updated = existing.get();
            updated.setFollowerId(followRequestDTO.getFollowerId());
            updated.setFollowINGId(followRequestDTO.getFollowingId());
            return followerRepository.save(updated);
        } else {
            throw new RuntimeException("Follow relationship not found with id: " + id);
        }
    }
}