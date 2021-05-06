import React, { useContext, createContext, useState, useEffect } from "react";
import { FakeAuthApi } from "../api/fakeAuthApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    state: { users }
  } = useUserContext();

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("login"));

    loginStatus?.isUserLoggedIn ? setLogin(true) : setLogin(false);
  }, []);

  const handleUserCredentials = async (userName, password) => {
    try {
      const response = await FakeAuthApi(userName, password, users);

      if (response.success) {
        setLogin(true);
        const item = localStorage?.setItem(
          "login",
          JSON.stringify({ isUserLoggedIn: true })
        );
        navigate(state?.from ? state.from : "/products");
      }
    } catch (error) {
      alert("please enter correct username and password, check useAuthContext");
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, handleUserCredentials, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
