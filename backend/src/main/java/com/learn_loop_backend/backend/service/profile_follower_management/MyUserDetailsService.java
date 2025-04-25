package com.learn_loop_backend.backend.service.profile_follower_management;

import com.learn_loop_backend.backend.repository.profile_follower_management.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;



public class MyUserDetailsService implements UserDetailsService {


    private final UserRepository userRepository;

    public MyUserDetailsService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // email is the username
        com.learn_loop_backend.backend.model.profile_follower_management.User userData = userRepository.findByEmail(email).orElse(null);
        if (userData == null) throw new UsernameNotFoundException("User not found");

        return User.builder()
                .username(userData.getEmail())  // Using email as username
                .password(userData.getPassword())
                .roles("USER")
                .build();
    }

}