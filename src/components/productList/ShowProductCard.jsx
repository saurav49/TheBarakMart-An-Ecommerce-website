import React from "react";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router";

const ShowProductCard = ({
  productId,
  name,
  image,
  price,
  fastDelivery,
  inStock,
}) => {
  const navigate = useNavigate();
  const handleNavigateToDetailProductPage = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className={styles.showProductCardWrapper}
      onClick={() => handleNavigateToDetailProductPage(productId)}
    >
      <img src={image} alt="showproduct" className={styles.showProductImage} />
      <div className={styles.showProductDesc}>
        <p>{name}</p>
        <p>₹{price}</p>
        <p>{inStock ? <span> In Stock </span> : <span> Out Of Stock </span>}</p>
        <p>
          {fastDelivery ? (
            <span> Fast Delivery Included </span>
          ) : (
            <span> Delivery in 3 days </span>
          )}
        </p>
      </div>
    </div>
  );
};

export { ShowProductCard };
