package com.pateros.backend.dto.response;

public class UserResponse {
    private String id;
    private String username;
    private String email;
    private String profilePhotoUrl;

    public UserResponse() {
    }

    public UserResponse(String id, String username, String email, String profilePhotoUrl) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.profilePhotoUrl = profilePhotoUrl;
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

    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }

    public void setProfilePhotoUrl(String profilePhotoUrl) {
        this.profilePhotoUrl = profilePhotoUrl;
    }
}
