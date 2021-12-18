import React from "react";
import styles from "./ProductCard.module.css";
import { AddToCartButton } from "./AddToCartButton";
import { LikeButton } from "./LikeButton";
import { CancelButton } from "./CancelButton";
import { ProductImage } from "./ProductImage";
import { useNavigate } from "react-router";

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
  offer,
  isInWishList,
  isInCartList,
}) => {
  const navigate = useNavigate();

  const handleNavigateToDetailProductPage = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <React.Fragment>
      <div className={styles.productCard}>
        {dismissBtn ? (
          <CancelButton productId={productId} />
        ) : inStock ? (
          <LikeButton
            productId={productId}
            styleType={"VERTICLE_CARD"}
            name={name}
            isInWishList={isInWishList}
          />
        ) : null}
        <ProductImage id={productId} src={image} inStock={inStock} />
        <div
          className={
            inStock ? styles.productDesc : styles.productDescOutOfStock
          }
          onClick={() => handleNavigateToDetailProductPage(productId)}
        >
          <h3> {name} </h3>
          <span> ₹ {price} </span>
          <span className={styles.offerTextStyle}> {offer} </span>
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
        <AddToCartButton
          productId={productId}
          inStock={inStock}
          isInCartList={isInCartList}
          name={name}
          type={type}
        />
      </div>
    </React.Fragment>
  );
};

export { ProductCard };
