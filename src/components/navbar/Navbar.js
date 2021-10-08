import React from "react";
import styles from "./Navbar.module.css";
import { FaMountain } from "../../icons/icon";
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
          {token && <LogOutButton />}
          <WishlistButton />
          <CartButton />
        </div>
      </div>
    </div>
  );
}

export { Navbar };
