import React from "react";
import { ImCancelCircle } from "../../icons/icon";
import { useDataContext } from "../../hook/index";
import styles from "./ProductCard.module.css";
import { Toast } from "../index";
import { WISHLIST_API } from "../../urls";

const CancelButton = ({ productId, stateType }) => {
  const { state, removeProductFromWishlist, isLoading } = useDataContext();

  const productToBeRemoved = state.productList.filter(
    (product) => product._id === productId
  )[0];

  const handleCancelBtn = () => {
    removeProductFromWishlist({
      url: WISHLIST_API,
      productId: productId,
      toastMsg: `${productToBeRemoved.name} HAS BEEN REMOVED`,
      toastType: "error",
    });
  };

  return (
    <React.Fragment>
      <button onClick={handleCancelBtn} className={styles.btn_wish}>
        <ImCancelCircle style={{ fontSize: "1.3rem" }} />
      </button>
      {isLoading && (
        <Toast message={state.toast.toastMsg} type={state.toast.toastType} />
      )}
    </React.Fragment>
  );
};

export { CancelButton };
