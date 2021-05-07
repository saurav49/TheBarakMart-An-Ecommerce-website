import React from "react";
import styles from "./ProductCard.module.css";
const ProductImage = ({ src, inStock }) => {
  return (
    <div>
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
            <p style={{ color: "#fff", fontWeight: "600" }}>OUT OF STOCK</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { ProductImage };
