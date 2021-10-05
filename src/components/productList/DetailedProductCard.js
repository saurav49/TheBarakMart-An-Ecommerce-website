import React from "react";
import styles from "./ProductCard.module.css";
import { IoMdArrowRoundBack } from "../../icons/icon";
import { AddToCartButton, LikeButton, ProductCard } from "../index";
import { useParams } from "react-router";
import { useDataContext } from "../../hook";
import { useNavigate } from "react-router";
import { IconContext } from "react-icons/lib";

const DetailedProductCard = () => {
  const {
    state: { productList },
  } = useDataContext();

  const navigate = useNavigate();

  const { id } = useParams();

  const requiredProduct = productList.find((product) => product._id === id);
  const similarProducts = productList.filter(
    (product) =>
      product.category === requiredProduct.category &&
      product.inStock &&
      product._id !== id
  );

  console.log("detailedProductCard", requiredProduct);

  return (
    <React.Fragment>
      <button className={styles.goBackBtn} onClick={() => navigate(-1)}>
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <IoMdArrowRoundBack />
        </IconContext.Provider>
      </button>
      <div className={styles.detailProductCardWrapper}>
        <div className={styles.detailProductImageWrapper}>
          <img
            className={styles.detailProductImage}
            src={requiredProduct.image}
            alt={requiredProduct.category}
          />
        </div>
        <div className={styles.productDesc}>
          <h2>{requiredProduct.name}</h2>
          <p>{requiredProduct.brandName}</p>
          <p className={styles.detailProductPriceText}>
            ₹ {requiredProduct.price}
          </p>
          <div className={styles.productDescBtns}>
            <AddToCartButton
              productId={requiredProduct._id}
              inStock={requiredProduct.inStock}
            />
            <LikeButton productId={id} styleType={"HORTIZONTAL_CARD"} />
          </div>
          <div className={styles.productDetails}>
            <h3>Description</h3>
            <p>{requiredProduct.description}</p>
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
