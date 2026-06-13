package com.hotel.management.room_cleaning_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/housekeeping/rooms")
public class RoomCleaningController {

    @Autowired
    private RoomRepository repository;

    @GetMapping
    public List<RoomStatus> getAllRooms() {
        return repository.findAll();
    }

    @PostMapping
    public RoomStatus addRoom(@RequestBody RoomStatus room) {
        return repository.save(room);
    }

    @PutMapping("/{id}")
    public RoomStatus updateStatus(@PathVariable String id, @RequestBody RoomStatus updatedRoom) {
        return repository.findById(id).map(room -> {
            room.setStatus(updatedRoom.getStatus());
            room.setAssignedStaff(updatedRoom.getAssignedStaff());
            return repository.save(room);
        }).orElseGet(() -> {
            updatedRoom.setRoomNumber(id);
            return repository.save(updatedRoom);
        });
    }
}