import React from "react";
import { useDataContext } from "../../context/useDataContext";
import { Checkout } from "./Checkout";
import { CartCard } from "./CartCard";

const Cart = () => {
  const {
    state: { cartList }
  } = useDataContext();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", flexWrap: "wrap" }}>
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
