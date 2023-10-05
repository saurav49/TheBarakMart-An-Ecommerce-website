import React from "react";
import { ImCancelCircle } from "../../icons/icon";
import { useDataContext, useAuthContext } from "../../hook/index";
import styles from "./ProductCard.module.css";
import { WISHLIST_API } from "../../urls";

const CancelButton = ({ productId }) => {
  const { removeProductFromWishlist } = useDataContext();
  const { userId } = useAuthContext();

  // const productToBeRemoved = state.productList.filter(
  //   (product) => product._id === productId
  // )[0];

  const handleCancelBtn = () => {
    removeProductFromWishlist({
      url: `${WISHLIST_API}/${userId}`,
      productId: productId,
    });
  };

  return (
    <React.Fragment>
      <button onClick={handleCancelBtn} className={styles.btn_wish}>
        <ImCancelCircle style={{ fontSize: "1.3rem" }} />
      </button>
    </React.Fragment>
  );
};

export { CancelButton };
