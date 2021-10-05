import React from "react";
import { RiLogoutBoxRFill } from "../../icons/icon";
import { useAuthContext } from "../../hook/index";
import styles from "./Navbar.module.css";

const LogOutButton = () => {
  const { handleLogOut } = useAuthContext();

  return (
    <div className={styles.logoutBtnWrapper}>
      <button onClick={handleLogOut}>
        <RiLogoutBoxRFill className={styles.logoutBtnIcon} />
      </button>
      <p className={styles.logoutBtnText}>LOGOUT</p>
    </div>
  );
};

export { LogOutButton };
