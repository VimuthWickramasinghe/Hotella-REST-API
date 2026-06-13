package com.hotel.management.maintenance_service;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class MaintenanceRequest {
    @Id
    private String id; // Request ID එක (e.g., REQ001)
    private String roomNumber;
    private String issueDescription;
    private String status; // Pending, In Progress, Completed

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public String getIssueDescription() { return issueDescription; }
    public void setIssueDescription(String issueDescription) { this.issueDescription = issueDescription; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}