package com.learn_loop_backend.backend.repository.profile_follower_management;

import com.learn_loop_backend.backend.model.profile_follower_management.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfileRepository extends MongoRepository<Profile, String> {
    Profile findByUserId(String userId);
}
