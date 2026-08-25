package com.pateros.backend.service.admin;

import com.pateros.backend.exception.ResourceNotFoundException;
import com.pateros.backend.model.admin.Admin;
import com.pateros.backend.repository.admin.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    
    private final AdminRepository adminRepository;
    
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }
    
    public Admin createAdmin(String username, String email, String password, String department) {
        Admin admin = new Admin(username, email, password, department);
        return adminRepository.save(admin);
    }
    
    public Admin createAdmin(String username, String email, String password, String profilePhotoUrl, String department) {
        Admin admin = new Admin(username, email, password, profilePhotoUrl, department);
        return adminRepository.save(admin);
    }
    
    public Admin createAdmin(String username, String email, String password, String profilePhotoUrl, String department, String role) {
        Admin admin = new Admin(username, email, password, profilePhotoUrl, department, role);
        return adminRepository.save(admin);
    }
    
    public Optional<Admin> getAdminById(String id) {
        return adminRepository.findById(id);
    }
    
    public Optional<Admin> getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }
    
    public Optional<Admin> getAdminByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
    
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
    
    public Admin updateAdmin(String id, String username, String email, String profilePhotoUrl, String department) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin", "id", id));
        admin.setUsername(username);
        admin.setEmail(email);
        admin.setProfilePhotoUrl(profilePhotoUrl);
        admin.setDepartment(department);
        return adminRepository.save(admin);
    }
    
    public Admin updateAdmin(String id, String username, String email, String profilePhotoUrl, String department, String editedBy) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin", "id", id));
        admin.setUsername(username);
        admin.setEmail(email);
        admin.setProfilePhotoUrl(profilePhotoUrl);
        admin.setDepartment(department);
        admin.setEditedBy(editedBy);
        admin.setEditedAt(java.time.LocalDateTime.now().toString());
        return adminRepository.save(admin);
    }
    
    public Admin updateAdminPassword(String id, String password, String editedBy) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin", "id", id));
        admin.setPassword(password);
        admin.setEditedBy(editedBy);
        admin.setEditedAt(java.time.LocalDateTime.now().toString());
        return adminRepository.save(admin);
    }
    
    public Admin updateAdminWithPhotoAndRole(String id, String username, String email, String profilePhotoUrl, String department, String role, String editedBy) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin", "id", id));
        admin.setUsername(username);
        admin.setEmail(email);
        if (profilePhotoUrl != null && !profilePhotoUrl.isEmpty()) {
            admin.setProfilePhotoUrl(profilePhotoUrl);
        }
        admin.setDepartment(department);
        if (role != null && !role.isEmpty()) {
            admin.setRole(role);
        }
        admin.setEditedBy(editedBy);
        admin.setEditedAt(java.time.LocalDateTime.now().toString());
        return adminRepository.save(admin);
    }
    
    public boolean deleteAdmin(String id) {
        if (!adminRepository.existsById(id)) {
            throw new ResourceNotFoundException("Admin", "id", id);
        }
        adminRepository.deleteById(id);
        return true;
    }
    
    public boolean validateAdmin(String email, String password) {
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);
        return adminOptional.isPresent() && adminOptional.get().getPassword().equals(password);
    }
    
    public long getTotalAdmins() {
        return adminRepository.count();
    }
}
