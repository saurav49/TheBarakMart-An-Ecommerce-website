import React from "react";
import styles from "./ProductCard.module.css";
import { AddToCartButton } from "./AddToCartButton";
import { LikeButton } from "./LikeButton";
import { CancelButton } from "./CancelButton";
import { ProductImage } from "./ProductImage";

const ProductCard = ({
  productId,
  index,
  type,
  name,
  dismissBtn,
  desc,
  image,
  price,
  fastDelivery,
  inStock,
  offer
}) => {
  return (
    <>
      <div className={styles.productCard}>
        {dismissBtn ? (
          <CancelButton productId={productId} index={index} stateType={type} />
        ) : inStock ? (
          <LikeButton productId={productId} index={index} />
        ) : null}
        <ProductImage src={image} inStock={inStock} />
        <div
          className={
            inStock ? styles.productDesc : styles.productDescOutOfStock
          }
        >
          <h3> {name} </h3>
          <span> ₹ {price} </span>
          <span style={{ color: "red", fontWeight: "700" }}> {offer} </span>
          <p>
            {inStock ? <span> In Stock </span> : <span> Out Of Stock </span>}
          </p>
          <p>
            {fastDelivery ? (
              <span> Fast Delivery Included </span>
            ) : (
              <span> Delivery in 3 days </span>
            )}
          </p>
        </div>
        <AddToCartButton productId={productId} inStock={inStock} />
      </div>
    </>
  );
};

export { ProductCard };
