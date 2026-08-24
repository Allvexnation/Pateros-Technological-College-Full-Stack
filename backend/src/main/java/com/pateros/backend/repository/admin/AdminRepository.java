package com.pateros.backend.repository.admin;

import com.pateros.backend.model.admin.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findByEmail(String email);
    Optional<Admin> findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
