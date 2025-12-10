package com.blog.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/posts")
@PreAuthorize("hasRole('ADMIN')")
public class AdminPostController {
    
    @Autowired
    private PostService postService;
    
    @GetMapping("/pending")
    public ResponseEntity<List<PostDTO>> getPendingPosts() {
        List<PostDTO> posts = postService.getPendingPosts();
        return ResponseEntity.ok(posts);
    }
    
    @PutMapping("/{postId}/status")
    public ResponseEntity<Map<String, Object>> updatePostStatus(
            @PathVariable Long postId,
            @RequestBody UpdatePostStatusRequest request) {
        
        PostDTO updatedPost = postService.updatePostStatus(postId, request.getStatus());
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Post status updated");
        response.put("postId", updatedPost.getId());
        response.put("status", updatedPost.getStatus().name());
        
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{postId}")
    public ResponseEntity<Map<String, String>> deletePost(@PathVariable Long postId) {
        postService.deletePostByAdmin(postId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Post deleted successfully");
        return ResponseEntity.ok(response);
    }
}

