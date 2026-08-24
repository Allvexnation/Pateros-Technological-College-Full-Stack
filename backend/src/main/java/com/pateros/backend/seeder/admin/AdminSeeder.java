package com.pateros.backend.seeder.admin;

import com.pateros.backend.model.admin.Admin;
import com.pateros.backend.repository.admin.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements CommandLineRunner {
    
    private final AdminRepository adminRepository;
    
    public AdminSeeder(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }
    
    @Override
    public void run(String... args) {
        if (adminRepository.count() == 0) {
            seedAdmins();
        }
    }
    
    private void seedAdmins() {
        Admin admin1 = new Admin();
        admin1.setUsername("admin");
        admin1.setEmail("admin@pateros.edu");
        admin1.setPassword("admin123");
        admin1.setDepartment("IT Department");
        admin1.setRole("admin");
        adminRepository.save(admin1);
        
        Admin admin2 = new Admin();
        admin2.setUsername("superadmin");
        admin2.setEmail("superadmin@pateros.edu");
        admin2.setPassword("superadmin123");
        admin2.setDepartment("Administration");
        admin2.setRole("superadmin");
        adminRepository.save(admin2);
        
        Admin admin3 = new Admin();
        admin3.setUsername("hradmin");
        admin3.setEmail("hradmin@pateros.edu");
        admin3.setPassword("hradmin123");
        admin3.setDepartment("Human Resources");
        admin3.setRole("admin");
        adminRepository.save(admin3);
        
        System.out.println("Admin seeders completed successfully!");
        System.out.println("Default admin credentials:");
        System.out.println("Email: admin@pateros.edu, Password: admin123 (Role: admin)");
        System.out.println("Email: superadmin@pateros.edu, Password: superadmin123 (Role: superadmin)");
        System.out.println("Email: hradmin@pateros.edu, Password: hradmin123 (Role: admin)");
    }
}
