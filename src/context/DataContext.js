import axios from "axios";
import React, { createContext, useReducer, useState } from "react";
import { reducerFunc } from "./reducerFunc";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducerFunc, {
    productList: [],
    wishList: [],
    cartList: [],
    filterStates: {
      sortBy: null,
      includeOutOfStock: true,
      includeFastDelivery: false,
    },
    loadingStatus: false,
    toast: {
      toastMsg: "",
      toastType: "",
    },
    displayComponent: "PRODUCT",
  });

  const fetchProductAndAdd = async ({ url, dispatchType, listType }) => {
    try {
      const { data } = await axios.get(url);
      if (data.success) {
        dispatch({ type: dispatchType, payload: data[listType] });
      }
    } catch (error) {
      alert(error);
    }
  };

  const updateCartQuantity = async ({
    url,
    dispatchType,
    productId,
    updateType,
    toastMsg,
    toastType,
  }) => {
    let currentQuantity = state.cartList.filter(
      (product) => product.productId === productId
    )[0].quantity;

    const idToUpdate = state.cartList.filter(
      (product) => product.productId === productId
    )[0].id;

    // Updating Toast
    state.toast.toastMsg = toastMsg;
    state.toast.toastType = toastType;

    setLoading(true);

    state.loadingStatus = true;

    updateType === "INCREMENT"
      ? (currentQuantity = currentQuantity + 1)
      : (currentQuantity = currentQuantity - 1);

    try {
      const { data, status } = await axios.patch(`${url}/${idToUpdate}`, {
        product: { quantity: currentQuantity },
      });

      if (status === 200) {
        dispatch({
          type: dispatchType,
          payload: data.cartList.quantity,
          productId: productId,
          updateType: updateType,
        });
      }
    } catch (error) {
      alert(error);
    } finally {
      state.loadingStatus = false;

      setLoading(false);
    }
  };

  const addProductToDb = async ({
    url,
    listType,
    dispatchType,
    productId,
    updateType,
    toastMsg,
    toastType,
  }) => {
    try {
      const { id, ...itemNoId } = state.productList.filter(
        (product) => product.productId === productId
      )[0];

      // Updating Toast
      state.toast.toastMsg = toastMsg;
      state.toast.toastType = toastType;

      setLoading(true);

      state.loadingStatus = true;

      const { data, status } = await axios.post(`${url}`, {
        product: { ...itemNoId },
      });

      if (status === 201) {
        dispatch({
          type: dispatchType,
          payload: data[listType],
          productId: productId,
          updateType: updateType,
        });
      }
    } catch (error) {
      alert(error);
    } finally {
      state.loadingStatus = false;
      console.log("FROM FINALLY ADD", { isLoading }, state.loadingStatus);
      setLoading(false);
    }
  };

  const removeProductFromDb = async ({
    url,
    listType,
    dispatchType,
    productId,
    updateType,
    toastMsg,
    toastType,
  }) => {
    try {
      const idToDelete = state[listType].filter(
        (item) => item.productId === productId
      )[0].id;

      // Updating Toast
      state.toast.toastMsg = toastMsg;
      state.toast.toastType = toastType;

      setLoading(true);

      state.loadingStatus = true;

      const response = await axios.delete(`${url}/${idToDelete}`);

      if (response.status === 204) {
        dispatch({
          type: dispatchType,
          productId: productId,
          updateType: updateType,
        });
      }
    } catch (error) {
      alert(error);
    } finally {
      state.loadingStatus = false;
      console.log("FROM FINALLY DELETE", { isLoading }, state.loadingStatus);
      setLoading(false);
    }
  };

  // console.log("useDataCONtext", { state });

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        fetchProductAndAdd,
        updateCartQuantity,
        addProductToDb,
        removeProductFromDb,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
