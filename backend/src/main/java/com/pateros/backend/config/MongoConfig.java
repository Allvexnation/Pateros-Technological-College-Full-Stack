package com.pateros.backend.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.pateros.backend.repository")
public class MongoConfig extends AbstractMongoClientConfiguration {

    private final Dotenv dotenv = Dotenv.load();

    @Override
    protected String getDatabaseName() {
        return "pateros";
    }

    @Override
    @Bean
    public MongoClient mongoClient() {
        String mongodbUri = dotenv.get("MONGODB_URI");
        return MongoClients.create(mongodbUri);
    }
}
