package com.learn_loop_backend.backend.repository.profile_follower_management;


import com.learn_loop_backend.backend.model.profile_follower_management.Followers;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface FollowerRepository extends MongoRepository<Followers, String> {

    List<Followers> findByFollowINGId(String userId);
    List<Followers> findByFollowerId(String userId);
    boolean existsByFollowerIdAndFollowINGId(String followerId, String followingId);
    Optional<Followers> findByFollowerIdAndFollowINGId(String followerId, String followingId);



}
