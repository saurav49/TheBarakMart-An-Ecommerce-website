import React from "react";
import { FaArrowRight } from "../../icons/icon";
import styles from "../productList/ProductCard.module.css";
import checkoutStyles from "./Checkout.module.css";
import { useDataContext } from "../../hook/index";
import { useNavigate } from "react-router";

const Checkout = () => {
  const { state } = useDataContext();
  const navigate = useNavigate();

  // Calculate Total Bill
  const reducer = (accumulator, currentValue) => {
    return (
      accumulator +
      Number.parseFloat(currentValue._id.price) *
        Number.parseFloat(currentValue.quantity)
    );
  };

  const calculateBill = () => {
    if (
      state.cartList.hasOwnProperty("userId") &&
      state.cartList.cartItems.length > 0
    ) {
      return state.cartList.cartItems.reduce(reducer, 0);
    }
  };

  const handleGoToProducts = () => {
    navigate("/products");
  };

  return (
    <React.Fragment>
      {calculateBill() > 0 && (
        <div
          className={checkoutStyles.dividerLine}
          style={{ marginTop: "5em" }}
        ></div>
      )}
      <div className={checkoutStyles.checkoutContainer}>
        {(calculateBill() === 0 || calculateBill() === undefined) && (
          <div className={checkoutStyles.emptyCart}>
            <h2> Start adding products to cart</h2>
            <button
              className={styles.btn}
              style={{ height: "80px", width: "55%" }}
              onClick={handleGoToProducts}
            >
              <span> GO TO PRODUCTS </span>

              <FaArrowRight className={styles.arrowIcon} />
            </button>
          </div>
        )}
        <div className={checkoutStyles.checkoutPriceContainer}>
          <div className={checkoutStyles.priceContainer}>
            {calculateBill() > 0 ? (
              <React.Fragment>
                <p> TOTAL MRP </p> <span> ₹ {calculateBill()} </span>
              </React.Fragment>
            ) : null}
          </div>
          <div className={checkoutStyles.priceContainer}>
            {calculateBill() > 0 ? (
              <React.Fragment>
                <p> SHIPPING COST </p> <span> ₹ 50 </span>
              </React.Fragment>
            ) : null}
          </div>

          {calculateBill() > 0 && (
            <div
              className={checkoutStyles.dividerLine}
              style={{ marginTop: "2em" }}
            ></div>
          )}
          <div className={checkoutStyles.priceContainer}>
            {calculateBill() > 0 ? (
              <React.Fragment>
                <p className={checkoutStyles.textDark}> TOTAL AMOUNT </p>
                <span className={checkoutStyles.textDark}>
                  ₹ {calculateBill() + 50}
                </span>
              </React.Fragment>
            ) : null}
          </div>
        </div>
        {calculateBill() > 0 && (
          <button className={styles.btn} style={{ width: "45%" }}>
            <span> PLACE ORDER </span>

            <FaArrowRight className={styles.arrowIcon} />
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export { Checkout };
