package com.blog.posts;

import com.blog.users.User;
import com.blog.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public PostDTO createPost(CreatePostRequest request) {
        User author = getCurrentUser();
        
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setAuthor(author);
        post.setStatus(PostStatus.PENDING);
        
        Post savedPost = postRepository.save(post);
        return convertToDTO(savedPost);
    }
    
    public PostDTO updatePost(Long postId, UpdatePostRequest request) {
        User author = getCurrentUser();
        Post post = postRepository.findByIdAndAuthor(postId, author)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId + " or you don't have permission to edit it"));
        
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        
        Post updatedPost = postRepository.save(post);
        return convertToDTO(updatedPost);
    }
    
    public void deletePost(Long postId) {
        User author = getCurrentUser();
        Post post = postRepository.findByIdAndAuthor(postId, author)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId + " or you don't have permission to delete it"));
        
        postRepository.delete(post);
    }
    
    public List<PostDTO> getMyPosts() {
        User author = getCurrentUser();
        List<Post> posts = postRepository.findByAuthor(author);
        return posts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public PostDTO getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));
        return convertToDTO(post);
    }
    
    public List<PostDTO> getPendingPosts() {
        List<Post> posts = postRepository.findByStatus(PostStatus.PENDING);
        return posts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public PostDTO updatePostStatus(Long postId, PostStatus status) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));
        
        post.setStatus(status);
        Post updatedPost = postRepository.save(post);
        return convertToDTO(updatedPost);
    }
    
    public void deletePostByAdmin(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));
        postRepository.delete(post);
    }
    
    public List<PostDTO> getApprovedPosts() {
        List<Post> posts = postRepository.findByStatusOrderByCreatedAtDesc(PostStatus.APPROVED);
        return posts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private PostDTO convertToDTO(Post post) {
        PostDTO dto = new PostDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setStatus(post.getStatus());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setUpdatedAt(post.getUpdatedAt());
        
        // Convert author to DTO
        com.blog.users.UserDTO authorDTO = new com.blog.users.UserDTO();
        authorDTO.setId(post.getAuthor().getId());
        authorDTO.setName(post.getAuthor().getName());
        authorDTO.setEmail(post.getAuthor().getEmail());
        authorDTO.setRole(post.getAuthor().getRole());
        dto.setAuthor(authorDTO);
        
        return dto;
    }
}

