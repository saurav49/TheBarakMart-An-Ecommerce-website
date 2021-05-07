import React, { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { useUserContext } from "../context/useUserContext";

import { RiLoginCircleFill } from "react-icons/ri";
import loginImage from "./undraw_web_shopping_dd4l.svg";
import signUpImage from "./undraw_window_shopping_b96y.svg";

import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setSignUp] = useState(false);

  const { handleUserCredentials } = useAuthContext();
  const { state, dispatch } = useUserContext();

  const handleLogin = () => {
    handleUserCredentials(username, password, state.users);

    setUsername("");
    setPassword("");
  };

  const handleSignUp = () => {
    dispatch({
      type: "ADD_USERS_TO_LIST",
      payload: { username: username, password: password }
    });

    setUsername("");
    setPassword("");

    setSignUp((value) => !value);
  };

  return (
    <>
      {!isSignUp ? (
        <div className={styles.loginDiv}>
          <div
            style={{
              backgroundColor: "#333",
              color: "#fff",
              display: "flex",
              padding: "3em 0em",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <img
              src={loginImage}
              alt="form"
              style={{ width: "50%", alignSelf: "center", margin: "0.8em 0em" }}
            />

            <h1> BARAK MART </h1>
            <p> </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              className={`inpt-div flex flex-col`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "1em 0em"
              }}
            >
              <input
                className={styles.inpt}
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className={styles.inpt_label_secondary}>
                Enter Username
              </label>
            </div>

            <div
              className={`inpt-div flex flex-col`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "1em 0em"
              }}
            >
              <input
                className={styles.inpt}
                styles={{ margin: "1em 0em" }}
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className={styles.inpt_label_secondary}>
                Enter Password
              </label>
            </div>

            <button className={`btn btn-dark m-1`} onClick={handleLogin}>
              LOGIN
              <RiLoginCircleFill
                style={{
                  fontSize: "1.1rem",
                  transform: "translate(40%,25%)",
                  margin: "0em",
                  padding: "0em"
                }}
              />
            </button>
            <button
              style={{
                fontSize: "0.85rem",
                fontWeight: "600"
              }}
              onClick={() => setSignUp((value) => !value)}
            >
              New user? create an account{" "}
              <span style={{ color: "#fb3640" }}>SIGNUP</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.loginDiv}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              className={`inpt-div flex flex-col`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "1em 0em"
              }}
            >
              <input
                className={styles.inpt}
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className={styles.inpt_label_secondary}>
                Enter Username
              </label>
            </div>

            <div
              className={`inpt-div flex flex-col`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "1em 0em"
              }}
            >
              <input
                className={styles.inpt}
                styles={{ margin: "1em 0em" }}
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className={styles.inpt_label_secondary}>
                Enter Password
              </label>
            </div>

            <button className={`btn btn-dark m-1`} onClick={handleSignUp}>
              SIGNUP
              <RiLoginCircleFill
                style={{
                  fontSize: "1.1rem",
                  transform: "translate(40%,25%)",
                  margin: "0em",
                  padding: "0em"
                }}
              />
            </button>
            <button
              style={{
                fontSize: "0.85rem",
                fontWeight: "600"
              }}
              onClick={() => setSignUp((value) => !value)}
            >
              Existing user? <span style={{ color: "#fb3640" }}>LOGIN</span>
            </button>
          </div>
          <div
            style={{
              backgroundColor: "rgb(80, 80, 80)",
              color: "#fff",
              display: "flex",
              padding: "3em 0em",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <h1> SIGNUP TO BARAK MART </h1>
            <img
              src={signUpImage}
              alt="form"
              style={{ width: "50%", alignSelf: "center", margin: "0.8em 0em" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export { Login };
