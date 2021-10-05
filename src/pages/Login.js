import React, { useState } from "react";
import { useAuthContext } from "../hook/index";

import {
  RiLoginCircleFill,
  AiFillEye,
  AiFillEyeInvisible,
} from "../icons/icon";
import loginImage from "./undraw_web_shopping_dd4l.svg";

import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { IconContext } from "react-icons";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin, showLoader } = useAuthContext();

  const navigate = useNavigate();

  return (
    <div className={styles.loginDiv}>
      <div className={styles.signUpMessageWrapper}>
        <img src={loginImage} alt="form" className={styles.signUpMessageImg} />

        <h1> BARAK MART </h1>
        <p> </p>
      </div>
      <div className={styles.loginWrapper}>
        <div className={`inpt-div flex flex-col ${styles.inputWrapper}`}>
          <input
            className={styles.inpt}
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className={styles.inpt_label_secondary}>Username</label>
        </div>

        <div className={`inpt-div flex flex-col ${styles.inputWrapper}`}>
          <input
            className={styles.inpt}
            styles={{ margin: "1em 0em" }}
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className={styles.inpt_label_secondary}>Password</label>
          <IconContext.Provider value={{ size: "1.3em" }}>
            {showPassword ? (
              <AiFillEyeInvisible
                className={styles.passwordIcon}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              />
            ) : (
              <AiFillEye
                className={styles.passwordIcon}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              />
            )}
          </IconContext.Provider>
        </div>

        <button
          className={`btn btn-dark m-1`}
          onClick={() =>
            handleLogin(username, password, setUsername, setPassword)
          }
        >
          {showLoader ? (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={20}
              width={70}
              timeout={3000}
            />
          ) : (
            <span>LOGIN</span>
          )}
          {!showLoader && <RiLoginCircleFill className={styles.signupIcon} />}
        </button>
        <button
          className={styles.redirectBtn}
          onClick={() => navigate("/signup")}
        >
          New User? SIGNUP
        </button>
      </div>
    </div>
  );
};

export { Login };
