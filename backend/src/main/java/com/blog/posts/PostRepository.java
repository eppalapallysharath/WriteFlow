package com.blog.posts;

import com.blog.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthor(User author);
    List<Post> findByStatus(PostStatus status);
    List<Post> findByStatusOrderByCreatedAtDesc(PostStatus status);
    Optional<Post> findByIdAndAuthor(Long id, User author);
}



