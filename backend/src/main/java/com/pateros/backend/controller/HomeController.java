package com.pateros.backend.controller;

import com.pateros.backend.model.User;
import com.pateros.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/home")
@CrossOrigin(origins = "*")
public class HomeController {
    
    private final UserService userService;

    public HomeController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        try {
            User user = userService.getUserById(id);
            if (user == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.notFound().build();
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "profilePhotoUrl", user.getProfilePhotoUrl() != null ? user.getProfilePhotoUrl() : ""
            ));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String email = request.get("email");
            String profilePhotoUrl = request.get("profilePhotoUrl");
            
            User user = userService.updateUser(id, username, email, profilePhotoUrl);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User updated successfully");
            response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "profilePhotoUrl", user.getProfilePhotoUrl() != null ? user.getProfilePhotoUrl() : ""
            ));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
