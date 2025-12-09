import React from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { PageNotFound } from "../pages/PageNotFound";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { NavBar } from "../components/NavBar";

export const PublicRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route path="" element={<Homepage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
