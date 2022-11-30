import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  //console.log(allowedRoles);
  const obj = localStorage.getItem("user");
  const userObj = JSON.parse(obj);

  let roles = [];
  if (userObj != null) roles.push(userObj.role);

  /*const user = [];
  user.push(userObj);
  
  setAuth({ user, roles });*/
  //console.log(auth.roles);

  return allowedRoles?.includes(userObj?.role) ? (
    <Outlet />
  ) : userObj ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
