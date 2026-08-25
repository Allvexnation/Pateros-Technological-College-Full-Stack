package com.pateros.backend.controller;

import com.pateros.backend.dto.request.LoginRequest;
import com.pateros.backend.dto.request.RegisterRequest;
import com.pateros.backend.dto.response.UserResponse;
import com.pateros.backend.model.User;
import com.pateros.backend.service.CloudinaryService;
import com.pateros.backend.service.UserService;
import com.pateros.backend.security.JwtService;
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
    private final JwtService jwtService;

    public AuthController(UserService userService, CloudinaryService cloudinaryService, JwtService jwtService) {
        this.userService = userService;
        this.cloudinaryService = cloudinaryService;
        this.jwtService = jwtService;
    }
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody RegisterRequest request) {
        User user = userService.signup(request.getUsername(), request.getEmail(), request.getPassword(), request.getProfilePhotoUrl());
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "User created successfully");
        response.put("user", new UserResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getProfilePhotoUrl() != null ? user.getProfilePhotoUrl() : ""
        ));
        
        return ResponseEntity.ok(response);
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
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.login(request.getEmail(), request.getPassword());
        
        String token = jwtService.generateToken(request.getEmail(), user.getId());
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("user", new UserResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getProfilePhotoUrl() != null ? user.getProfilePhotoUrl() : ""
        ));
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Logout successful");
        return ResponseEntity.ok(response);
    }
}
