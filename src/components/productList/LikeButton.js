import React from "react";
import { FaRegHeart, FaHeart } from "../../icons/icon";
import styles from "./ProductCard.module.css";
import { useDataContext } from "../../hook/index";
import { Toast } from "../index";
import { WISHLIST_API } from "../../urls";

const LikeButton = ({ name, productId, styleType, isInWishList }) => {
  const { state, addProductToWishlist, removeProductFromWishlist, isLoading } =
    useDataContext();

  // const productToBeAdded = state.productList.filter(
  //   (product) => product._id === productId
  // )[0];

  // console.log({ productToBeAdded });

  // Dynamic style for verticle and horizontal cards
  const likeBtnStyle =
    styleType === "VERTICLE_CARD"
      ? styles.btnWishCard
      : styles.btnWishDetailCard;

  const handleLikeBtn = () => {
    isInWishList
      ? removeProductFromWishlist({
          url: `${WISHLIST_API}`,
          productId: productId,
          toastMsg: `${name} has been removed from wishlist`,
          toastType: "error",
        })
      : addProductToWishlist({
          url: `${WISHLIST_API}`,
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
