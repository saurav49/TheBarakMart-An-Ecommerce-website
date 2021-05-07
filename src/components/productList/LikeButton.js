import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import styles from "./ProductCard.module.css";
import { useDataContext } from "../../context/useDataContext";
import { Toast } from "../toast/Toast";

const LikeButton = ({ productId }) => {
  const {
    state,
    addProductToDb,
    removeProductFromDb,

    isLoading
  } = useDataContext();

  const productToBeAdded = state.productList.filter(
    (product) => product.productId === productId
  )[0];

  const handleLikeBtn = () => {
    console.log("handleLikeBtn", state.toast);

    productToBeAdded.isInWishList
      ? removeProductFromDb({
          url: `/api/wishLists`,
          listType: "wishList",
          dispatchType: "REMOVE_PRODUCT_FROM_WISHLIST",
          productId: productId,
          toastMsg: `${productToBeAdded.name} has been removed from wishlist`,
          toastType: "error"
        })
      : addProductToDb({
          url: "/api/wishLists",
          listType: "wishList",
          dispatchType: "ADD_PRODUCT_TO_WISHLIST",
          productId: productId,
          toastMsg: `${productToBeAdded.name} has been added to wishlist`,
          toastType: "success"
        });
  };

  return (
    <>
      <div>
        <button className={styles.btn_wish} onClick={handleLikeBtn}>
          {productToBeAdded.isInWishList ? (
            <FaHeart style={{ fontSize: "1.3rem" }} />
          ) : (
            <FaRegHeart style={{ fontSize: "1.3rem" }} />
          )}
        </button>
      </div>
      {isLoading && (
        <Toast message={state.toast.toastMsg} type={state.toast.toastType} />
      )}
    </>
  );
};

export { LikeButton };
