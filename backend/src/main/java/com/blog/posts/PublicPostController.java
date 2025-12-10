package com.blog.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/posts")
public class PublicPostController {
    
    @Autowired
    private PostService postService;
    
    @GetMapping
    public ResponseEntity<List<PostDTO>> getApprovedPosts() {
        List<PostDTO> posts = postService.getApprovedPosts();
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/{postId}")
    public ResponseEntity<PostDTO> getPost(@PathVariable Long postId) {
        PostDTO post = postService.getPostById(postId);
        
        // Only return if approved
        if (post.getStatus() != PostStatus.APPROVED) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(post);
    }
}



