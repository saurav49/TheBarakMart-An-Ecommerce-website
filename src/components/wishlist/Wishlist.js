import React from "react";
import { useDataContext } from "../../context/useDataContext";
import { ProductCard } from "../productList/ProductCard";

const Wishlist = () => {
  const {
    state: { wishList }
  } = useDataContext();

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {wishList.map(
        (
          { productId, name, desc, image, price, fastDelivery, inStock, offer },
          index
        ) => {
          return (
            <ProductCard
              key={productId}
              productId={productId}
              index={index}
              type="wishList"
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
  );
};

export { Wishlist };
