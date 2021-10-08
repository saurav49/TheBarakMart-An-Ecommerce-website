import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  checkInputField,
  validateEmail,
  validatePassword,
  validateUsername,
  isMatch,
} from "../utils";

import { SIGNUP_API, LOGIN_API } from "../urls";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedToken = JSON.parse(localStorage.getItem("token")) || {
    token: null,
  };

  const [isLogin, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(savedToken);
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  const handleLogin = async (username, password, setUsername, setPassword) => {
    try {
      setShowLoader(true);
      if (checkInputField(username) === "EMPTY") {
        return setError("username cannot be empty");
      }
      if (checkInputField(password) === "EMPTY") {
        return setError("password cannot be empty");
      }

      const { data } = await axios.post(LOGIN_API, { username, password });

      if (data.success) {
        setShowLoader(false);
        localStorage.setItem("token", JSON.stringify(data.token));
        setToken(data.token);
        navigate("/products");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.log("handleLogin", error);
    } finally {
      setShowLoader(false);
    }
  };

  const handleSignUp = async (
    username,
    email,
    password,
    confirmPassword,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword
  ) => {
    try {
      setShowLoader(true);
      if (checkInputField(username) === "EMPTY") {
        return setError(`username cannot be Empty`);
      }

      if (checkInputField(email) === "EMPTY") {
        return setError(`email cannot be Empty`);
      }

      if (checkInputField(password) === "EMPTY") {
        return setError(`password cannot be Empty`);
      }

      if (!isMatch(password, confirmPassword)) {
        return setError("Password and ConfirmPassword Should Match");
      }

      if (!validateEmail(email)) {
        return setError("Enter a valid Email");
      }

      if (!validatePassword(password)) {
        return setError(
          "Password should contain atleast 6 characters of atleast lowercase, uppercase and numeric integer"
        );
      }

      if (!validateUsername(username)) {
        return setError("Enter a valid Username");
      }

      const { data } = await axios.post(SIGNUP_API, {
        username,
        email,
        password,
      });

      if (data.success) {
        setShowLoader(false);
        localStorage.setItem("token", JSON.stringify(data.token));
        setToken(data.token);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.log("handleSignUp", error);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        handleSignUp,
        handleLogin,
        handleLogOut,
        setLogin,
        error,
        setError,
        token,
        setToken,
        showLoader,
        setShowLoader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
