package com.pateros.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class BackendApplication {

	public static void main(String[] args) {
		try {
			Dotenv dotenv = Dotenv.configure()
				.directory("./")
				.load();

			System.setProperty("MONGODB_URI", dotenv.get("MONGODB_URI"));
			System.setProperty("CLOUDINARY_CLOUD_NAME", dotenv.get("CLOUDINARY_CLOUD_NAME"));
			System.setProperty("CLOUDINARY_API_KEY", dotenv.get("CLOUDINARY_API_KEY"));
			System.setProperty("CLOUDINARY_API_SECRET", dotenv.get("CLOUDINARY_API_SECRET"));
			System.setProperty("APIS_ENV", dotenv.get("APIS_ENV"));
		} catch (Exception e) {
			String mongodbUri = System.getenv("MONGODB_URI");
			String cloudinaryCloudName = System.getenv("CLOUDINARY_CLOUD_NAME");
			String cloudinaryApiKey = System.getenv("CLOUDINARY_API_KEY");
			String cloudinaryApiSecret = System.getenv("CLOUDINARY_API_SECRET");
			String apisEnv = System.getenv("APIS_ENV");

			if (mongodbUri != null) System.setProperty("MONGODB_URI", mongodbUri);
			if (cloudinaryCloudName != null) System.setProperty("CLOUDINARY_CLOUD_NAME", cloudinaryCloudName);
			if (cloudinaryApiKey != null) System.setProperty("CLOUDINARY_API_KEY", cloudinaryApiKey);
			if (cloudinaryApiSecret != null) System.setProperty("CLOUDINARY_API_SECRET", cloudinaryApiSecret);
			if (apisEnv != null) System.setProperty("APIS_ENV", apisEnv);
		}

		SpringApplication.run(BackendApplication.class, args);
	}

}
