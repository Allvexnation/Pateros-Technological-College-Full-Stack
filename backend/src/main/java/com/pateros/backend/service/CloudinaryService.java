package com.pateros.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {
    
    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }
    
    @SuppressWarnings("unchecked")
    public String uploadFile(MultipartFile file) throws IOException {
        Map<String, Object> uploadParams = ObjectUtils.asMap(
            "folder", "profile_photos",
            "resource_type", "auto"
        );
        
        Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadParams);
        return (String) uploadResult.get("url");
    }
    
    public void deleteFile(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}
