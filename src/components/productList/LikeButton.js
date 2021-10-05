import React from "react";
import { FaRegHeart, FaHeart } from "../../icons/icon";
import styles from "./ProductCard.module.css";
import { useDataContext } from "../../hook/index";
import { Toast } from "../index";

const LikeButton = ({ productId }) => {
  const {
    state,
    addProductToDb,
    removeProductFromDb,

    isLoading,
  } = useDataContext();

  const productToBeAdded = state.productList.filter(
    (product) => product._id === productId
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
          toastType: "error",
        })
      : addProductToDb({
          url: "/api/wishLists",
          listType: "wishList",
          dispatchType: "ADD_PRODUCT_TO_WISHLIST",
          productId: productId,
          toastMsg: `${productToBeAdded.name} has been added to wishlist`,
          toastType: "success",
        });
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export { LikeButton };
