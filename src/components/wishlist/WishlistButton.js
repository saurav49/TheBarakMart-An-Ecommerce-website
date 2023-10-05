import React from "react";
import { FiHeart } from "../../icons/icon";
import { useDataContext, useAuthContext } from "../../hook/index";
import styles from "./Wishlist.module.css";
import { useNavigate } from "react-router-dom";

const WishlistButton = () => {
  const {
    state: { wishList },
  } = useDataContext();
  const { token } = useAuthContext();
  let navigate = useNavigate();

  const handleWishlistDisplay = () => {
    navigate("/wishlist");
  };

  return (
    <div style={{ margin: "0 1.5em 0 0" }}>
      <button onClick={handleWishlistDisplay} className={styles.wishBadgeBtn}>
        {wishList.hasOwnProperty("userId") &&
          wishList.wishListItems.length > 0 && (
            <>
              {token ? (
                <div className={styles.badgeNumber}>
                  <span>{wishList.wishListItems.length}</span>
                </div>
              ) : null}
            </>
          )}
        <FiHeart style={{ fontSize: "1.85rem", color: "#fff" }} />
      </button>
      <p className={styles.wishListTextStyle}>WISHLIST</p>
    </div>
  );
};

export { WishlistButton };
