import React from "react";
import { FaArrowRight, FaShoppingBag } from "../../icons/icon";
import styles from "./ProductCard.module.css";
import { useDataContext, useAuthContext } from "../../hook/index";
import { useNavigate } from "react-router-dom";
import { CART_API, WISHLIST_API, ADD_PRODUCT_TO_CART } from "../../urls";

const AddToCartButton = ({ name, productId, inStock, isInCartList, type }) => {
  const {
    state,
    addProductToCart,
    updateCartQuantity,
    removeProductFromWishlist,
  } = useDataContext();

  const { userId } = useAuthContext();

  // To check whether item is in cartList
  const checkIsInCartList = (cartList, productId) => {
    if (cartList.hasOwnProperty("userId")) {
      return (
        cartList.cartItems.find((product) => product._id === productId) !==
        undefined
      );
    }
  };

  const navigate = useNavigate();

  if (type === "wishList" && checkIsInCartList(state.cartList, productId)) {
    removeProductFromWishlist({
      url: `${WISHLIST_API}/${userId}`,
      productId: productId,
    });
  }

  const handleAddToCart = () => {
    isInCartList
      ? navigate("/cart", { state: `${productId}` })
      : checkIsInCartList(state.cartList, productId)
      ? updateCartQuantity({
          url: `${CART_API}`,
          listType: "cartList",
          dispatchType: "UPDATE_PRODUCT_QUANTITY_IN_CART",
          productId: productId,
          updateType: "INCREMENT",
        })
      : addProductToCart({
          url: `${ADD_PRODUCT_TO_CART}/${userId}`,
          productId: productId,
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
    </React.Fragment>
  );
};

export { AddToCartButton };
