import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// export const setToken = (token) => {
//   // set token in cookie
//   document.cookie = `Token=${token}; path=/;`;
// };

export const fetchToken = () => {
  // fetch the token from cookies
  const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('access-token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

const RequireToken = ({ children }) => {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/Login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireToken;
