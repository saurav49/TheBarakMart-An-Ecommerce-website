import React, { useEffect, useState } from "react";
import styles from "./ProductCard.module.css";
import { AddToCartButton, LikeButton, ProductCard } from "../index";
import { useParams } from "react-router";
import { useDataContext } from "../../hook";
import { BackButton } from "../index";

const DetailedProductCard = () => {
  const {
    state: { productList },
  } = useDataContext();

  // const [requiredProducts, setRequiredProducts] = useState([
  //   productList.find((product) => product._id === id),
  // ]);
  // const [similarProducts, setSimilarProducts] = useState([
  //   productList.filter(
  //     (product) =>
  //       product.category === requiredProducts.category &&
  //       product.inStock &&
  //       product._id !== id
  //   ),
  // ]);

  const { id } = useParams();

  // useEffect(() => {
  //   setRequiredProducts(productList.find((product) => product._id === id));
  //   setSimilarProducts(
  //     productList.filter(
  //       (product) =>
  //         product.category === requiredProducts.category &&
  //         product.inStock &&
  //         product._id !== id
  //     )
  //   );
  // }, [id]);

  const requiredProducts = productList.find((product) => product._id === id);
  const similarProducts = productList.filter(
    (product) =>
      product.category === requiredProducts.category &&
      product.inStock &&
      product._id !== id
  );

  console.log(
    { similarProducts, requiredProducts },
    { id },
    productList.find((product) => product._id === id),
    { productList }
  );

  return (
    <React.Fragment>
      <BackButton />
      <div className={styles.detailProductCardWrapper}>
        <div className={styles.detailProductImageWrapper}>
          <img
            className={styles.detailProductImage}
            src={requiredProducts.image}
            alt={requiredProducts.category}
          />
        </div>
        <div className={styles.productDesc}>
          <h2>{requiredProducts.name}</h2>
          <p>{requiredProducts.brandName}</p>
          <p className={styles.detailProductPriceText}>
            ₹ {requiredProducts.price}
          </p>
          <div className={styles.productDescBtns}>
            <AddToCartButton
              productId={requiredProducts._id}
              inStock={requiredProducts.inStock}
            />
            <LikeButton productId={id} styleType={"HORTIZONTAL_CARD"} />
          </div>
          <div className={styles.productDetails}>
            <h3>Description</h3>
            <p>{requiredProducts.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.similarProductsWrapper}>
        <h3 className={styles.similarProductsHeading}>Similar Products</h3>
        <div className={styles.similarProducts}>
          {similarProducts.map(
            (
              { _id, name, desc, image, price, fastDelivery, inStock, offer },
              index
            ) => {
              return (
                <ProductCard
                  key={_id}
                  productId={_id}
                  index={index}
                  dismissBtn={false}
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
      </div>
    </React.Fragment>
  );
};

export { DetailedProductCard };
