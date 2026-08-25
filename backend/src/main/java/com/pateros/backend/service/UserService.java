package com.pateros.backend.service;

import com.pateros.backend.exception.ResourceNotFoundException;
import com.pateros.backend.model.User;
import com.pateros.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    public User signup(String username, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new ResourceNotFoundException("Email already exists");
        }
        if (userRepository.existsByUsername(username)) {
            throw new ResourceNotFoundException("Username already exists");
        }
        
        User user = new User(username, email, passwordEncoder.encode(password));
        return userRepository.save(user);
    }
    
    public User signup(String username, String email, String password, String profilePhotoUrl) {
        if (userRepository.existsByEmail(email)) {
            throw new ResourceNotFoundException("Email already exists");
        }
        if (userRepository.existsByUsername(username)) {
            throw new ResourceNotFoundException("Username already exists");
        }
        
        User user = new User(username, email, passwordEncoder.encode(password), profilePhotoUrl);
        return userRepository.save(user);
    }
    
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("User", "email", email);
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new ResourceNotFoundException("Invalid password");
        }
        return user;
    }
    
    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }
    
    public User updateUser(String id, String username, String email, String profilePhotoUrl) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        
        if (username != null && !username.isEmpty()) {
            user.setUsername(username);
        }
        if (email != null && !email.isEmpty()) {
            user.setEmail(email);
        }
        if (profilePhotoUrl != null && !profilePhotoUrl.isEmpty()) {
            user.setProfilePhotoUrl(profilePhotoUrl);
        }
        
        return userRepository.save(user);
    }
}
