import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import swal from "sweetalert";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  const login = async (data) => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const result = await axios.post(`${backend}/auth/login`, data);
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(userDataFromToken.info)
      );
      setState({ ...state, error: null, user: userDataFromToken });
      swal("Login success!", "Welcome to Meow Meow!", "success");
      navigate("/dashboard");
    } catch (error) {
      setState({ ...state, error: error.response.data.message });
      swal("Oops", "Something went wrong!", "error");
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setState({ ...state, user: null });
    navigate("/");
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        isAuthenticated,
        currentUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);
//return value context authcontext

export { AuthProvider, useAuth };
