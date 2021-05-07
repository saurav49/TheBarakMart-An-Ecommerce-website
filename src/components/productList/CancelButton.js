import React from "react";
import { ImCancelCircle } from "react-icons/im";
import { useDataContext } from "../../context/useDataContext";
import styles from "./ProductCard.module.css";
import { Toast } from "../toast/Toast";

const CancelButton = ({ productId, stateType }) => {
  const { state, removeProductFromDb, isLoading } = useDataContext();

  const type = stateType === "cartList" ? "CART" : "WISHLIST";

  const productToBeRemoved = state.productList.filter(
    (product) => product.productId === productId
  )[0];

  const handleCancelBtn = () => {
    removeProductFromDb({
      url: `/api/${stateType}s`,
      listType: stateType,
      dispatchType: `REMOVE_PRODUCT_FROM_${type}`,
      productId: productId,
      toastMsg: `${productToBeRemoved.name} HAS BEEN REMOVED`,
      toastType: "error"
    });
  };

  return (
    <>
      <button onClick={handleCancelBtn} className={styles.btn_wish}>
        <ImCancelCircle style={{ fontSize: "1.3rem" }} />
      </button>
      {isLoading && (
        <Toast message={state.toast.toastMsg} type={state.toast.toastType} />
      )}
    </>
  );
};

export { CancelButton };
