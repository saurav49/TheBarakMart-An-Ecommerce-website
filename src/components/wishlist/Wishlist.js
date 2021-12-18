import React, { useEffect, useState } from "react";
import { useDataContext } from "../../hook/index";
import { ProductCard } from "../index";
import EmptyWishListImage from "./undraw_Wishlist_re_m7tv.svg";
import styles from "./Wishlist.module.css";
import Loader from "react-loader-spinner";
import { updateWishListProductWithCartStatus } from "../../context/reducerFunc";

const Wishlist = () => {
  const {
    state: { wishList, cartList },
    isLoading,
  } = useDataContext();
  const [wishListData, setWishListData] = useState({});

  useEffect(() => {
    setWishListData({
      ...wishList,
      wishListItems: updateWishListProductWithCartStatus(wishList, cartList),
    });
  }, [wishList, cartList]);

  return (
    <div className={styles.wishlistContainer}>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader type="TailSpin" color="#333" height={120} width={120} />
        </div>
      ) : (
        <div className={styles.wishListWrapper}>
          {wishList.hasOwnProperty("userId") &&
          wishList.wishListItems.length > 0 ? (
            wishListData.hasOwnProperty("userId") ? (
              wishListData.wishListItems.length > 0 ? (
                <WishListItems wishList={wishListData} />
              ) : (
                <WishListItems wishList={wishList} />
              )
            ) : (
              <WishListItems wishList={wishList} />
            )
          ) : (
            <EmptyWishListPage />
          )}
        </div>
      )}
    </div>
  );
};

const EmptyWishListPage = () => {
  return (
    <div className={styles.emptyWishlistWrapper}>
      <img
        className={styles.emptyWishlistImage}
        src={EmptyWishListImage}
        alt="empty-wishlist"
      />
      <div className={styles.emptyWishlistDesc}>
        <h2>Your Wishlist is empty!</h2>
        <p>Seems like you don't have wishes here</p>
        <p>Make a wish!</p>
      </div>
    </div>
  );
};

const WishListItems = ({ wishList }) => {
  return (
    <div className={styles.wishList}>
      {wishList.wishListItems[0]["_id"].hasOwnProperty("name") &&
        wishList.wishListItems.map(
          (
            {
              _id: {
                _id,
                name,
                desc,
                image,
                price,
                fastDelivery,
                inStock,
                isInCartList,
                isInWishList,
              },
            },
            index
          ) => {
            return (
              <ProductCard
                key={_id}
                productId={_id}
                index={index}
                type="wishList"
                dismissBtn={true}
                name={name}
                desc={desc}
                image={image}
                price={price}
                fastDelivery={fastDelivery}
                inStock={inStock}
                isInCartList={isInCartList}
                isInWishList={isInWishList}
              />
            );
          }
        )}
    </div>
  );
};
export { Wishlist };
