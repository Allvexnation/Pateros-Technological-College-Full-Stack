package com.pateros.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class BackendApplication {

	public static void main(String[] args) {
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

		SpringApplication.run(BackendApplication.class, args);
	}

}
