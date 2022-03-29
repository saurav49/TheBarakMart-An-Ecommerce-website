import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
  useAuthContext,
  useUserContext,
  useDataContext,
} from "../../hook/index";
import styles from "./FinalCheckout.module.css";

const FinalCheckout = () => {
  const { state } = useLocation();
  const [reqdAddress, setReqdAddress] = useState({});
  const {
    state: { addresses },
    getAllAddresses,
  } = useUserContext();
  const {
    state: { cartList },
  } = useDataContext();
  const { userId } = useAuthContext();

  useEffect(() => {
    getAllAddresses(userId);
  }, [getAllAddresses, userId]);

  useEffect(() => {
    if (typeof addresses !== undefined) {
      addresses.length > 0 &&
        setReqdAddress(addresses.find((address) => address._id === state));
    }
    // eslint-disable-next-line
  }, [state]);

  const handleTotalPrice = () => {
    if (
      cartList &&
      cartList.hasOwnProperty("userId") &&
      cartList.cartItems.length > 0
    ) {
      return cartList.cartItems.reduce((acc, currValue) => {
        return acc + currValue.quantity * currValue._id.price;
      }, 0);
    }
  };

  console.log(reqdAddress);
  return (
    <div className={styles.final__checkout__wrapper}>
      <h1>Review Your Order</h1>
      <div>
        {reqdAddress && reqdAddress.hasOwnProperty("_id") && (
          <div className={styles.address__wrapper}>
            <h2>Shipping Address</h2>
            <p>{reqdAddress.name} </p>
            <p>{reqdAddress.address}</p>
            <p>{reqdAddress.city}</p>
            <p>{reqdAddress.state}</p>
            <p>{reqdAddress.pincode}</p>
            <p>{reqdAddress.country}</p>
          </div>
        )}
      </div>
      <div className={styles.product__wrapper}>
        {cartList &&
          cartList.hasOwnProperty("userId") &&
          cartList.cartItems.length > 0 &&
          cartList.cartItems.map(
            ({ _id: { _id, name, desc, image, price }, quantity }) => {
              return (
                <ProductCard
                  key={_id}
                  type="cartList"
                  productId={_id}
                  name={name}
                  desc={desc}
                  image={image}
                  price={price}
                  quantity={quantity}
                />
              );
            }
          )}
      </div>
      <div className={styles.address__wrapper}>
        <h3>Item Summary</h3>
        <p>
          <span className={styles.text__bold}>Total Price:</span> ₹
          {handleTotalPrice()}
        </p>
        <p>
          <span className={styles.text__bold}>Shipping Charges:</span> ₹ 49
        </p>
        <p>
          <span className={styles.text__bold}>Total Bill:</span>
          {handleTotalPrice() + 49}
        </p>
        <button className={styles.checkout__btn}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export { FinalCheckout };

const ProductCard = ({ productId, name, desc, image, price, quantity }) => {
  return (
    <div className={styles.product__card} key={productId}>
      <img src={image} alt="product" className={styles.product__image} />
      <p>{name}</p>
      <p>{desc}</p>
      <p>₹{price}</p>
      <p>Quantity: {quantity}</p>
    </div>
  );
};
