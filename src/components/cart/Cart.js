import React from "react";
import { useDataContext } from "../../hook/index";
import { Checkout, CartCard } from "../index";
import styles from "./Cart.module.css";
import Loader from "react-loader-spinner";

const Cart = () => {
  const {
    state: { cartList },
    isLoading,
  } = useDataContext();

  return (
    <>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader type="TailSpin" color="#333" height={120} width={120} />
        </div>
      ) : (
        <div className={styles.cartDiv}>
          <div className={styles.cartList}>
            {cartList.hasOwnProperty("userId") &&
              cartList.cartItems.length > 0 &&
              cartList.cartItems.map(
                (
                  {
                    _id: {
                      _id,
                      name,
                      desc,
                      image,
                      price,
                      fastDelivery,
                      inStock,
                      offer,
                    },
                    quantity,
                  },
                  index
                ) => {
                  return (
                    <CartCard
                      key={_id}
                      index={index}
                      type="cartList"
                      productId={_id}
                      dismissBtn={true}
                      name={name}
                      desc={desc}
                      image={image}
                      price={price}
                      fastDelivery={fastDelivery}
                      inStock={inStock}
                      offer={offer}
                      quantity={quantity}
                    />
                  );
                }
              )}
          </div>
          <Checkout />
        </div>
      )}
    </>
  );
};

export { Cart };
