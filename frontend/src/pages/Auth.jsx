import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import { Office } from "../assets";
import { Login } from "../components";

const Auth = () => {
  const { user } = useSelector((state) => state.user) || {}; 
  const location = useLocation();
  const navigate = useNavigate();

  let from = location?.state?.from?.pathname || "/";


  if (user && user.token) {
    navigate(from, { replace: true }); 
    return null; 
  }

  return (
    <div className="w-full">
      {/* <img src={Office} alt="Office" className="object-contain " /> */}
      <Login/>
    </div>
  );
};

export default Auth;
