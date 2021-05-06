import React from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "../productList/ProductCard.module.css";
import checkoutStyles from "./Checkout.module.css";
import { useDataContext } from "../../context/useDataContext";

const Checkout = ({}) => {
  const { state, dispatch } = useDataContext();

  // Calculate Total Bill
  const reducer = (accumulator, currentValue) => {
    return accumulator + Number.parseFloat(currentValue.price);
  };

  const calculateBill = () => {
    return state.cartList.reduce(reducer, 0);
  };

  const handleGoToProducts = () => {
    dispatch({ type: "DISPLAY_COMPONENT", payload: "PRODUCT" });
  };

  return (
    <>
      {calculateBill() > 0 && (
        <div
          className={checkoutStyles.dividerLine}
          style={{ marginTop: "5em" }}
        ></div>
      )}
      <div className={checkoutStyles.checkoutContainer}>
        {calculateBill() === 0 && (
          <div
            style={{
              display: "flex",
              flexDiection: "column",
              alignItems: "center"
            }}
          >
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
              <>
                <p> TOTAL MRP </p> <span> ₹ {calculateBill()} </span>
              </>
            ) : null}
          </div>
          <div className={checkoutStyles.priceContainer}>
            {calculateBill() > 0 ? (
              <>
                <p> SHIPPING COST </p> <span> ₹ 50 </span>
              </>
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
              <>
                <p className={checkoutStyles.textDark}> TOTAL AMOUNT </p>
                <span className={checkoutStyles.textDark}>
                  ₹ {calculateBill() + 50}
                </span>
              </>
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
    </>
  );
};

export { Checkout };
