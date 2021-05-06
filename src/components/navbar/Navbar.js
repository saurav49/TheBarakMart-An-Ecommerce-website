import React from "react";
import styles from "./Navbar.module.css";
import { FaMountain } from "react-icons/fa";
import { WishlistButton } from "../wishlist/WishlistButton";
import { CartButton } from "../cart/CartButton";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { LogOutButton } from "./LogOutButton";

function Navbar() {
  let navigate = useNavigate();
  const { isLogin } = useAuthContext();

  const handleHomePageDisplay = () => {
    navigate("/products");
  };

  return (
    <div style={{ backgroundColor: "#333" }}>
      <div className={styles.navbar}>
        <div className={styles.brandContainer} onClick={handleHomePageDisplay}>
          <FaMountain className={styles.brandIcon} />
          <h1 className={styles.brandName}> Barak Shop </h1>
        </div>
        <div className={styles.cartWishContainer}>
          {isLogin && <LogOutButton />}
          <WishlistButton />
          <CartButton />
        </div>
      </div>
    </div>
  );
}

export { Navbar };
