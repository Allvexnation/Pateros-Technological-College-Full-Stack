package com.pateros.backend.service;

import com.pateros.backend.model.EndpointMetrics;
import com.pateros.backend.repository.EndpointMetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EndpointMetricsService {
    
    @Autowired
    private EndpointMetricsRepository endpointMetricsRepository;
    
    public void trackEndpointCall(String endpoint, String method) {
        String normalizedEndpoint = normalizeEndpoint(endpoint);
        
        EndpointMetrics metrics = endpointMetricsRepository.findByEndpointAndMethod(normalizedEndpoint, method);
        
        if (metrics == null) {
            metrics = new EndpointMetrics(normalizedEndpoint, method);
        }
        
        metrics.incrementCallCount();
        endpointMetricsRepository.save(metrics);
    }
    
    private String normalizeEndpoint(String endpoint) {
        String normalized = endpoint.replaceAll("/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}", "/{id}");
        
        normalized = normalized.replaceAll("/[a-f0-9]{24}(?=/|$)", "/{id}");
        
        normalized = normalized.replaceAll("/\\d+(?=/|$)", "/{id}");
        
        return normalized;
    }
    
    public Map<String, Object> getAllMetrics() {
        List<EndpointMetrics> allMetrics = endpointMetricsRepository.findAll();
        Map<String, Object> result = new HashMap<>();
        long totalCalls = 0;
        
        for (EndpointMetrics metric : allMetrics) {
            String key = metric.getMethod() + " " + metric.getEndpoint();
            result.put(key, metric.getCallCount());
            totalCalls += metric.getCallCount();
        }
        
        result.put("total", totalCalls);
        return result;
    }
    
    public Map<String, Long> getMetricsByEndpoint(String endpoint, String method) {
        EndpointMetrics metrics = endpointMetricsRepository.findByEndpointAndMethod(endpoint, method);
        Map<String, Long> result = new HashMap<>();
        
        if (metrics != null) {
            result.put("callCount", metrics.getCallCount());
            result.put("lastCalled", metrics.getLastCalledTimestamp());
        } else {
            result.put("callCount", 0L);
            result.put("lastCalled", 0L);
        }
        
        return result;
    }
}
