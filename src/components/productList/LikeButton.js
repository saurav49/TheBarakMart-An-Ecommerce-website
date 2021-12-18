import React from "react";
import { FaRegHeart, FaHeart } from "../../icons/icon";
import styles from "./ProductCard.module.css";
import { useDataContext, useAuthContext } from "../../hook/index";
import { Toast } from "../index";
import { WISHLIST_API, ADD_PRODUCT_TO_WISHLIST } from "../../urls";

const LikeButton = ({ name, productId, styleType, isInWishList }) => {
  const { state, addProductToWishlist, removeProductFromWishlist, isLoading } =
    useDataContext();

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
          toastMsg: `${name} has been removed from wishlist`,
          toastType: "error",
        })
      : addProductToWishlist({
          url: `${ADD_PRODUCT_TO_WISHLIST}/${userId}`,
          productId: productId,
          toastMsg: `${name} has been added to wishlist`,
          toastType: "success",
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
      {isLoading && (
        <Toast message={state.toast.toastMsg} type={state.toast.toastType} />
      )}
    </React.Fragment>
  );
};

export { LikeButton };
