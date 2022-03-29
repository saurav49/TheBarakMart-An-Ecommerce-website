import React from "react";
import { FaRegHeart, FaHeart } from "../../icons/icon";
import styles from "./ProductCard.module.css";
import { useDataContext, useAuthContext } from "../../hook/index";
import { WISHLIST_API, ADD_PRODUCT_TO_WISHLIST } from "../../urls";

const LikeButton = ({ name, productId, styleType, isInWishList }) => {
  const { addProductToWishlist, removeProductFromWishlist } = useDataContext();

  const { userId } = useAuthContext();

  // Dynamic style for verticle and horizontal cards
  const likeBtnStyle =
    styleType === "VERTICLE_CARD"
      ? styles.btnWishCard
      : styles.btnWishDetailCard;

  const handleLikeBtn = () => {
    isInWishList
      ? removeProductFromWishlist({
          url: `${WISHLIST_API}/${userId}`,
          productId: productId,
        })
      : addProductToWishlist({
          url: `${ADD_PRODUCT_TO_WISHLIST}/${userId}`,
          productId: productId,
        });
  };

  return (
    <React.Fragment>
      <div>
        <button className={likeBtnStyle} onClick={handleLikeBtn}>
          {isInWishList ? (
            <FaHeart className={styles.heartIcon} />
          ) : (
            <FaRegHeart className={styles.heartIcon} />
          )}
        </button>
      </div>
    </React.Fragment>
  );
};

export { LikeButton };
