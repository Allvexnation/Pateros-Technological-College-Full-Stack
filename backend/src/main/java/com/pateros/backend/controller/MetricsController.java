package com.pateros.backend.controller;

import com.pateros.backend.service.EndpointMetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/metrics")
@CrossOrigin(origins = "*")
public class MetricsController {
    
    @Autowired
    private EndpointMetricsService endpointMetricsService;
    
    @GetMapping("/endpoints")
    public ResponseEntity<Map<String, Object>> getEndpointMetrics() {
        Map<String, Object> metrics = endpointMetricsService.getAllMetrics();
        return ResponseEntity.ok(metrics);
    }
}
