package com.hotel.management.room_cleaning_service;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class RoomStatus {
    @Id
    private String roomNumber;
    private String status;
    private String assignedStaff;

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getAssignedStaff() { return assignedStaff; }
    public void setAssignedStaff(String assignedStaff) { this.assignedStaff = assignedStaff; }
}
