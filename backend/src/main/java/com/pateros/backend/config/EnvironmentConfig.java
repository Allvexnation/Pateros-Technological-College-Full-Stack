package com.pateros.backend.config;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;

public class EnvironmentInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        String mongodbUri = System.getenv("MONGODB_URI");
        String cloudinaryCloudName = System.getenv("CLOUDINARY_CLOUD_NAME");
        String cloudinaryApiKey = System.getenv("CLOUDINARY_API_KEY");
        String cloudinaryApiSecret = System.getenv("CLOUDINARY_API_SECRET");
        String apisEnv = System.getenv("APIS_ENV");

        if (mongodbUri != null) {
            System.setProperty("spring.data.mongodb.uri", mongodbUri);
        }
        if (cloudinaryCloudName != null) {
            System.setProperty("cloudinary.cloud-name", cloudinaryCloudName);
        }
        if (cloudinaryApiKey != null) {
            System.setProperty("cloudinary.api-key", cloudinaryApiKey);
        }
        if (cloudinaryApiSecret != null) {
            System.setProperty("cloudinary.api-secret", cloudinaryApiSecret);
        }
        if (apisEnv != null) {
            System.setProperty("apis.env", apisEnv);
        }
    }
}
