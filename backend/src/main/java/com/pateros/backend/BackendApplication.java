package com.pateros.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class BackendApplication {

	static {
		Dotenv dotenv = Dotenv.load();
		String mongodbUri = dotenv.get("MONGODB_URI");
		String cloudinaryCloudName = dotenv.get("CLOUDINARY_CLOUD_NAME");
		String cloudinaryApiKey = dotenv.get("CLOUDINARY_API_KEY");
		String cloudinaryApiSecret = dotenv.get("CLOUDINARY_API_SECRET");
		String apisEnv = dotenv.get("APIS_ENV");

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

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
