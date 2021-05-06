import React from "react";
import { FiHeart } from "react-icons/fi";
import { useDataContext } from "../../context/useDataContext";
import styles from "./Wishlist.module.css";
import { useNavigate } from "react-router-dom";

const WishlistButton = () => {
  const {
    state: { wishList }
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
        <FiHeart style={{ fontSize: "1.85rem", color: "#fff" }} />
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
        WISHLIST
      </p>
    </div>
  );
};

export { WishlistButton };
