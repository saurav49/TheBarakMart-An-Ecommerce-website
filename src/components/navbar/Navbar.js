import React from "react";
import styles from "./Navbar.module.css";
import { FaMountain, FaUserCircle } from "../../icons/icon";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hook/index";

import { WishlistButton, CartButton, LogOutButton } from "../index";

function Navbar() {
  let navigate = useNavigate();
  const { token } = useAuthContext();

  const handleHomePageDisplay = () => {
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#333" }}>
      <div className={styles.navbar}>
        <div className={styles.brandContainer} onClick={handleHomePageDisplay}>
          <FaMountain className={styles.brandIcon} />
          <h1 className={styles.brandName}> Barak Shop </h1>
        </div>
        <div className={styles.cartWishContainer}>
          {token ? (
            <LogOutButton />
          ) : (
            <button
              className="btn btn-dark mx-1"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          <WishlistButton />
          <CartButton />
          <div onClick={() => navigate("/user")}>
            <button className={styles.userBtn}>
              <FaUserCircle className={styles.userIcon} />
              <p>Profile</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Navbar };
