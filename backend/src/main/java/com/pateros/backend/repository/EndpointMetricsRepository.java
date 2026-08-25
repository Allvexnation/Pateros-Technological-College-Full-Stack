package com.pateros.backend.repository;

import com.pateros.backend.model.EndpointMetrics;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EndpointMetricsRepository extends MongoRepository<EndpointMetrics, String> {
    EndpointMetrics findByEndpointAndMethod(String endpoint, String method);
}
