import React from "react";
import { ImCancelCircle } from "../../icons/icon";
import { useDataContext } from "../../hook/index";
import styles from "./ProductCard.module.css";
import { Toast } from "../index";

const CancelButton = ({ productId, stateType }) => {
  const { state, removeProductFromDb, isLoading } = useDataContext();

  const type = stateType === "cartList" ? "CART" : "WISHLIST";

  const productToBeRemoved = state.productList.filter(
    (product) => product._id === productId
  )[0];

  const handleCancelBtn = () => {
    removeProductFromDb({
      url: `/api/${stateType}s`,
      listType: stateType,
      dispatchType: `REMOVE_PRODUCT_FROM_${type}`,
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
