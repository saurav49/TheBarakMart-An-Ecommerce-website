import React from "react";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useAuthContext } from "../../context/useAuthContext";

const LogOutButton = () => {
  const { setLogin } = useAuthContext();

  const handleLogOut = () => {
    setLogin(false);
    localStorage.removeItem("login");
  };

  return (
    <div style={{ margin: "0 1.5em 0 0", cursor: "pointer" }}>
      <button onClick={handleLogOut}>
        <RiLogoutBoxRFill style={{ fontSize: "1.85rem", color: "#fff" }} />
      </button>
      <p
        style={{
          fontSize: "0.75rem",
          textAlign: "center",
          fontWeight: "700",
          margin: "0em",
          padding: "0em"
        }}
      >
        LOGOUT
      </p>
    </div>
  );
};

export { LogOutButton };
