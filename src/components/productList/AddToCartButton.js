import React from "react";
import { FaArrowRight, FaShoppingBag } from "../../icons/icon";
import styles from "./ProductCard.module.css";
import { useDataContext } from "../../hook/index";
import { Toast } from "../toast/Toast";
import { useNavigate } from "react-router-dom";

const AddToCartButton = ({ productId, inStock }) => {
  const { state, addProductToDb, updateCartQuantity, isLoading } =
    useDataContext();

  // To check whether item is in cartList
  const checkIsInCartList = (cartList, productId) => {
    return cartList.find((product) => product._id === productId) !== undefined;
  };

  // Extract product from the product list
  const productToBeAdded = state.productList.filter(
    (product) => product._id === productId
  )[0];

  const navigate = useNavigate();

  const handleAddToCart = () => {
    productToBeAdded.isInCartList
      ? navigate("/cart")
      : checkIsInCartList(state.cartList, productId)
      ? updateCartQuantity({
          url: `/api/cartLists`,
          listType: "cartList",
          dispatchType: "UPDATE_PRODUCT_QUANTITY_IN_CART",
          productId: productId,
          updateType: "INCREMENT",
          toastMsg: `${productToBeAdded.name} HAS BEEN UPDATED`,
          toastType: "info",
        })
      : addProductToDb({
          url: `/api/cartLists`,
          listType: "cartList",
          dispatchType: "ADD_PRODUCT_TO_CART",
          productId: productId,
          toastMsg: `${productToBeAdded.name} HAS BEEN ADDED TO CART`,
          toastType: "success",
        });
  };

  return (
    <React.Fragment>
      {inStock ? (
        <button className={styles.btn} onClick={handleAddToCart}>
          {productToBeAdded.isInCartList ? (
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
