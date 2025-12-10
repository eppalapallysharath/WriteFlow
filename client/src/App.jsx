import React, {  useEffect, useState } from "react";
import { ProtectedRouting } from "./Routings/ProtectedRouting";
import { PublicRouting } from "./Routings/PublicRouting";
import {ToastContainer} from "react-toastify"
import { authContext } from "./context/auth";


export const App = () => {
  const initialValue = JSON.parse(localStorage.getItem("auth")) || {isLogin:false, user:{}, token:null}
  const [auth, setAuth] = useState(initialValue)
  
  useEffect(()=>{
    localStorage.setItem("auth", JSON.stringify(auth))
  },[auth])
 


  return (
    <authContext.Provider value={{ auth, setAuth }}>
    {auth.isLogin ? <ProtectedRouting authUser={auth}/> : <PublicRouting/>}
    <ToastContainer/>
    </authContext.Provider>
  );
};
