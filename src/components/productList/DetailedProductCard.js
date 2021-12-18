import React, { useEffect, useState } from "react";
import styles from "./ProductCard.module.css";
import { AddToCartButton, LikeButton, ProductCard } from "../index";
import { useParams } from "react-router";
import { useDataContext } from "../../hook";
import { BackButton } from "../index";
import { updateProductsWithWishListAndCartStatus } from "../../context/reducerFunc";

const DetailedProductCard = () => {
  const {
    state: { productList, cartList, wishList },
  } = useDataContext();

  const [localProductList, setLocalProductList] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    setLocalProductList(
      updateProductsWithWishListAndCartStatus(productList, wishList, cartList)
    );
  }, [productList, wishList, cartList]);

  let requiredProducts, similarProducts;

  if (localProductList.length > 0) {
    requiredProducts = localProductList.find((product) => product._id === id);
    similarProducts = localProductList.filter(
      (product) =>
        product.category === requiredProducts.category &&
        product.inStock &&
        product._id !== id
    );
  }

  console.log({ requiredProducts }, { id }, { localProductList });

  return (
    <React.Fragment>
      <BackButton />
      {requiredProducts && (
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
                isInCartList={requiredProducts.isInCartList}
                productId={requiredProducts._id}
                inStock={requiredProducts.inStock}
              />
              <LikeButton
                productId={id}
                styleType={"HORTIZONTAL_CARD"}
                isInWishList={requiredProducts.isInWishList}
                name={requiredProducts.name}
              />
            </div>
            <div className={styles.productDetails}>
              <h3>Description</h3>
              <p>{requiredProducts.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.similarProductsWrapper}>
        <h3 className={styles.similarProductsHeading}>Similar Products</h3>
        <div className={styles.similarProducts}>
          {similarProducts &&
            similarProducts.map(
              (
                {
                  _id,
                  name,
                  desc,
                  image,
                  price,
                  fastDelivery,
                  inStock,
                  offer,
                  isInCartList,
                  isInWishList,
                },
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
                    isInCartList={isInCartList}
                    isInWishList={isInWishList}
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
