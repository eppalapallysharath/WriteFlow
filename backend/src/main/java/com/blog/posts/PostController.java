package com.blog.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@PreAuthorize("hasRole('AUTHOR') or hasRole('ADMIN')")
public class PostController {
    
    @Autowired
    private PostService postService;
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> createPost(@RequestBody CreatePostRequest request) {
        PostDTO post = postService.createPost(request);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Post created and pending approval");
        
        Map<String, Object> postData = new HashMap<>();
        postData.put("id", post.getId());
        postData.put("title", post.getTitle());
        postData.put("status", post.getStatus().name());
        response.put("post", postData);
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{postId}")
    public ResponseEntity<PostDTO> updatePost(
            @PathVariable Long postId,
            @RequestBody UpdatePostRequest request) {
        PostDTO updatedPost = postService.updatePost(postId, request);
        return ResponseEntity.ok(updatedPost);
    }
    
    @DeleteMapping("/{postId}")
    public ResponseEntity<Map<String, String>> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Post deleted successfully");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/my-posts")
    public ResponseEntity<List<PostDTO>> getMyPosts() {
        List<PostDTO> posts = postService.getMyPosts();
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/{postId}")
    public ResponseEntity<PostDTO> getPost(@PathVariable Long postId) {
        PostDTO post = postService.getPostById(postId);
        return ResponseEntity.ok(post);
    }
}



