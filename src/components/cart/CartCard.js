import React from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import styles from "./CartCard.module.css";
import { useDataContext } from "../../context/useDataContext";
import { Toast } from "../toast/Toast";

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
  offer
}) => {
  const {
    state,
    updateCartQuantity,
    removeProductFromDb,
    isLoading
  } = useDataContext();

  const productToBeAdded = state.productList.filter(
    (product) => product.productId === productId
  )[0];

  const handleCartQuantity = ({ type }) => {
    switch (type) {
      case "INCREMENT":
        updateCartQuantity({
          url: `/api/cartLists`,
          dispatchType: "UPDATE_PRODUCT_QUANTITY_IN_CART",
          productId: productId,
          productIndex: index,
          updateType: "INCREMENT",
          toastMsg: `${productToBeAdded.name} QUANTITY HAS BEEN INCREASES`,
          toastType: "success"
        });
        break;

      case "DECREMENT":
        updateCartQuantity({
          url: `/api/cartLists`,
          dispatchType: "UPDATE_PRODUCT_QUANTITY_IN_CART",
          productId: productId,
          productIndex: index,
          updateType: "DECREMENT",
          toastMsg: `${productToBeAdded.name} QUANTITY HAS BEEN DECREASED`,
          toastType: "success"
        });
        break;

      case "REMOVE":
        removeProductFromDb({
          url: `/api/cartLists`,
          listType: "cartList",
          dispatchType: `REMOVE_PRODUCT_FROM_CART`,
          productId: productId,
          productIndex: index,
          toastMsg: `${productToBeAdded.name} HAS BEEN REMOVED`,
          toastType: "error"
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
          alt={productId}
        />
      </div>
      <div className={styles.cartContentContainer}>
        <h3> {name} </h3>

        <div style={{ display: "flex", alignItems: "center" }}>
          <h3 style={{ padding: "0em 1em 0em 0em" }}> ₹ {price} </h3>

          {state.cartList.find((product) => product.productId === productId)[
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
            {
              state.cartList.find((product) => product.productId === productId)[
                "quantity"
              ]
            }
          </span>
          <button
            className={styles.cartBtn}
            onClick={() => handleCartQuantity({ type: "INCREMENT" })}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      {isLoading && (
        <Toast message={state.toast.toastMsg} type={state.toast.toastType} />
      )}
    </div>
  );
};

export { CartCard };
