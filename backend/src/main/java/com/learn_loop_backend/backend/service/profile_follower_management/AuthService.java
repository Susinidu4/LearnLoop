package com.learn_loop_backend.backend.service.profile_follower_management;

import com.learn_loop_backend.backend.DTO.profile_follower_management.*;
import com.learn_loop_backend.backend.model.profile_follower_management.User;
import com.learn_loop_backend.backend.repository.profile_follower_management.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;


    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    //get all users
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    //All users according to DTO
    public List<UserDTO> getAllUsersAsDTO() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        return userDTO;
    }

    //create user
    public User createUser(RegisterRequestDTO userData) {
        User newUser = new User(userData.getName(), userData.getEmail(), passwordEncoder.encode(userData.getPassword()));
        return userRepository.save(newUser);
    }

    //user login
    public LoginResponseDTO login(LoginRequestDTO loginData) {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginData.getEmail(),loginData.getPassword()));
        } catch (Exception e) {
            return new LoginResponseDTO(null , null , "user not found", "errro");
        }

        Map<String, Object> claims = new HashMap<String,Object>();
        claims.put("role", "User");
        claims.put("email", "company@gmail.com");

        String token = jwtService.getJWTToken(loginData.getEmail(), claims);

        System.out.println(jwtService.getFieldFormToken(token,"role"));
        return new LoginResponseDTO(token, LocalDate.now(), null, "token successful");
    }

    //user register
    public RegisterResponeseDTO register(RegisterRequestDTO req) {
        if (isUserExist(req.getEmail())) {
            return new RegisterResponeseDTO(null, "User already exists");
        }
        var userData = this.createUser(req);
        if (userData.getId() == null) {
            return new RegisterResponeseDTO(null, "System error");
        }
        return new RegisterResponeseDTO(null,String.format("User registered at %s", userData.getId()));
    }

    private Boolean isUserEnable(String username){
        return userRepository.findByEmail(username).isPresent();
    }

    private Boolean isUserExist(String email) {  // Changed parameter and method name
        return userRepository.findByEmail(email).isPresent();
    }

    // Get user by ID
    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // Update user
    public User updateUser(String id, RegisterRequestDTO userData) {
        User existingUser = getUserById(id);

        existingUser.setName(userData.getName());
        existingUser.setEmail(userData.getEmail());

        // Only update password if it's provided and not empty
        if (userData.getPassword() != null && !userData.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(userData.getPassword()));
        }

        return userRepository.save(existingUser);
    }

    // Delete user
    public String deleteUser(String id) {
        User user = getUserById(id);
        userRepository.delete(user);
        return "User with id " + id + " has been deleted successfully";
    }
}