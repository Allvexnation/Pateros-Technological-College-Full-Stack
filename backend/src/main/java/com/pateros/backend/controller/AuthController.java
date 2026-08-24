package com.pateros.backend.controller;

import com.pateros.backend.model.User;
import com.pateros.backend.service.CloudinaryService;
import com.pateros.backend.service.UserService;
import com.pateros.backend.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final UserService userService;
    private final CloudinaryService cloudinaryService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, CloudinaryService cloudinaryService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.cloudinaryService = cloudinaryService;
        this.jwtUtil = jwtUtil;
    }
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String email = request.get("email");
            String password = request.get("password");
            String profilePhotoUrl = request.get("profilePhotoUrl");
            
            User user = userService.signup(username, email, password, profilePhotoUrl);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User created successfully");
            response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "profilePhotoUrl", user.getProfilePhotoUrl() != null ? user.getProfilePhotoUrl() : ""
            ));
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/upload-photo")
    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile file) {
        try {
            String photoUrl = cloudinaryService.uploadFile(file);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("photoUrl", photoUrl);
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to upload photo: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            
            User user = userService.login(email, password);
            
            String token = jwtUtil.generateToken(email, user.getId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("token", token);
            response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "profilePhotoUrl", user.getProfilePhotoUrl() != null ? user.getProfilePhotoUrl() : ""
            ));
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
