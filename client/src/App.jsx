import React, { useState } from "react";
import { ProtectedRouting } from "./Routings/ProtectedRouting";
import { PublicRouting } from "./Routings/PublicRouting";

export const App = () => {
  const [auth, setAuth] = useState({isLogin:true, user:{role:"ADMIN"}, token:null})
  return (
    <>
    {auth.isLogin ? <ProtectedRouting authUser={auth}/> : <PublicRouting/>}
    </>
  );
};
