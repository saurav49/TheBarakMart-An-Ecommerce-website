import React from "react";
import { FiHeart } from "../../icons/icon";
import { useDataContext } from "../../hook/index";
import styles from "./Wishlist.module.css";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons/lib";

const WishlistButton = () => {
  const {
    state: { wishList },
  } = useDataContext();

  let navigate = useNavigate();

  const handleWishlistDisplay = () => {
    navigate("/wishlist");
  };

  return (
    <div style={{ margin: "0 1.5em 0 0" }}>
      <button onClick={handleWishlistDisplay} className={styles.wishBadgeBtn}>
        {wishList.length === 0 ? null : (
          <div className={styles.badgeNumber}>
            <span>{wishList.length}</span>
          </div>
        )}
        <IconContext.Provider value={{ fontSize: "1.85rem", color: "#333" }}>
          <FiHeart />
        </IconContext.Provider>
      </button>
      <p
        style={{
          fontSize: "0.75rem",
          textAlign: "center",
          fontWeight: "700",
          margin: "0em",
          padding: "0em",
        }}
      >
        WISHLIST
      </p>
    </div>
  );
};

export { WishlistButton };
