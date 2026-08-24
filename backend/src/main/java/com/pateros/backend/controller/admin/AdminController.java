package com.pateros.backend.controller.admin;

import com.pateros.backend.model.admin.Admin;
import com.pateros.backend.service.CloudinaryService;
import com.pateros.backend.service.admin.AdminService;
import com.pateros.backend.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    private final AdminService adminService;
    private final CloudinaryService cloudinaryService;
    private final JwtUtil jwtUtil;
    
    public AdminController(AdminService adminService, CloudinaryService cloudinaryService, JwtUtil jwtUtil) {
        this.adminService = adminService;
        this.cloudinaryService = cloudinaryService;
        this.jwtUtil = jwtUtil;
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            
            if (adminService.validateAdmin(email, password)) {
                Admin admin = adminService.getAdminByEmail(email).orElse(null);
                String token = jwtUtil.generateToken(email, admin.getId());
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Login successful");
                response.put("token", token);
                response.put("admin", Map.of(
                    "id", admin.getId(),
                    "username", admin.getUsername(),
                    "email", admin.getEmail(),
                    "profilePhotoUrl", admin.getProfilePhotoUrl() != null ? admin.getProfilePhotoUrl() : "",
                    "department", admin.getDepartment(),
                    "role", admin.getRole() != null ? admin.getRole() : "admin"
                ));
                
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Invalid email or password");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Logout successful");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Token is valid");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardData() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalAdmins", adminService.getTotalAdmins());
            stats.put("totalDepartments", 5);
            stats.put("activeSessions", 1);
            
            List<Map<String, String>> activities = List.of(
                Map.of("description", "Admin login", "timestamp", "Just now"),
                Map.of("description", "System check completed", "timestamp", "5 minutes ago"),
                Map.of("description", "New admin created", "timestamp", "1 hour ago")
            );
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("stats", stats);
            response.put("activities", activities);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/admins")
    public ResponseEntity<?> getAllAdmins() {
        try {
            List<Admin> admins = adminService.getAllAdmins();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("admins", admins);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
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
    
    @PostMapping("/verify-password")
    public ResponseEntity<?> verifyPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            
            if (adminService.validateAdmin(email, password)) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Password verified");
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Invalid password");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/admins")
    public ResponseEntity<?> createAdmin(@RequestBody Map<String, String> request, @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);
            
            if (!jwtUtil.validateToken(token, email)) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Invalid or expired token");
                return ResponseEntity.badRequest().body(response);
            }
            
            String username = request.get("username");
            String adminEmail = request.get("email");
            String password = request.get("password");
            String department = request.get("department");
            String profilePhotoUrl = request.get("profilePhotoUrl");
            String role = request.get("role") != null ? request.get("role") : "admin";
            
            Admin admin;
            if (profilePhotoUrl != null && !profilePhotoUrl.isEmpty()) {
                admin = adminService.createAdmin(username, adminEmail, password, profilePhotoUrl, department, role);
            } else {
                admin = adminService.createAdmin(username, adminEmail, password, department);
                admin.setRole(role);
                admin = adminService.updateAdmin(admin.getId(), username, adminEmail, profilePhotoUrl, department);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Admin created successfully");
            response.put("admin", admin);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PutMapping("/admins/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable String id, @RequestBody Map<String, String> request, @RequestHeader("Authorization") String authHeader) {
        try {
            String superadminEmail = request.get("superadminEmail");
            String superadminPassword = request.get("superadminPassword");
            String superadminUsername = request.get("superadminUsername");
            String username = request.get("username");
            String email = request.get("email");
            String profilePhotoUrl = request.get("profilePhotoUrl");
            String department = request.get("department");
            String newPassword = request.get("newPassword");
            String role = request.get("role");
            
            if (superadminEmail != null && superadminPassword != null) {
                if (!adminService.validateAdmin(superadminEmail, superadminPassword)) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", false);
                    response.put("message", "Invalid superadmin password");
                    return ResponseEntity.badRequest().body(response);
                }
            }
            
            Admin admin;
            String editedBy = superadminUsername != null ? superadminUsername : "system";
            
            if (newPassword != null && !newPassword.isEmpty()) {
                admin = adminService.updateAdminPassword(id, newPassword, editedBy);
                admin = adminService.updateAdminWithPhotoAndRole(id, username, email, profilePhotoUrl, department, role, editedBy);
            } else {
                admin = adminService.updateAdminWithPhotoAndRole(id, username, email, profilePhotoUrl, department, role, editedBy);
            }
            
            if (admin != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Admin updated successfully");
                response.put("admin", admin);
                
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Admin not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/admins/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable String id, @RequestBody Map<String, String> request) {
        try {
            String superadminEmail = request.get("superadminEmail");
            String superadminPassword = request.get("superadminPassword");
            
            if (superadminEmail != null && superadminPassword != null) {
                if (!adminService.validateAdmin(superadminEmail, superadminPassword)) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", false);
                    response.put("message", "Invalid superadmin password");
                    return ResponseEntity.badRequest().body(response);
                }
            }
            
            boolean deleted = adminService.deleteAdmin(id);
            
            Map<String, Object> response = new HashMap<>();
            if (deleted) {
                response.put("success", true);
                response.put("message", "Admin deleted successfully");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Admin not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
