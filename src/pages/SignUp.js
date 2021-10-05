import React, { useState } from "react";
import signUpImage from "./undraw_window_shopping_b96y.svg";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hook/index";

import {
  RiLoginCircleFill,
  AiFillEye,
  AiFillEyeInvisible,
} from "../icons/icon";
import styles from "./Login.module.css";
import { IconContext } from "react-icons";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const SignUp = () => {
  const navigate = useNavigate();
  const { handleSignUp, error, showLoader } = useAuthContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={styles.loginDiv}>
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
            className={`${styles.inpt}`}
            required
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={styles.inpt_label_secondary}>Email</label>
        </div>

        <div className={`inpt-div flex flex-col  ${styles.inputWrapper}`}>
          <input
            className={`${styles.inpt}`}
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

        <div className={`inpt-div flex flex-col  ${styles.inputWrapper}`}>
          <input
            className={`${styles.inpt}`}
            required
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label className={styles.inpt_label_secondary}>
            Confirm Password
          </label>
          <IconContext.Provider value={{ size: "1.3em" }}>
            {showConfirmPassword ? (
              <AiFillEyeInvisible
                className={styles.passwordIcon}
                onClick={(e) =>
                  setShowConfirmPassword(
                    (showConfirmPassword) => !showConfirmPassword
                  )
                }
              />
            ) : (
              <AiFillEye
                className={styles.passwordIcon}
                onClick={(e) =>
                  setShowConfirmPassword(
                    (showConfirmPassword) => !showConfirmPassword
                  )
                }
              />
            )}
          </IconContext.Provider>
        </div>

        <button
          className={`btn btn-dark m-1`}
          onClick={() =>
            handleSignUp(
              username,
              email,
              password,
              confirmPassword,
              setUsername,
              setEmail,
              setPassword,
              setConfirmPassword
            )
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
            <span>SIGNUP</span>
          )}
          {!showLoader && <RiLoginCircleFill className={styles.signupIcon} />}
        </button>
        {error.length > 0 && <span>{error}</span>}
        <button
          className={styles.redirectBtn}
          onClick={() => navigate("/login")}
        >
          Already Registered? LOGIN
        </button>
      </div>
      <div className={styles.signUpMessageWrapper}>
        <h1> SIGNUP TO BARAK MART </h1>
        <img src={signUpImage} alt="form" className={styles.signUpMessageImg} />
      </div>
    </div>
  );
};

export { SignUp };
