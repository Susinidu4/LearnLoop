package com.learn_loop_backend.backend.controller.profile_follower_management;




import com.learn_loop_backend.backend.DTO.profile_follower_management.*;
import com.learn_loop_backend.backend.model.profile_follower_management.User;
import com.learn_loop_backend.backend.service.profile_follower_management.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @GetMapping
    public List<User> getAllUsers() {
        return authService.getUsers();
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> AllUsers() {
        List<UserDTO> users = authService.getAllUsersAsDTO();
        return ResponseEntity.ok(users);
    }


    @PostMapping
    public User createUser(@RequestBody RegisterRequestDTO user) {
        return authService.createUser(user);
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO loginData ) {

        LoginResponseDTO res = authService.login(loginData);
        if (res.getError() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res).getBody();
        }

        return ResponseEntity.status(HttpStatus.OK).body(res).getBody();
    }

    @PostMapping("/register")
    public RegisterResponeseDTO register(@RequestBody RegisterRequestDTO req ) {

        RegisterResponeseDTO res = authService.register(req);
        if (res.getError() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res).getBody();
        }

        return ResponseEntity.status(HttpStatus.OK).body(res).getBody();
    }



    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        try {
            User user = authService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody RegisterRequestDTO userData) {
        try {
            User updatedUser = authService.updateUser(id, userData);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        try {
            String message = authService.deleteUser(id);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


}
