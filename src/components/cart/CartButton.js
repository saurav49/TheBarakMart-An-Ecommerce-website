import React from "react";
import { BiCartAlt } from "../../icons/icon";
import { useDataContext } from "../../hook/index";
import styles from "./CartCard.module.css";
import { useNavigate } from "react-router-dom";

const CartButton = () => {
  const {
    state: { cartList },
  } = useDataContext();

  let navigate = useNavigate();

  const handleCartDisplay = () => {
    navigate("/cart");
  };

  return (
    <div>
      <button onClick={handleCartDisplay} className={styles.cartBadgeBtn}>
        {cartList.length === 0 ? null : (
          <div className={styles.badgeNumber}>
            <span>{cartList.length}</span>
          </div>
        )}
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
