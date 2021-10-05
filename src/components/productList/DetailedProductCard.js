import React from "react";
import styles from "./ProductCard.module.css";
import { AddToCartButton, WishlistButton } from "../index";
import { useParams } from "react-router";
import { useDataContext } from "../../hook";

const DetailedProductCard = () => {
  const {
    state: { productList },
  } = useDataContext();

  const { id } = useParams();

  console.log("detailedProductCard", { id }, useParams());

  const requiredProduct = productList.find((product) => product._id === id);

  console.log("detailedProductCard", { requiredProduct }, { id });

  return (
    <div className={styles.detailProductCardWrapper}>
      <div>
        <img
          className={styles.detailProductImage}
          src={requiredProduct.image}
          alt={requiredProduct.category}
        />
      </div>
      <div className={styles.productDesc}>
        <h2>{requiredProduct.name}</h2>
        <h3>{requiredProduct.brandName}</h3>
        <p>Rs.{requiredProduct.price}</p>
        <div className={styles.productDescBtns}>
          <AddToCartButton
            productId={requiredProduct._id}
            inStock={requiredProduct.inStock}
          />
          <WishlistButton />
        </div>
      </div>
    </div>
  );
};

export { DetailedProductCard };
