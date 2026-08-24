package com.pateros.backend.model.admin;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admins")
public class Admin {
    
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private String profilePhotoUrl;
    private String department;
    private String role;
    private String editedBy;
    private String editedAt;
    
    public Admin() {}
    
    public Admin(String username, String email, String password, String department) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.department = department;
        this.role = "admin";
    }
    
    public Admin(String username, String email, String password, String profilePhotoUrl, String department) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.profilePhotoUrl = profilePhotoUrl;
        this.department = department;
        this.role = "admin";
    }
    
    public Admin(String username, String email, String password, String profilePhotoUrl, String department, String role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.profilePhotoUrl = profilePhotoUrl;
        this.department = department;
        this.role = role;
    }
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }
    
    public void setProfilePhotoUrl(String profilePhotoUrl) {
        this.profilePhotoUrl = profilePhotoUrl;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public String getEditedBy() {
        return editedBy;
    }
    
    public void setEditedBy(String editedBy) {
        this.editedBy = editedBy;
    }
    
    public String getEditedAt() {
        return editedAt;
    }
    
    public void setEditedAt(String editedAt) {
        this.editedAt = editedAt;
    }
}
