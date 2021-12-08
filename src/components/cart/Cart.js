import React from "react";
import { useDataContext } from "../../hook/index";
import { Checkout, CartCard } from "../index";
import styles from "./Cart.module.css";

const Cart = () => {
  const {
    state: { cartList },
  } = useDataContext();

  return (
    <div className={styles.cartDiv}>
      <div className={styles.cartList}>
        {cartList.map(
          (
            {
              _id,
              name,
              desc,
              image,
              price,
              fastDelivery,
              inStock,
              offer,
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
  );
};

export { Cart };
