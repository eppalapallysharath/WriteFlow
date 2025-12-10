package com.blog.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @PutMapping("/{id}/role")
    public ResponseEntity<Map<String, Object>> updateUserRole(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        
        Role newRole = Role.valueOf(request.get("role"));
        UserDTO updatedUser = userService.updateUserRole(id, newRole);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Role updated successfully");
        response.put("userId", updatedUser.getId());
        response.put("newRole", updatedUser.getRole().name());
        
        return ResponseEntity.ok(response);
    }
}



