import React from "react";
import { FaArrowRight, FaShoppingBag } from "../../icons/icon";
import styles from "./ProductCard.module.css";
import { useDataContext } from "../../hook/index";
import { Toast } from "../toast/Toast";
import { useNavigate } from "react-router-dom";
import { CART_API, WISHLIST_API } from "../../urls";

const AddToCartButton = ({ name, productId, inStock, isInCartList, type }) => {
  const {
    state,
    addProductToCart,
    updateCartQuantity,
    isLoading,
    removeProductFromWishlist,
  } = useDataContext();

  // To check whether item is in cartList
  const checkIsInCartList = (cartList, productId) => {
    return cartList.find((product) => product._id === productId) !== undefined;
  };

  const navigate = useNavigate();

  if (type === "wishList" && checkIsInCartList(state.cartList, productId)) {
    console.log({ type }, checkIsInCartList(state.cartList, productId));

    removeProductFromWishlist({
      url: WISHLIST_API,
      productId: productId,
      toastMsg: `${name} product added to cart`,
      toastType: "success",
    });
  }

  const handleAddToCart = () => {
    isInCartList
      ? navigate("/cart")
      : checkIsInCartList(state.cartList, productId)
      ? updateCartQuantity({
          url: `${CART_API}`,
          listType: "cartList",
          dispatchType: "UPDATE_PRODUCT_QUANTITY_IN_CART",
          productId: productId,
          updateType: "INCREMENT",
          toastMsg: `${name} HAS BEEN UPDATED`,
          toastType: "info",
        })
      : addProductToCart({
          url: `${CART_API}`,
          productId: productId,
          toastMsg: `${name} HAS BEEN ADDED TO CART`,
          toastType: "success",
        });
  };

  return (
    <React.Fragment>
      {inStock ? (
        <button className={styles.btn} onClick={handleAddToCart}>
          {isInCartList ? (
            <React.Fragment>
              <span>GO TO CART</span>
              <FaArrowRight className={styles.arrowIcon} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FaShoppingBag className={styles.bagIcon} />
              <span>ADD TO CART</span>
            </React.Fragment>
          )}
        </button>
      ) : null}
      {isLoading && (
        <Toast message={state.toast.toastMsg} type={state.toast.toastType} />
      )}
    </React.Fragment>
  );
};

export { AddToCartButton };
