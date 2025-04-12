package com.learn_loop_backend.backend.repository.profile_follower_management;


import com.learn_loop_backend.backend.model.profile_follower_management.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);
}