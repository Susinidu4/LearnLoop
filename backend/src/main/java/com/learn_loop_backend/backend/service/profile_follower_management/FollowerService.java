package com.learn_loop_backend.backend.service.profile_follower_management;

import com.learn_loop_backend.backend.DTO.profile_follower_management.FollowRequestDTO;
import com.learn_loop_backend.backend.model.profile_follower_management.User;
import com.learn_loop_backend.backend.repository.profile_follower_management.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowerService {

    private final UserRepository userRepository;

    public FollowerService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public String followUser(FollowRequestDTO followRequest) {
        User follower = getUserById(followRequest.getFollowerId());
        User following = getUserById(followRequest.getFollowingId());

        if (follower.getFollowing().contains(following)) {
            return "User is already following this account";
        }

        follower.getFollowing().add(following);
        following.getFollowers().add(follower);

        userRepository.save(follower);
        userRepository.save(following);

        return "Successfully followed user";
    }

    public String unfollowUser(FollowRequestDTO followRequest) {
        User follower = getUserById(followRequest.getFollowerId());
        User following = getUserById(followRequest.getFollowingId());

        if (!follower.getFollowing().contains(following)) {
            return "User is not following this account";
        }

        follower.getFollowing().remove(following);
        following.getFollowers().remove(follower);

        userRepository.save(follower);
        userRepository.save(following);

        return "Successfully unfollowed user";
    }

    public List<User> getFollowers(String userId) {
        User user = getUserById(userId);
        return user.getFollowers();
    }

    public List<User> getFollowing(String userId) {
        User user = getUserById(userId);
        return user.getFollowing();
    }
}
