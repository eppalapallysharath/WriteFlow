import { Route, Routes } from "react-router-dom";
import { AuthorNavbar } from "../author/AuthorNavbar";
import { AdminNavbar } from "../admin/AdminNavbar";
import { PageNotFound } from "../pages/PageNotFound";
import { HomePage } from "../author/HomePage";
import { WriteBlog } from "../author/WriteBlog";
import { EditBlog } from "../author/EditBlog";
import { BlogByIDPage } from "../author/BlogByIDPage";
import { AdminHomePage } from "../admin/AdminHomePage";
import { UsersPage } from "../admin/UsersPage";
import { PendingBlogsList } from "../admin/PendingBlogsList";
import { MyBlogs } from "../author/MyBlogs";
import { MyBlog } from "../author/MyBlog";

export const ProtectedRouting = ({ authUser }) => {
  if (authUser.user.role === "AUTHOR") {
    return (
      <Routes>
        <Route path="/" element={<AuthorNavbar />}>
          <Route path="" element={<HomePage />} />
          <Route path="writeblog" element={<WriteBlog />} />
          <Route path="myblogs" element={<MyBlogs/>} />
          <Route path="myblog/:id" element={<MyBlog/>} />
          <Route path="editblog/:id" element={<EditBlog />} />
          <Route path="blog/:id" element={<BlogByIDPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  } else if (authUser.user.role === "ADMIN") {
    return (
      <Routes>
        <Route path="/" element={<AdminNavbar />}>
          <Route path="" element={<AdminHomePage />} />
          <Route path="admin/users" element={<UsersPage />} />
          <Route path="admin/pendingBlogs" element={<PendingBlogsList />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }
};
