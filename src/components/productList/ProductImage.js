import React from "react";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router";
const ProductImage = ({ id, src, inStock }) => {
  const navigate = useNavigate();

  const handleNavigateToDetailProductPage = (id) => {
    console.log("ProductImage", { id });
    navigate(`/product/${id}`);
  };

  return (
    <div onClick={() => handleNavigateToDetailProductPage(id)}>
      <img
        src={src}
        alt="product-img"
        className={
          inStock ? styles.imageContainer : styles.imageContainerOutOfStock
        }
      />
      {!inStock ? (
        <div className={styles.imageOverlay}>
          <div className={styles.imageOverlayDiv}>
            <p className={styles.outOfStockTextStyle}>OUT OF STOCK</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { ProductImage };
