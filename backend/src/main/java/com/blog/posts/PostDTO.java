package com.blog.posts;

import com.blog.users.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private PostStatus status;
    private UserDTO author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}



