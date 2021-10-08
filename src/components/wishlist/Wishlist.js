import React from "react";
import { useDataContext } from "../../hook/index";
import { ProductCard } from "../index";
import { EmptyWishListImage } from "./undraw_Wishlist_re_m7tv.svg";

const Wishlist = () => {
  const {
    state: { wishList },
  } = useDataContext();

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
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
    <div>
      <img src={EmptyWishListImage} alt="empty-wishlist-image" />
      <h2>Your Wishlist is empty!</h2>
      <p>Seems like you don't have wishes here</p>
      <p>Make a wish!</p>
    </div>
  );
};

const WishListItems = ({ wishList }) => {
  return (
    <div>
      {wishList.map(
        (
          { productId, name, desc, image, price, fastDelivery, inStock, offer },
          index
        ) => {
          return (
            <ProductCard
              key={productId}
              productId={productId}
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
