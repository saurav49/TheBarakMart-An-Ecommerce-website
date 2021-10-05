import React from "react";
import { FiHeart } from "../../icons/icon";
import { useDataContext } from "../../hook/index";
import styles from "./Wishlist.module.css";
import { useNavigate } from "react-router-dom";

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

        <FiHeart style={{ fontSize: "1.85rem", color: "#fff" }} />
      </button>
      <p className={styles.wishListTextStyle}>WISHLIST</p>
    </div>
  );
};

export { WishlistButton };
