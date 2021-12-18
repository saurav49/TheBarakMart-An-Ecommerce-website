import React from "react";
import { BiCartAlt } from "../../icons/icon";
import { useDataContext } from "../../hook/index";
import styles from "./CartCard.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hook/index";

const CartButton = () => {
  const {
    state: { cartList },
  } = useDataContext();
  const { token } = useAuthContext();

  let navigate = useNavigate();

  const handleCartDisplay = () => {
    navigate("/cart");
  };

  // console.log(cartList);

  return (
    <div>
      <button onClick={handleCartDisplay} className={styles.cartBadgeBtn}>
        {cartList.hasOwnProperty("userId") &&
        cartList.cartItems.length > 0 &&
        token ? (
          <div className={styles.badgeNumber}>
            <span>{cartList.cartItems.length}</span>
          </div>
        ) : null}
        <BiCartAlt style={{ fontSize: "1.85rem", color: "#fff" }} />
      </button>
      <p
        style={{
          fontSize: "0.75rem",
          textAlign: "center",
          fontWeight: "700",
          margin: "0em",
          padding: "0em",
        }}
      >
        BAG
      </p>
    </div>
  );
};

export { CartButton };
