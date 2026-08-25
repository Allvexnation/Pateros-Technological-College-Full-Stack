package com.pateros.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "endpoint_metrics")
public class EndpointMetrics {
    
    @Id
    private String id;
    private String endpoint;
    private String method;
    private long callCount;
    private long lastCalledTimestamp;
    
    public EndpointMetrics() {}
    
    public EndpointMetrics(String endpoint, String method) {
        this.endpoint = endpoint;
        this.method = method;
        this.callCount = 0;
        this.lastCalledTimestamp = System.currentTimeMillis();
    }
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getEndpoint() {
        return endpoint;
    }
    
    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }
    
    public String getMethod() {
        return method;
    }
    
    public void setMethod(String method) {
        this.method = method;
    }
    
    public long getCallCount() {
        return callCount;
    }
    
    public void setCallCount(long callCount) {
        this.callCount = callCount;
    }
    
    public long getLastCalledTimestamp() {
        return lastCalledTimestamp;
    }
    
    public void setLastCalledTimestamp(long lastCalledTimestamp) {
        this.lastCalledTimestamp = lastCalledTimestamp;
    }
    
    public void incrementCallCount() {
        this.callCount++;
        this.lastCalledTimestamp = System.currentTimeMillis();
    }
}
