import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, RiDeleteBin5Fill } from "../../icons/icon";
import styles from "./CartCard.module.css";
import { useDataContext, useAuthContext } from "../../hook/index";
import { Toast } from "../index";
import { CART_API } from "../../urls";
import { useLocation } from "react-router";

const CartCard = ({
  index,
  type,
  productId,
  dismissBtn,
  name,
  image,
  price,
  fastDelivery,
  inStock,
  offer,
  quantity,
}) => {
  const {
    state: { productList, cartList, toast },
    updateCartQuantity,
    removeProductFromCart,
    isLoading,
  } = useDataContext();
  const { state } = useLocation();

  const [cartProductPrice, setCartProductPrice] = useState(0);
  // eslint-disable-next-line
  const [productID, setProductID] = useState(productId || state);

  const { userId } = useAuthContext();

  const updatePrice = (productList, productId, quantity) => {
    setCartProductPrice(
      productList.find((p) => p._id === productId).price * quantity
    );
  };

  useEffect(() => {
    updatePrice(productList, productID, quantity);
  }, [quantity, productID, productList]);

  const handleCartQuantity = ({ type }) => {
    switch (type) {
      case "INCREMENT":
        updateCartQuantity({
          url: `${CART_API}/${userId}`,
          dispatchType: "UPDATE_PRODUCT_QUANTITY_IN_CART",
          productId: productID,
          updateType: "INCREMENT",
          toastMsg: `${name} QUANTITY HAS BEEN INCREASED`,
          toastType: "success",
        });
        break;

      case "DECREMENT":
        updateCartQuantity({
          url: `${CART_API}/${userId}`,
          dispatchType: "UPDATE_PRODUCT_QUANTITY_IN_CART",
          productId: productID,
          updateType: "DECREMENT",
          toastMsg: `${name} QUANTITY HAS BEEN DECREASED`,
          toastType: "success",
        });
        break;

      case "REMOVE":
        removeProductFromCart({
          url: `${CART_API}/${userId}`,
          productId: productID,
          toastMsg: `${name} HAS BEEN REMOVED`,
          toastType: "error",
        });
        break;

      default:
        alert("SOMETHING WENT WRONG WHEN UPDATING THE CART QUANTITY");
    }
  };

  return (
    <div className={styles.cartCardContainer}>
      <div style={{ width: "300px" }}>
        <img
          style={{ width: "100%", backgroundSize: "cover" }}
          src={image}
          alt={productID}
        />
      </div>
      <div className={styles.cartContentContainer}>
        <h3> {name} </h3>

        <div style={{ display: "flex", alignItems: "center" }}>
          <h3 style={{ padding: "0em 1em 0em 0em" }}>₹ {cartProductPrice}</h3>

          {cartList.hasOwnProperty("userId") &&
          cartList.cartItems.length > 0 &&
          cartList.cartItems.find(({ _id: { _id } }) => _id === productID)[
            "quantity"
          ] === 1 ? (
            <button
              className={styles.cartBtn}
              onClick={() => handleCartQuantity({ type: "REMOVE" })}
            >
              <RiDeleteBin5Fill />
            </button>
          ) : (
            <button
              className={styles.cartBtn}
              onClick={() => handleCartQuantity({ type: "DECREMENT" })}
            >
              <FaMinus />
            </button>
          )}

          <span>
            {cartList.hasOwnProperty("userId") &&
              cartList.cartItems.length > 0 &&
              cartList.cartItems.find(({ _id: { _id } }) => _id === productID)[
                "quantity"
              ]}
          </span>
          <button
            className={styles.cartBtn}
            onClick={() => handleCartQuantity({ type: "INCREMENT" })}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      {isLoading && <Toast message={toast.toastMsg} type={toast.toastType} />}
    </div>
  );
};

export { CartCard };
