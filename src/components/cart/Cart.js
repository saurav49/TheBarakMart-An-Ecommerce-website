import React from "react";
import { useDataContext } from "../../context/useDataContext";
import { Checkout } from "./Checkout";
import { CartCard } from "./CartCard";
import styles from "./Cart.module.css";

const Cart = () => {
  const {
    state: { cartList }
  } = useDataContext();

  return (
    <div className={styles.cartDiv}>
      <div className={styles.cartList}>
        {cartList.map(
          (
            {
              productId,
              name,
              desc,
              image,
              price,
              fastDelivery,
              inStock,
              offer
            },
            index
          ) => {
            return (
              <CartCard
                key={productId}
                index={index}
                type="cartList"
                productId={productId}
                dismissBtn={true}
                name={name}
                desc={desc}
                image={image}
                price={price}
                fastDelivery={fastDelivery}
                inStock={inStock}
                offer={offer}
              />
            );
          }
        )}
      </div>
      <Checkout />
    </div>
  );
};

export { Cart };
