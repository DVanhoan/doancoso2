import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
      <Login/>
    </div>
  );
};

export default Auth;
