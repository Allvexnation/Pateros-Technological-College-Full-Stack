package com.pateros.backend.config;

import com.pateros.backend.service.EndpointMetricsService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Order(1)
public class EndpointMetricsFilter implements Filter {
    
    @Autowired
    private EndpointMetricsService endpointMetricsService;
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String method = httpRequest.getMethod();
        String uri = httpRequest.getRequestURI();
        
        if (!uri.startsWith("/api/metrics") && 
            !uri.startsWith("/static") && 
            !uri.startsWith("/public") &&
            !uri.equals("/")) {
            
            new Thread(() -> {
                try {
                    endpointMetricsService.trackEndpointCall(uri, method);
                } catch (Exception e) {
                    System.err.println("Error tracking endpoint metrics: " + e.getMessage());
                }
            }).start();
        }
        
        chain.doFilter(request, response);
    }
}
