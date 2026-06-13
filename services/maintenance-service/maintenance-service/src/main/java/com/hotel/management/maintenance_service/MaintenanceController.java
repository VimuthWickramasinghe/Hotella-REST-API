package com.hotel.management.maintenance_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/maintenance/requests")
public class MaintenanceController {

    @Autowired
    private MaintenanceRepository repository;

    // ඔක්කොම නඩත්තු රික්වෙස්ට් ටික ගන්න
    @GetMapping
    public List<MaintenanceRequest> getAllRequests() {
        return repository.findAll();
    }

    // අලුත් නඩත්තු රික්වෙස්ට් එකක් ඇතුළත් කරන්න
    @PostMapping
    public MaintenanceRequest createRequest(@RequestBody MaintenanceRequest request) {
        return repository.save(request);
    }

    // රික්වෙස්ට් එකක Status එක අප්ඩේට් කරන්න (e.g., Completed කරන්න)
    @PutMapping("/{id}")
    public MaintenanceRequest updateStatus(@PathVariable String id, @RequestBody MaintenanceRequest updatedRequest) {
        return repository.findById(id).map(request -> {
            request.setStatus(updatedRequest.getStatus());
            return repository.save(request);
        }).orElseGet(() -> {
            updatedRequest.setId(id);
            return repository.save(updatedRequest);
        });
    }
}