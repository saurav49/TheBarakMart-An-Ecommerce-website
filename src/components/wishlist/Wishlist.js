import React from "react";
import { useDataContext } from "../../hook/index";
import { ProductCard } from "../index";
import EmptyWishListImage from "./undraw_Wishlist_re_m7tv.svg";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
  const {
    state: { wishList },
  } = useDataContext();

  return (
    <div className={styles.wishListWrapper}>
      {wishList.length > 0 ? (
        <WishListItems wishList={wishList} />
      ) : (
        <EmptyWishListPage />
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
      {wishList.map(
        (
          { _id, name, desc, image, price, fastDelivery, inStock, offer },
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
              offer={offer}
            />
          );
        }
      )}
    </div>
  );
};
export { Wishlist };
